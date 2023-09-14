import { makeAutoObservable } from "mobx";
import agent from "../api/agent";
import { router } from "../route/Routes";

export default class EmailStore {
    constructor() {
        makeAutoObservable(this);
    }

    resend = async (email: string) => {
        try {
            const result = await agent.Email.resend(email)
            if (!result)
                router.navigate('./failed-resend')
            router.navigate('./confirm-request')
        }
        catch (err) {
            throw err;
        }
    }
}