import { Dimmer, Loader } from 'semantic-ui-react'

interface Props{
    inverted: boolean,
    message: string
}


export default function LoadingComp({inverted, message} : Props)
{
    return(
        <Dimmer active={true} inverted={inverted}>
            <Loader content={message}></Loader>
        </Dimmer>
    )
}