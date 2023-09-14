import { createContext, useContext } from "react";
import ArticleStore from "./articleStore";
import CommonSotre from "./commonStore";
import AccountStore from "./accountStore";
import modalStore from "./modalStore";
import EmailStore from "./emailStore";
import ProfileStore from "./profileStore";
import CommentStore from "./commentStore";

interface Store {
    articlestore: ArticleStore
    commonstore: CommonSotre
    accountstore: AccountStore
    modalstore: modalStore
    emailstore: EmailStore
    profilestore: ProfileStore
    commentstore: CommentStore
}

export const store: Store = {
    articlestore: new ArticleStore(),
    commonstore: new CommonSotre(),
    accountstore: new AccountStore(),
    modalstore: new modalStore(),
    emailstore: new EmailStore(),
    profilestore: new ProfileStore(),
    commentstore: new CommentStore()

}

export const StoreContext = createContext(store)

export function useStore() {
    return useContext(StoreContext)
}