import { Header } from "semantic-ui-react";

interface Props {
    functionName: string
}

export default function GuestMessage({ functionName }: Props) {
    return (
        <Header textAlign='center' as="h2" content={`Please register to ${functionName}`} />
    )
}