import {useField } from "formik"
import { Label, Form, DropdownItemProps } from "semantic-ui-react";

interface Props {
    placeholder:string,
    name:string,
    label?:string,
    option:DropdownItemProps[],
}

export default function MyDropDownField(props:Props){
    const [field, meta, helper] = useField(props.name);
    return(
        // !! to check if the error is null or undefined https://www.codingem.com/javascript-double-exclamation-operator/
        <Form.Field error={meta.touched && !!meta.error}>
            <label>{props.label}</label>
            <Form.Dropdown
                name = 'category'
                selection
                placeholder="Category"
                options={props.option}
                value={field.value || null}
                onChange={(_, opt) => helper.setValue(opt.value)}
                onBlur={()=>helper.setTouched(true)}
            />
            { meta.touched && meta.error ? (
                <Label basic color='red'>{meta.error}</Label>
            ) : null}
        </Form.Field>
    )
}