import { createContext, useContext } from "react";
import ArticleStore from "./articleStore";
import CommandSotre from "./commonStore";
import AccountStore from "./accountStore";
import modalStore from "./modalStore";

interface Store {
    articlestore : ArticleStore
    commondstore : CommandSotre
    accountstore : AccountStore
    modalstore : modalStore
}

export const store : Store = {
    articlestore: new ArticleStore(),
    commondstore : new CommandSotre(),
    accountstore : new AccountStore(),
    modalstore : new modalStore()

}

export const StoreContext = createContext(store)

export function useStore(){
    return useContext(StoreContext)
}