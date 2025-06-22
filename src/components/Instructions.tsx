import { Container } from "../styles/GlobalStyles";
import { ControlButton } from "./MacOS";

export default function Instructions() {
  return (
    <Container style={{textAlign: "left", padding: 15}}>
        <p style={{margin: 5}}>
            <span style={{paddingRight: 6}}>
                <ControlButton $color="close" $borderColor="close-border" style={{
                    display: "inline-block",
                    verticalAlign: "middle",

                }}/> 
            </span>
            - Close the tab. To reopen it refresh the page and it'll pop back up!
        </p>
        <p style={{margin: 5}}>
            <span style={{paddingRight: 6}}>
                <ControlButton $color="minimize" $borderColor="minimize-border" style={{
                    display: "inline-block",
                    verticalAlign: "middle",

                }}/> 
            </span>
            - Resize and move the tab to its original position.
        </p>
        <p style={{margin: 5}}>
            <span style={{paddingRight: 6}}>
                <ControlButton $color="maximize" $borderColor="maximize-border" style={{
                    display: "inline-block",
                    verticalAlign: "middle",

                }}/> 
            </span>
            - Expand to fill the whole screen.
        </p>
    </Container>
  )
}
