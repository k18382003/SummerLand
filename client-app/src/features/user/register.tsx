import { ErrorMessage, Form, Formik } from "formik";
import MyTextField from "../../app/common/form/MyTextField";
import { Button, Header, Label, List, Segment } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import * as yup from "yup"
import ValidationError from "../error/ValidationError";

export default function Register(){
    const {accountstore} = useStore()
    return(
        <> 
            <Header as={"h2"} textAlign="center">Register for SummerLand</Header>
            <Formik 
                initialValues={{displayname: "", username: "", email : "", password: "", error: null}}
                onSubmit={(value, {setErrors})=> accountstore.Register(value).catch(error => 
                    setErrors({error}))}
                validationSchema={
                    yup.object({
                        displayname: yup.string().required(),
                        username: yup.string().required(),
                        email: yup.string().required(),
                        password: yup.string().required()
                    })
                }
            >
                {({handleSubmit, isSubmitting, errors, isValid, dirty}) => (
                    <Form className="ui form error" onSubmit={handleSubmit} autoComplete="off">
                        <MyTextField placeholder={"Display Name"} name={"displayname"}></MyTextField>
                        <MyTextField placeholder={"User Name"} name={"username"}></MyTextField>
                        <MyTextField placeholder={"Email"} name={"email"}></MyTextField>
                        <MyTextField placeholder={"Password"} name={"password"} type="password"></MyTextField>
                        <Segment color="red">
                            <Header as='h6' content="Password rules" />
                            <List as='ul'>
                                <List.Item as='li'>At least a number</List.Item>
                                <List.Item as='li'>At least one lowercase charactor</List.Item>
                                <List.Item as='li'>At least one uppercase charactor</List.Item>
                                <List.Item as='li'>Between 4 - 8 charators long</List.Item>
                            </List>
                        </Segment>
                        <ErrorMessage name="error" render={()=> 
                            <ValidationError errors={errors.error} />} />
                        <Button 
                        disabled={!isValid || !dirty || isSubmitting}
                        loading={isSubmitting} 
                        color='black' 
                        type='submit' 
                        content='Register' 
                        fluid/>
                    </Form>
                )}
            </Formik>
        </>
    )
}