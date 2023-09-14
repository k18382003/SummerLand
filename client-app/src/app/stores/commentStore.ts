import { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { makeAutoObservable, runInAction } from "mobx";
import { store } from "./store";
import { Comment } from "../models/comment";

export default class CommentStore {
    comments: Comment[] = [];
    hubConnection: HubConnection | null = null;

    constructor() {
        makeAutoObservable(this);
    }
    


    createHubConnection = (ArtId: string) => {
        if (store.articlestore.selectedarticle) {
            this.hubConnection = new HubConnectionBuilder()
                .withUrl("http://localhost:5000/chat?artId=" + ArtId, {
                    accessTokenFactory: () => store.accountstore.currentUser?.token as string
                })
                .withAutomaticReconnect()
                .configureLogging(LogLevel.Information)
                .build();

            this.hubConnection.start().catch((error) => console.log("Error occured while connecting Hub : ", error));

            this.hubConnection.on('LoadComments', (comments: Comment[]) => {
                runInAction(() => {
                    this.comments = comments;
                })
            })

            this.hubConnection.on('ReceiveComment', (comment: Comment) => {
                runInAction(() => {
                    this.comments.push(comment);
                })
            })
        }
    }



    stopHubConnection = () => {
        this.hubConnection?.stop().catch((error) => console.log("Error occured while stopping Hub connection : ", error));
    }

    clearComments = () => {
        this.comments = [];
        this.stopHubConnection();
    }

    addComment = async (values: any) => {
        values.artId = store.articlestore.selectedarticle?.artID;
        try {
            await this.hubConnection?.invoke("SendComment", values);
        } catch (error) {
            console.log(error)
        }
    }
}