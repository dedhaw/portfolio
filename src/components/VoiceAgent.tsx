import styled from 'styled-components'
import AIDisplayButton from './AiCircle';
import AudioCaptureWrapper from '../utils/AudioCaptureContext';

const Container = styled.div`
    margin: var(--spacing-xl);
`;

const ButtonContainer = styled.div`
    display: flex;
    margin-top: 150px;
`;

export default function VoiceAgent() {
  return (
    <section>
        <Container>
            <h1 className='header-centered'>Demo</h1>
            <AudioCaptureWrapper>
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