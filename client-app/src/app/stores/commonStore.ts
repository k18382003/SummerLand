import { makeAutoObservable, reaction } from "mobx";
import { ServerError } from "../models/serverError";

export default class CommonSotre {
    error: ServerError | null = null;
    token: string | null = localStorage.getItem('jwt'); // store token in the localstorage
    appLoaded: boolean = false;

    constructor() {
        makeAutoObservable(this);
        reaction(
            () => this.token,
            (token) => {
                if (token) {
                    localStorage.setItem('jwt', token);
                    // document.cookie = `Bearer ${token}`;
                }
                else
                    localStorage.removeItem('jwt');
            }
        );
    }

    setServerError(error: ServerError) {
        this.error = error;
    }

    setToken = (token: string | null) => {
        // and have the token inside our store state
        this.token = token;
    }

    setAppLoaded = () => {
        this.appLoaded = true;
    }
}