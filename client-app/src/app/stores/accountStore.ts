import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { User, UserFormValue } from "../models/user";
import { store } from "./store";
import { router } from "../route/Routes";
import { toast } from "react-toastify";

export default class AccountStore {
    currentUser: User | null = null;
    refreshTokenTimeout?: NodeJS.Timeout;
    ReminderTimeout?: NodeJS.Timeout;
    showsessionReminder: boolean = false;
    reminder_timer: number = 0;
    reminder_loader = false;
    session_timeup = false;

    constructor() {
        makeAutoObservable(this);
    }

    get isLoggedIn() {
        return !!this.currentUser;
    }

    login = async (cred: UserFormValue) => {
        try {
            const user = await agent.Account.LogIn(cred);
            if (user.emailConfirmed != true) {
                store.modalstore.closeModal();
                router.navigate('/confirm-request');
                return;
            }
            store.commonstore.setToken(user.token);
            this.startRefreshTokenTimer(user);
            runInAction(() => this.currentUser = user);
            store.modalstore.closeModal();
            router.navigate('/article');
        }
        catch (err) {
            throw err;
        }
    }

    logout = async () => {
        try {
            store.commonstore.setToken(null);
            runInAction(() => { this.currentUser = null })
            this.showsessionReminder = false;
            this.stopRefreshTokenTimer();
            router.navigate('/');
            if (!this.session_timeup) {
                toast.info("You have logged out successfully.", {
                    position: "top-center"
                })
            }
            runInAction(() => { this.session_timeup = false })
        } catch (error) {
            throw error;
        }
    }

    Register = async (cred: UserFormValue) => {
        try {
            await agent.Account.Register(cred);
            // store.commondstore.setToken(user.token);
            // runInAction(() => this.currentUser = user);
            store.modalstore.closeModal();
            router.navigate('/confirm-request');
        }
        catch (err) {
            throw err;
        }
    }

    getCurrentUser = async () => {
        try {
            var user = await agent.Account.CurrentUser();
            runInAction(() => this.currentUser = user);
            store.commonstore.setToken(user.token);
            this.startRefreshTokenTimer(user);
        } catch (err) {
            console.log(err);
        }
    }

    setImage = (img: string) => {
        if (this.currentUser) {
            this.currentUser.image = img;
        }
    }

    refreshToken = async () => {
        this.reminder_loader = true;
        this.stopRefreshTokenTimer();
        try {
            var user = await agent.Account.RefreshToken();
            runInAction(() => {
                this.currentUser = user
                this.showsessionReminder = false;
                this.reminder_loader = false;
            });
            store.commonstore.setToken(user.token);
            this.startRefreshTokenTimer(user);
        } catch (error) {
            console.log(error);
        }
    }

    private startRefreshTokenTimer = (user: User) => {
        var token = JSON.parse(atob(user.token.split('.')[1]));
        // Convert token's expire time(present by seconds) to Date
        // Need to * 1000, because new Date function takes with milliseconds
        var expires = new Date(token.exp * 1000);
        console.log('expire', expires);
        // Pop refresh message 30 seconds before session expired.
        var timeout = expires.getTime() - Date.now();
        console.log('timeout', timeout);
        var reminder = timeout - (30 * 1000);
        this.reminder_timer = Math.floor(reminder / 1000);
        console.log(reminder);
        this.ReminderTimeout = setTimeout(() => {
            this.showsessionReminder = true;
        }, reminder);
        this.refreshTokenTimeout = setTimeout(() => {
            this.session_timeup = true;
            this.showsessionReminder = false;
            this.logout();
            toast.error('Session expired. Please login agin.', {
                position: "top-center"
            });
        }, timeout);
    }

    private stopRefreshTokenTimer = () => {
        clearTimeout(this.refreshTokenTimeout);
        clearTimeout(this.ReminderTimeout);
    }
}
