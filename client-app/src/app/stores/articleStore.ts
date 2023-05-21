import { action, makeAutoObservable, runInAction } from "mobx";
import { Article } from "../models/article";
import agent from "../api/agent";
import { v4 as uuid } from "uuid";
import moment from "moment";

export default class ArticleStore {
    articlesMap = new Map<string, Article>();
    selectedarticle : Article | undefined = undefined
    editMode : boolean = false
    loading : boolean = false
    loadinginitial : boolean = false;
    
    constructor () {
        makeAutoObservable(this)
    }
    
    get articleByDate() {
        return Array.from(this.articlesMap.values()).sort((a, b) => 
        Date.parse(a.createDate) - Date.parse(b.createDate))
    }
    
    groupArticles = () => { 
        return Object.entries(
            this.articleByDate.reduce((articles, article) => {
                // const date = article.createDate;
                const date = moment(article.createDate).format("MMM DD YYYY");
                articles[date] = articles[date] ? [...articles[date], article] : [article];
                return articles;
            }, {} as {[key : string] : Article[]})
        )
    }

    // Select all articles
    // Promise version
    // In MobX, every step (tick) that updates observables 
    // in an asynchronous process should be marked as action
    List = async () => {
        this.setLoadingInitial(true);
        try {
            var articles = await agent.Articles.List();
            articles.forEach((item) => {
                this.articlesMap.set(item.artID, item);
                this.setLoadingInitial(false)
            })
        } catch (error) {
            this.setLoadingInitial(false)
            console.log(error)
        }
    }
    //#region Alternatives   
    // instead of generate a function, we can do like following as the instruction from the MobX doc    
    // https://mobx.js.org/actions.html
    // List = () => {
    //     this.loadinginitial = true;
    //     agent.Articles.List().then(
    //         action("sucess", res => {
    //             this.articles = res;
    //             this.loadinginitial = false;
    //     }), action("failed", error =>{
    //             this.loadinginitial = false;
    //             console.log(error)
    //     }))
    // }

    //async/await version
    // List_2 = async () => {
    //     this.loadinginitial = true;
    //     try {
    //         var response = await agent.Articles.List();
    //         runInAction(() => {
    //             this.articles = response;
    //             this.loadinginitial = false;
    //         })
    //     } catch (error : any) {
    //         console.log(error.message);
    //         runInAction(()=>{
    //             this.loadinginitial = false;
    //         })
    //     }
    // }
    //#endregion
   
    setLoadingInitial (state:boolean){
        this.loadinginitial = state;
    }

    LoadArticle = async (id: string) => {
        this.setLoadingInitial(true);
        let article = this.articlesMap.get(id);
        if (article)
        {
            this.selectedarticle = article;
            this.setLoadingInitial(false);
            return article;
        } 
        else{
            this.setLoadingInitial(true)
            try {
                article = await agent.Articles.Details(id);
                runInAction(() => {this.selectedarticle = article;})          
                this.setLoadingInitial(false)
                return article;
            } catch (error) {
                this.setLoadingInitial(false)
                console.log(error)
            }
        }
    }


    // get the selected article
    SelectArticle = (id : string) => {
        this.selectedarticle = this.articlesMap.get(id);
        this.setLoadingInitial(false);
    }

    // cancel select (set to undefine)
    CancleSelectArticle = () =>{
        this.selectedarticle = undefined;
    }

    // Create article
    CreateArticle = async (article : Article) => {
        this.loading = true;
        article.artID = uuid();
        article.createDate = new Date().toISOString();
        agent.Articles.Create(article).then(
            action(("CreateSucess"), () => {
                // ... spreading articles array into individual article,
                // and exclude the one we just edit
                //, and the append the one we just editted
                // this.articles = [...this.articles, article]
                // Change to use javascript map
                this.articlesMap.set(article.artID, article);
                this.selectedarticle = article
                this.editMode = false;
                this.loading = false;
            })
            ,action(("CreateFailed"), Error => {
                this.selectedarticle = article
                this.editMode = false;
                this.loading = false;
                console.log(Error)
            })
        )
    }

    // Edit article
    // EditArticle = async (article : Article) =>{
    //     this.loading = true;
    //     agent.Articles.Update(article).then(
    //     action(("EditSucess"), () => {
    //         this.articlesMap.set(article.artID, article);
    //         this.selectedarticle = article
    //         this.editMode = false;
    //         this.loading = false;
    //       }), 
    //       action(("EditFailed"), Error => {
    //         this.editMode = false;
    //         this.loading = false;xdescribe
    //         console.log(Error);
    //       })
    //     )
    // }

    EditArticle = async (article : Article) =>{
        this.loading = true;
        try {
            await agent.Articles.Update(article);
            runInAction(() => {
                this.articlesMap.set(article.artID, article);
                this.selectedarticle = article
                this.editMode = false;
                this.loading = false;
            })
        } catch (error) {
            runInAction(() => {
                this.editMode = false;
                this.loading = false;
                console.log(error);
            })
        }
    }

    // Dlete article
    DeleteArticle = async (id: string) => {
        this.loading = true;
        try {
            await agent.Articles.Delete(id);
            runInAction(() => {
                if (this.selectedarticle?.artID === id) this.CancleSelectArticle();
                this.articlesMap.delete(id);   
                this.groupArticles();     
                this.loading = false;
            })
        } catch (error) {
            runInAction(() => {
                this.loading = false;
                console.log(error);
            })
        }
    }
}
