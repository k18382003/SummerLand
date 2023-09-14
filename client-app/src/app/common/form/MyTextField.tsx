import {useField } from "formik"
import { _allowStateChangesInsideComputed } from "mobx";
import { Label, Form, SemanticWIDTHS } from "semantic-ui-react";

interface Props {
    placeholder:string,
    name:string,
    label?:string,
    type?:string
    rows?:number
}

export default function MyTextField(props:Props){
    const [field, meta] = useField(props.name);
    return(
        // !! to check if the error is null or undefined https://www.codingem.com/javascript-double-exclamation-operator/
        <Form.Field rows={props.rows} error={meta.touched && !!meta.error}>
            <label>{props.label}</label>
            <textarea {...field} {...props}/>
            { meta.touched && meta.error ? (
                <Label basic color='red'>{meta.error}</Label>
            ) : null}
        </Form.Field> 
    )
}