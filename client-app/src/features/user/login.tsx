import { useState } from 'react';
import { ErrorMessage, Form, Formik } from "formik";
import MyTextField from "../../app/common/form/MyTextField";
import { Button, Divider, Header, Label } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";

export default function Login() {
    const { accountstore } = useStore()
    const [guest, setGuest] = useState(false);


    return (
        <>
            <Header as={"h2"} textAlign="center">Log In to SummerLand</Header>
            <Formik
                initialValues={{ email: "", password: "", error: null }}
                onSubmit={async (value, { setErrors }) => {
                    if (guest) {
                        await accountstore.login({ email: 'example@example.com', password: 'P@ssw0rd' }).catch(err => {
                            setErrors({ error: err })
                            console.log(err);
                        })
                    } else {
                        await accountstore.login(value).catch(err => {
                            setErrors({ error: 'Invalid email or password' })
                            console.log(err);
                        })
                    }
                }
                }
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
                            loading={!guest && isSubmitting}
                            color='black'
                            type='submit'
                            content='Log In'
                            fluid />
                        <Divider />
                        <Button
                            disabled={isSubmitting}
                            loading={guest && isSubmitting}
                            name="guest"
                            color='black'
                            type='submit'
                            content='Visit as Guest'
                            onClick={() => setGuest(true)}
                            fluid />
                    </Form>
                )}
            </Formik>
        </>
    )
}