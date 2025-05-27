import styled from "styled-components";

export const Container = styled.section.attrs({
    className: 'container'
  })`
    display: flex;
    flex-direction: column;
    text-align: center;
`;

export const AltSection = styled.section`
    min-height: 100vh;
    width: 100% !important;
    background-color: var(--white);
    padding-top: var(--spacing-xl);
`;

export const MacOSContainer = styled.div`
    position: relative;
    width: 100%;
    height: calc(100vh - var(--spacing-xl));
    display: flex;
    align-items: center;
    justify-content: center;
    overflow-x: hidden;
`;

export const OverlayMacOSContainer = styled.div`
  height: calc(100vh - var(--spacing-xl));
  width: 100%;
  position: relative;
`;

export const Content = styled.div`
  height: calc(100% - 38px);
  margin: var(--spacing-xl);
`;