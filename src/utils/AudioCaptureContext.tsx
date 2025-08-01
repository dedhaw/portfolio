import { ReactNode } from "react";
import { useState, useRef, useEffect } from "react"

export default function AudioCaptureWrapper({
    children,
}: {
    children: (props: {
        status: string;
        isConnected: string;
        isRecording: boolean;
        isLoading: boolean;
        transcript: string;
        startRecording: () => void;
        stopRecording: () => void;
    }) => ReactNode;
}) {
    const [isRecording, setIsRecording] = useState<boolean>(false);
    const [isConnected, setIsConnected] = useState<string>("DISCONNECTED");
    const [status, setStatus] = useState<string>("Ready to record");
    const [transcript, setTranscript] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const socketRef = useRef<WebSocket | null>(null);
    const streamRef = useRef<MediaStream | null>(null);
    const audioPlayerRef = useRef<HTMLAudioElement | null>(null);
    const audioQueueRef = useRef<Array<{blob: Blob, sentence: string}>>([]);
    const isPlayingRef = useRef<boolean>(false);
    const aiSpeakingRef = useRef<boolean>(false);
    const isRecordingRef = useRef<boolean>(false);
    const audioContextRef = useRef<AudioContext | null>(null);
    const audioSourceRef = useRef<AudioBufferSourceNode | null>(null);

    useEffect(() => {
        isRecordingRef.current = isRecording;
    }, [isRecording]);

    useEffect(() => {
        return () => {
            if (audioPlayerRef.current) {
                audioPlayerRef.current.pause();
                URL.revokeObjectURL(audioPlayerRef.current.src);
            }
            // Await stopAudioPlayback on cleanup
            (async () => {
                await stopAudioPlayback();
            })();
        };
    }, []);

    /*** Connection setup methods ***/
    const setupWebSocket = (): Promise<boolean> => {
        return new Promise((resolve) => {
            if (socketRef.current) {
                socketRef.current.close();
                socketRef.current = null;
            }
            
            setStatus("Connecting to server...");
            const ws = new WebSocket(`wss://${import.meta.env.VITE_APP_BACKEND_DOMAIN}/listen`);

            ws.onopen = () => {
                setStatus("Connected to server");
                setIsConnected("CONNECTED");
                console.log("WebSocket connected");
                resolve(true);
            };
            
            ws.onclose = () => {
                setStatus("Disconnected from server");
                setIsConnected("DISCONNECTED");
                console.log("WebSocket closed");
                resolve(false);
            };
            
            ws.onerror = (error) => {
                setStatus("Connection error");
                setIsConnected("ERROR");
                console.log("WebSocket error", error);
                resolve(false);
            };
            
            ws.onmessage = (event) => {
                try {
                    const data = JSON.parse(event.data);
                    console.log("Received WebSocket message:", data);
                    
                    if (data.status) {
                        console.log(`Server status: ${data.status}`, data.message);
                        
                        if (data.status === "listening") {
                            setStatus("Listening to your voice...");
                        } else if (data.status === "stopped") {
                            setStatus("Listening stopped");
                            setIsConnected("DISCONNECTED");
                        } else if (data.status === "ready") {
                            setStatus("Server ready");
                        }
                    }
                    
                    if (data.transcript) {
                        console.log("Received transcript:", data.transcript);
                        setTranscript(data.transcript);
                        aiSpeakingRef.current = true;
                        console.log("AI started speaking - microphone input will be muted");
                        console.log("Set aiSpeakingRef to true");
                    }
                    
                    if (data.audio) {
                        console.log("Received audio data, sentence:", data.sentence);
                        console.log("Current recording state:", isRecordingRef.current); // Use ref instead
                        console.log("AI speaking state:", aiSpeakingRef.current);
                        
                        if (!isRecordingRef.current) {
                            console.log("Not recording anymore, ignoring audio");
                            return;
                        }
                        
                        if (!aiSpeakingRef.current) {
                            console.log("AI was interrupted, ignoring incoming audio");
                            return;
                        }
                        
                        const audioBlob = base64ToBlob(data.audio, data.content_type);
                        console.log("Created audio blob, size:", audioBlob.size, "type:", audioBlob.type);
                        audioQueueRef.current.push({ blob: audioBlob, sentence: data.sentence });
                        console.log("Audio queue length after push:", audioQueueRef.current.length);
                        
                        if (!isPlayingRef.current) {
                            console.log("Starting audio playback");
                            playNextAudio();
                        } else {
                            console.log("Audio already playing, added to queue");
                        }
                    }
                    
                    if (data.deepgram_status) {
                        console.log(`Deepgram connection ${data.deepgram_status}`);
                        if (data.deepgram_status === "closed") {
                            setStatus("AI speaking - microphone paused");
                        } else if (data.deepgram_status === "reopened") {
                            setStatus("Listening to your voice...");
                        } else if (data.deepgram_status === "failed_to_reopen") {
                            setStatus("Connection issue - please restart recording");
                            console.error("Failed to reopen Deepgram connection");
                        }
                    }
                    
                    if (data.interrupt) {
                        console.log("Interruption detected, stopping audio playback");
                        stopAudioPlayback();
                        aiSpeakingRef.current = false;
                        setStatus("Listening to your voice...");
                    }
                    
                    if (data.ai_finished_speaking) {
                        console.log("Backend says AI finished speaking");
                        if (audioQueueRef.current.length === 0 && !isPlayingRef.current) {
                            aiSpeakingRef.current = false;
                            console.log("Set aiSpeakingRef to false - backend confirmed all audio sent");
                        } else {
                            console.log("Audio still in queue or playing, keeping aiSpeakingRef true");
                        }
                    }
                    
                    if (data.error) {
                        console.error("Server error:", data.error);
                        setStatus(`Error: ${data.error}`);
                    }
                } catch (e) {
                    console.error("Error parsing message:", e);
                }
            };
            
            socketRef.current = ws;
            
            setTimeout(() => {
                if (ws.readyState !== WebSocket.OPEN) {
                    resolve(false);
                }
            }, 5000);
        });
    };

    /*** Play Audio on frontend setup ***/
    const playNextAudio = async () => {
        if (!isRecordingRef.current) {
            isPlayingRef.current = false;
            return;
        }

        if (audioQueueRef.current.length === 0) {
            isPlayingRef.current = false;
            return;
        }

        isPlayingRef.current = true;
        const nextAudio = audioQueueRef.current.shift()!;

        try {
            if (!audioContextRef.current) {
                const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
                audioContextRef.current = new AudioCtx();
            }

            if (audioContextRef.current.state === 'suspended') {
                await audioContextRef.current.resume();
            }

            const arrayBuffer = await nextAudio.blob.arrayBuffer();
            const audioBuffer = await audioContextRef.current.decodeAudioData(arrayBuffer);

            // Stop any currently playing source
            if (audioSourceRef.current) {
                audioSourceRef.current.stop();
                audioSourceRef.current.disconnect();
                audioSourceRef.current = null;
            }

            const source = audioContextRef.current.createBufferSource();
            source.buffer = audioBuffer;
            source.connect(audioContextRef.current.destination);

            source.onended = () => {
                source.disconnect();
                audioSourceRef.current = null;
                playNextAudio();
            };

            audioSourceRef.current = source;
            source.start();

        } catch (err) {
            console.error("Error playing audio:", err);
            isPlayingRef.current = false;
            playNextAudio();
        }
    };

    const stopAudioPlayback = async () => {
        console.log("Force stopping all audio playback");

        if (audioSourceRef.current) {
            audioSourceRef.current.stop();
            audioSourceRef.current.disconnect();
            audioSourceRef.current = null;
        }

        if (audioContextRef.current) {
            await audioContextRef.current.close();
            audioContextRef.current = null;
        }

        audioQueueRef.current = [];
        isPlayingRef.current = false;
        aiSpeakingRef.current = false;

        console.log("Audio playback force stopped and queue cleared");
    };
    
    const base64ToBlob = (base64: string, contentType: string): Blob => {
        try {
            console.log("Converting base64 to blob, content type:", contentType);
            const byteCharacters = atob(base64);
            const byteArrays = [];
            
            for (let offset = 0; offset < byteCharacters.length; offset += 512) {
                const slice = byteCharacters.slice(offset, offset + 512);
                
                const byteNumbers = new Array(slice.length);
                for (let i = 0; i < slice.length; i++) {
                    byteNumbers[i] = slice.charCodeAt(i);
                }
                
                const byteArray = new Uint8Array(byteNumbers);
                byteArrays.push(byteArray);
            }
            
            const blob = new Blob(byteArrays, { type: contentType });
            console.log("Blob created successfully, size:", blob.size);
            return blob;
        } catch (error) {
            console.error("Error converting base64 to blob:", error);
            throw error;
        }
    };

    /*** Unlock AudioContext for Safari and others ***/
    const unlockAudioContext = async () => {
        if (!audioContextRef.current) {
            const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
            audioContextRef.current = new AudioCtx();
        }

        if (audioContextRef.current.state === 'suspended') {
            await audioContextRef.current.resume();
        }

        // Play silent buffer to unlock
        const buffer = audioContextRef.current.createBuffer(1, 1, 22050);
        const source = audioContextRef.current.createBufferSource();
        source.buffer = buffer;
        source.connect(audioContextRef.current.destination);
        source.start();

        source.onended = () => {
            source.disconnect();
        };
    };

    /*** Make connection and recording methods ***/
    const startRecording = async () => {
        try {
            setIsLoading(true);

            await stopAudioPlayback();

            // Unlock audio context after user interaction
            await unlockAudioContext();

            setStatus("Connecting to server...");
            const connected = await setupWebSocket();
            if (!connected) {
                setStatus("Failed to connect to server");
                setIsLoading(false);
                return;
            }

            socketRef.current!.send(JSON.stringify({
                action: "start_listening"
            }));

            setStatus("Requesting microphone access...");
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ 
                    audio: {
                        echoCancellation: true,
                        noiseSuppression: true,
                        autoGainControl: true,
                        sampleRate: 44100
                    }
                });
                streamRef.current = stream;

                const recorder = new MediaRecorder(stream, {
                    mimeType: 'audio/webm',
                });

                mediaRecorderRef.current = recorder;

                recorder.ondataavailable = async (event: BlobEvent) => {
                    if (socketRef.current && 
                        socketRef.current.readyState === WebSocket.OPEN && 
                        event.data.size > 0) {

                        const arrayBuffer = await event.data.arrayBuffer();
                        socketRef.current.send(arrayBuffer);
                    }
                };

                recorder.onstart = () => {
                    setStatus("Recording...");
                };

                recorder.onerror = (event) => {
                    setStatus(`Recording error: ${event.error}`);
                };

                recorder.start(100);
                setIsRecording(true);

            } catch (error) {
                setStatus(`Microphone access error: ${error instanceof Error ? error.message : String(error)}`);
                console.error("Error accessing microphone:", error);

                if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
                    socketRef.current.send(JSON.stringify({
                        action: "stop_listening"
                    }));
                }
            }

        } catch (error) {
            setStatus(`Error: ${error instanceof Error ? error.message : String(error)}`);
            console.error("Error starting recording:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const stopRecording = () => {
        console.log("Stop recording clicked");

        stopAudioPlayback();
        setIsLoading(true);

        setIsRecording(false);

        if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
            mediaRecorderRef.current.stop();
        }

        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
            streamRef.current = null;
        }

        if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
            socketRef.current.send(JSON.stringify({
                action: "stop_listening"
            }));

            setTimeout(() => {
                if (socketRef.current) {
                    console.log("Closing WebSocket connection");
                    socketRef.current.close();
                    socketRef.current = null;
                }
            }, 100);
        }

        setIsLoading(false)
        setStatus("Ready to record");
        console.log("Stop recording completed");
    };

    return children({
        status,
        isConnected,
        isRecording,
        isLoading,
        transcript,
        startRecording,
        stopRecording
    });
}