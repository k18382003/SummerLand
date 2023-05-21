import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { User, UserFormValue } from "../models/user";
import { store } from "./store";
import { router } from "../route/Routes";


export default class AccountStore {
    currentUser : User | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    get isLoggedIn() {
        return !!this.currentUser;
    }

    login = async(cred:UserFormValue) => {
        try {
            const user = await agent.Account.LogIn(cred);
            store.commondstore.setToken(user.token);
            runInAction(() => this.currentUser = user);
            store.modalstore.closeModal();
            router.navigate('/articles');
        }
        catch(err) {
            throw err;
        }
    }

    logout = async() => {
        try {
            store.commondstore.setToken(null);
            runInAction(()=>{this.currentUser = null})
            router.navigate('/');
        } catch (error) {
            throw error;
        }
    }

    Register = async(cred:UserFormValue) => {
        try {
            const user = await agent.Account.Register(cred);
            store.commondstore.setToken(user.token);
            runInAction(() => this.currentUser = user);
            store.modalstore.closeModal();
            router.navigate('/articles');
        }
        catch(err) {
            throw err;
        }
    }

    getCurrentUser = async() => {
        try {
            var user = await agent.Account.CurrentUser();
            runInAction(() => this.currentUser = user);
        } catch(err) {
            console.log(err);
        }
    }
}