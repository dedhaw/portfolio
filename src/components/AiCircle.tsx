import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const CircleWrapper = styled.div<{ $isConnected: string; $isLoading: boolean }>`
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  cursor: pointer;
  opacity: ${props => {
    if (props.$isConnected === "CONNECTED" && !props.$isLoading) return 1;
    if (props.$isLoading) return 0.9;
    return 0.7;
  }};
  transition: opacity 0.3s ease;
  
  &:hover {
    opacity: ${props => {
      if (props.$isConnected === "CONNECTED" && !props.$isLoading) return 1;
      if (props.$isLoading) return 0.95;
      return 0.85;
    }};
  }
`;

const MainCircle = styled.div<{ $audioLevel: number; $isRecording: boolean; $isConnected: string; $isLoading: boolean }>`
  position: relative;
  width: 16rem;
  height: 16rem;
  border-radius: 50%;
  overflow: hidden;
  transform: scale(${props => props.$isRecording ? 1 + (props.$audioLevel * 0.05) : 1}); /* Reduced scale effect */
  transition: transform 0.15s ease-out;
  cursor: pointer;
  
  animation: ${props => {
    if (props.$isRecording) return 'pulse 1.5s ease-in-out infinite';
    if (props.$isLoading) return 'pulse 0.8s cubic-bezier(0.4, 0, 0.6, 1) infinite';
    return 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite';
  }};
  
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { 
      opacity: ${props => {
        if (props.$isRecording) return Math.max(0.9, 0.95 - (props.$audioLevel * 0.03));
        if (props.$isLoading) return 0.6;
        return 0.9;
      }};
    }
  }
`;

const GradientBackground = styled.div<{ $audioLevel: number; $isRecording: boolean; $isConnected: string; $isLoading: boolean }>`
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: ${props => {
    if (props.$isConnected === "DISCONNECTED" && !props.$isLoading) {
      return `conic-gradient(from 0deg, #F9FAFB, #FFFFFF, #F3F4F6, #E5E7EB, #F9FAFB)`;
    }
    return `conic-gradient(from 0deg, var(--primary-blue), var(--primary-purple), var(--primary-teal), var(--primary-blue))`;
  }};
  
  animation: rotate ${props => {
    if (props.$isLoading) return '1s linear infinite';
    if (props.$isConnected === "DISCONNECTED") return '8s linear infinite';
    if (props.$isRecording) {
      // Clamp the speed between 6s (slowest) and 3s (fastest)
      const speed = Math.max(3, 6 - (props.$audioLevel * 2));
      return `${speed}s linear infinite`;
    }
    return '4s linear infinite';
  }};
  
  filter: brightness(${props => props.$isRecording ? 1 + (props.$audioLevel * 0.1) : 1}); /* Reduced brightness effect */
  transition: filter 0.15s ease-out;
  
  @keyframes rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

const InnerCircle = styled.div<{ $audioLevel: number; $isRecording: boolean }>`
  position: absolute;
  inset: 8px;
  border-radius: 50%;
  background: radial-gradient(
    circle at center,
    rgba(45, 80, 230, ${props => 0.8 + (props.$audioLevel * 0.05)}),
    rgba(123, 97, 255, ${props => 0.6 + (props.$audioLevel * 0.05)}),
    rgba(0, 194, 203, ${props => 0.4 + (props.$audioLevel * 0.1)})
  );
  backdrop-filter: blur(${props => 2 + (props.$audioLevel * 0.5)}px); /* Reduced blur effect */
  animation: pulse-scale 2s ease-in-out infinite alternate;
  transition: background 0.15s ease-out;
  
  @keyframes pulse-scale {
    0% { transform: scale(1); opacity: 0.8; }
    100% { transform: scale(1.03); opacity: 0.6; } /* Reduced scale */
  }
`;

const CenterGlow = styled.div<{ $audioLevel: number }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 6rem;
  height: 6rem;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(255, 255, 255, 0.9),
    rgba(255, 255, 255, ${props => 0.3 + (props.$audioLevel * 0.1)}),
    transparent
  );
  animation: glow 3s ease-in-out infinite alternate;
  
  @keyframes glow {
    0% { opacity: 0.7; transform: translate(-50%, -50%) scale(1); }
    100% { opacity: 1; transform: translate(-50%, -50%) scale(1.1); }
  }
`;

const OuterRing = styled.div<{ $audioLevel: number; $show: boolean }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 16rem;
  height: 16rem;
  border-radius: 50%;
  border: 4px solid var(--primary-purple);
  opacity: ${props => props.$show ? 0.3 + (props.$audioLevel * 0.2) : 0}; /* Reduced opacity effect */
  animation: ${props => props.$show ? 'ring-pulse 2s ease-in-out infinite' : 'none'};
  pointer-events: none;
  transition: opacity 0.3s ease;
  
  @keyframes ring-pulse {
    0% { transform: translate(-50%, -50%) scale(1); opacity: 0.3; }
    50% { transform: translate(-50%, -50%) scale(1.1); opacity: 0.1; }
    100% { transform: translate(-50%, -50%) scale(1.2); opacity: 0; }
  }
`;

const PulseWave = styled.div<{ $delay: number }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 16rem;
  height: 16rem;
  border-radius: 50%;
  border: 1px solid #D1D5DB;
  opacity: 0;
  pointer-events: none;
  animation: wave-pulse 4s ease-out infinite;
  animation-delay: ${props => props.$delay}s;
  
  @keyframes wave-pulse {
    0% { transform: translate(-50%, -50%) scale(1); opacity: 0.3; }
    100% { transform: translate(-50%, -50%) scale(1.4); opacity: 0; }
  }
`;

const LoadingRing = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 16rem;
  height: 16rem;
  border-radius: 50%;
  border: 3px solid transparent;
  border-top-color: var(--primary-blue);
  animation: loading-spin 0.8s linear infinite;
  pointer-events: none;
  
  @keyframes loading-spin {
    from { transform: translate(-50%, -50%) rotate(0deg); }
    to { transform: translate(-50%, -50%) rotate(360deg); }
  }
`;

interface AIDisplayButtonProps {
  status?: string;
  isConnected?: string;
  isRecording?: boolean;
  isLoading?: boolean;
  transcript?: string;
  startRecording?: () => void;
  stopRecording?: () => void;
}

export default function AIDisplayButton({
  status,
  isConnected = "DISCONNECTED",
  isRecording = false,
  isLoading = false,
  transcript,
  startRecording,
  stopRecording
}: AIDisplayButtonProps) {
  const [audioLevel, setAudioLevel] = useState(0);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animationFrameRef = useRef<number>(null);

  const handleClick = () => {
    if (isRecording) {
      stopRecording?.();
    } else {
      startRecording?.();
    }
  };

  const startAudioCapture = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const analyser = audioContext.createAnalyser();
      const microphone = audioContext.createMediaStreamSource(stream);
      
      analyser.fftSize = 256;
      analyser.smoothingTimeConstant = 0.85; // Increased smoothing for less erratic movement
      microphone.connect(analyser);
      
      audioContextRef.current = audioContext;
      analyserRef.current = analyser;
      
      analyzeAudio();
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopAudioCapture = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    
    if (audioContextRef.current) {
      audioContextRef.current.close();
    }
    
    setAudioLevel(0);
  };

  const analyzeAudio = () => {
    if (!analyserRef.current) return;
    
    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    
    const analyze = () => {
      if (!analyserRef.current) return;
      
      analyserRef.current.getByteFrequencyData(dataArray);
      const average = dataArray.reduce((sum, value) => sum + value, 0) / bufferLength;
      const normalizedLevel = Math.min(average / 128, 1);
      
      // Apply additional smoothing to prevent erratic movements
      setAudioLevel(prevLevel => prevLevel * 0.7 + normalizedLevel * 0.3);
      animationFrameRef.current = requestAnimationFrame(analyze);
    };
    
    analyze();
  };

  useEffect(() => {
    if (isRecording) {
      startAudioCapture();
    } else {
      stopAudioCapture();
    }
  }, [isRecording]);

  useEffect(() => {
    return () => stopAudioCapture();
  }, []);

  return (
    <CircleWrapper $isConnected={isConnected} $isLoading={isLoading} onClick={handleClick}>
      <div style={{ position: 'relative' }}>
        <MainCircle $audioLevel={audioLevel} $isRecording={isRecording} $isConnected={isConnected} $isLoading={isLoading}>
          <GradientBackground $audioLevel={audioLevel} $isRecording={isRecording} $isConnected={isConnected} $isLoading={isLoading} />
          <InnerCircle $audioLevel={audioLevel} $isRecording={isRecording} />
          <CenterGlow $audioLevel={audioLevel} />
        </MainCircle>
        
        <OuterRing $audioLevel={audioLevel} $show={isRecording} />
        
        {isConnected === "DISCONNECTED" && !isLoading && (
          <>
            <PulseWave $delay={0} />
            <PulseWave $delay={2} />
          </>
        )}
        
        {isLoading && <LoadingRing />}
      </div>
    </CircleWrapper>
  );
}