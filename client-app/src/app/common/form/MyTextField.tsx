import { useField } from "formik"
import { _allowStateChangesInsideComputed } from "mobx";
import { Label, Form } from "semantic-ui-react";

interface Props {
    placeholder: string,
    name: string,
    label?: string,
    type?: string,
}

export default function MyTextField(props: Props) {
    const [field, meta] = useField(props.name);
    return (
        // !! to check if the error is null or undefined https://www.codingem.com/javascript-double-exclamation-operator/
        <Form.Field error={meta.touched && !!meta.error}>
            <label>{props.label}</label>
            <input {...field} {...props} />
            {meta.touched && meta.error ? (
                <Label basic color='red'>{meta.error}</Label>
            ) : null}
        </Form.Field>
    )
}