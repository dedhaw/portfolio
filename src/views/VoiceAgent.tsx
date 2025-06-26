import styled from 'styled-components'
import AIDisplayButton from '../components/AiCircle';
import AudioCaptureWrapper from '../utils/AudioCaptureContext';

const Container = styled.div`
    margin: var(--spacing-xl);
    height: 80vh;
`;

const ButtonContainer = styled.div`
    display: flex;
    margin-top: 150px;
    width: 100%;
    justify-content: center;
`;

export default function VoiceAgent() {
  return (
    <section>
        <Container>
            <h1 className='header-centered'>Voice Agent Demo</h1>
            <AudioCaptureWrapper >
                {({
                    status,
                    isConnected,
                    isRecording,
                    isLoading,
                    transcript,
                    startRecording,
                    stopRecording
                }) => ( 
                    <ButtonContainer>
                        <AIDisplayButton 
                            status={status}
                            isConnected={isConnected}
                            isRecording={isRecording}
                            isLoading={isLoading}
                            transcript={transcript}
                            startRecording={startRecording}
                            stopRecording={stopRecording}
                        />
                    </ButtonContainer>
                )}
            </AudioCaptureWrapper>
        </Container>
    </section>
  )
}