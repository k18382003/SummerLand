 import {useField } from "formik"
import { Label, Form } from "semantic-ui-react";
import QuillEditor from "../QuillEditor";

interface Props {
    placeholder:string,
    name:string,
    label?:string,
}

export default function MyEditorField(props:Props){
    const [field, meta, helper] = useField(props.name);
    return(
        // !! to check if the error is null or undefined https://www.codingem.com/javascript-double-exclamation-operator/
        <Form.Field error={meta.touched && !!meta.error}>
            <label>{props.label}</label>
            <QuillEditor name={props.name} value={field.value || null} onChange={(value : any) => helper.setValue(value)} />
            { meta.touched && field.value.replace(/<[^>]+>/g, '').trim() == '' ? (
                <Label basic color='red'>Content can not be empty</Label>
            ) : null}
        </Form.Field>
    )
}