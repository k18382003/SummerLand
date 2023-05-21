import { makeAutoObservable } from "mobx";

export default class modalStore {   
    open : boolean = false;
    content : JSX.Element | null = null;
    size : "mini" | "tiny" | "small" | "large" | "fullscreen" | undefined = "small"
    closeBtn : boolean | undefined = true;

    constructor() {
        makeAutoObservable(this);        
    }

    openModal = (content : JSX.Element,  modalSize? : "mini" | "tiny" | "small" | "large" | "fullscreen" | undefined, closeBtn?: boolean) => {
        this.open = true;
        this.content = content;
        this.size = modalSize;
        this.closeBtn = closeBtn;
    }

    closeModal = () => {
        this.open = false;
        this.content = null;
    }
}