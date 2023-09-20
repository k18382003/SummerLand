import { ErrorMessage, Form, Formik } from "formik";
import MyTextField from "../../app/common/form/MyTextField";
import { Button, Header, Input, Label } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";

export default function Login() {
    const { accountstore } = useStore()
    return (
        <>
            <Header as={"h2"} textAlign="center">Log In to SummerLand</Header>
            <Formik
                initialValues={{ email: "", password: "", error: null }}
                onSubmit={(value, { setErrors }) => accountstore.login(value).catch(err => {
                    setErrors({ error: 'Invalid email or password' })
                    console.log(err);
                })}
            >
                {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
                    <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
                        <MyTextField placeholder={"Email"} name={"email"}></MyTextField>
                        <MyTextField placeholder={"Password"} name={"password"} type="password"></MyTextField>
                        <ErrorMessage name="error" render={() => {
                            return <Label style={{ marginBottom: 10 }} basic color='red'>{errors.error}</Label>
                        }}
                        />
                        <Button
                            disabled={!isValid || !dirty || isSubmitting}
                            loading={isSubmitting}
                            color='black'
                            type='submit'
                            content='Log In'
                            fluid />
                    </Form>
                )}
            </Formik>
        </>
    )
}