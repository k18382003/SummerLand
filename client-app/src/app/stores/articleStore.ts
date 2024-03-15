import { action, makeAutoObservable, reaction, runInAction } from "mobx";
import { Article } from "../models/article";
import agent from "../api/agent";
import moment from "moment";
import { store } from "./store";
import { PageParams, Pagination } from "../models/pagination";

export default class ArticleStore {
    articlesMap = new Map<string, Article>();
    selectedarticle: Article | undefined = undefined
    editMode: boolean = false
    loading: boolean = false
    loadinginitial: boolean = false;
    pagination: Pagination | null = null;
    pageParams = new PageParams();
    preditcate = new Map().set('all', true);

    constructor() {
        makeAutoObservable(this)

        reaction(
            () => this.preditcate.keys(),
            () => {
                this.pageParams = new PageParams();
                this.articlesMap.clear();
                this.List();
            })
    }

    get articleByDate() {
        return Array.from(this.articlesMap.values()).sort((a, b) =>
            Date.parse(b.createDate) - Date.parse(a.createDate))
    }

    setPredicate = (predicate: string, active: any) => {
        switch (predicate) {
            case "all":
                this.preditcate.clear();
                this.preditcate.set('all', active);
                break;
            case "myfavorites":
                this.preditcate.clear();
                this.preditcate.set('myfavorites', active);
                break;
            case "myarticles":
                this.preditcate.clear();
                this.preditcate.set('myarticles', active);
                break;
            case "topfive":
                this.preditcate.clear();
                this.preditcate.set('topfive', active);
                break;
            case "searchkeywords":
                this.preditcate.clear();
                this.preditcate.set('searchkeywords', active);
                break;
        }
    }

    setPageParams = (pageParam: PageParams) => {
        this.pageParams = pageParam;
    }

    get axioParams() {
        const params = new URLSearchParams();
        params.append("pageNumber", this.pageParams.pageNumber.toString());
        params.append("pageSize", this.pageParams.pageSize.toString());
        this.preditcate.forEach((value, key) => {
            params.append(key, value.toString());
        })
        return params;
    }

    groupArticles = () => {
        return Object.entries(
            this.articleByDate.reduce((articles, article) => {
                // const date = article.createDate;
                const date = moment(article.createDate).format("MMM DD YYYY");
                articles[date] = articles[date] ? [...articles[date], article] : [article];
                return articles;
            }, {} as { [key: string]: Article[] })
        )
    }

    // Select all articles
    // Promise version
    // In MobX, every step (tick) that updates observables 
    // in an asynchronous process should be marked as action
    List = async () => {
        this.setLoadingInitial(true);
        try {
            var result = await agent.Articles.List(this.axioParams);
            result.data.forEach((item) => {
                item.myFav = item.favoriteBy?.findIndex(a => a.userName === store.accountstore.currentUser?.userName) != -1
                item.isauthor = store.accountstore.currentUser?.userName == item.authorName
                this.articlesMap.set(item.artID, item);
            })
            this.setPagination(result.pagination);
            this.setLoadingInitial(false)
        } catch (error) {
            this.setLoadingInitial(false)
            console.log(error)
        }
    }

    setPagination = (pagination: Pagination) => {
        this.pagination = pagination;
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

    setLoadingInitial(state: boolean) {
        this.loadinginitial = state;
    }

    LoadArticle = async (id: string) => {
        this.setLoadingInitial(true);
        let article = this.articlesMap.get(id);
        if (article) {
            article.myFav = article.favoriteBy?.find(a => a.userName === store.accountstore.currentUser?.userName) !== undefined
            article.isauthor = store.accountstore.currentUser?.userName == article.authorName
            this.selectedarticle = article;
            this.setLoadingInitial(false);
            return article;
        }
        else {
            this.setLoadingInitial(true)
            try {
                article = await agent.Articles.Details(id);
                article.myFav = article.favoriteBy?.find(a => a.userName === store.accountstore.currentUser?.userName) !== undefined
                runInAction(() => {
                    this.selectedarticle = article;
                })
                this.setLoadingInitial(false)
                return article;
            } catch (error) {
                this.setLoadingInitial(false)
                console.log(error)
            }
        }
    }


    // get the selected article
    SelectArticle = (id: string) => {
        this.selectedarticle = this.articlesMap.get(id);
        this.setLoadingInitial(false);
    }

    // cancel select (set to undefine)
    CancleSelectArticle = () => {
        this.selectedarticle = undefined;
    }

    // Create article
    CreateArticle = async (article: Article) => {
        this.loading = true;
        article.createDate = new Date().toISOString();
        article.authorName = store.accountstore.currentUser!.userName;
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
            , action(("CreateFailed"), Error => {
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

    EditArticle = async (article: Article) => {
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
                this.articlesMap.delete(id);
                if (this.selectedarticle?.artID === id) this.CancleSelectArticle();
                this.groupArticles();
                this.loading = false;
                store.modalstore.closeModal();
            })
        } catch (error) {
            runInAction(() => {
                this.loading = false;
                console.log(error);
            })
        }
    }

    UpdateFav = async () => {
        var user = store.accountstore.currentUser;
        this.loading = true;
        try {
            await agent.Articles.EditFav(this.selectedarticle!.artID)
            runInAction(() => {
                if (this.selectedarticle?.myFav) {
                    this.selectedarticle.favoriteBy = this.selectedarticle.favoriteBy?.filter(a => a.userName !== user?.userName)
                    this.selectedarticle.myFav = false;
                }
                else {
                    this.selectedarticle!.favoriteBy =
                        this.selectedarticle!.favoriteBy?.concat({
                            bio: "",
                            displayName: user!.displayName,
                            image: user?.image,
                            userName: user!.userName
                        })
                    this.selectedarticle!.myFav = true;
                }
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            this.loading = false;
        } finally {

        }
    }
}
