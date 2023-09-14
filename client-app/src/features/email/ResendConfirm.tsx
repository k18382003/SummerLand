import { ErrorMessage, Formik, } from "formik";
import { Form } from "react-router-dom";
import { Button, FormButton, FormInput, Header, HeaderContent, Input, Label } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import MyTextField from "../../app/common/form/MyTextField";

export default function ResendConfirm() {
    const { emailstore } = useStore();
    return (
        <>
            <Header>Please enter your email below.</Header>
            <HeaderContent>We will send you amother confirmation email shortly.</HeaderContent>
            <Formik initialValues={{ email: "", error: null }}
                onSubmit={(value, { setErrors }) => emailstore.resend(value.email).catch(err => {
                    setErrors({ error: 'Failed Resend.' })
                })}
            >
                {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
                    <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
                        <MyTextField placeholder='Email' name={"email"}></MyTextField>
                        <ErrorMessage name="error" render={() => {
                            return <Label style={{ marginBottom: 10 }} basic color='red'></Label>
                        }} />
                        <FormButton
                            disabled={!isValid || !dirty || isSubmitting}
                            loading={isSubmitting}
                            color="black"
                            content="Send"
                            type="submit" />
                    </Form>
                )}
            </Formik>
        </>
    )
}