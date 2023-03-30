import axios, { Axios, AxiosResponse } from "axios";
import { Article } from "../models/article";

// Testing loading
const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay) // use nodeJs settimeout
    })    
}

// set root url
axios.defaults.baseURL = 'http://localhost:5000/api/';

// Testing loading
axios.interceptors.request.use(async res =>{
    try {
        await sleep(2000);
        return res;
    } catch (e) {
        console.log(e);
        return await Promise.reject(e);
    }
})

// use <T> to be able to specify the returning type later
const resBody = <T>(res: AxiosResponse<T>) => res.data; 

// setting resAPI function and return type
const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(resBody),
    post: <T>(url: string, body: object) => axios.post<T>(url, body).then(resBody),
    put: <T>(url: string, body: object) => axios.put<T>(url, body).then(resBody),
    del: <T>(url: string) => axios.delete<T>(url).then(resBody)
}

// declare function
const Articles = {
    List : () => requests.get<Article[]>("./article"),
    // for the routing
    Details : (id : string ) => requests.get<Article>(`./article/${id}`),
    Create : (article: Article) => requests.post<void>(`./article`, article),
    Update : (article : Article) => requests.put<void>(`./article/${article.artID}`, article),
    Delete : (id: string) => requests.del<void>(`./article/${id}`)
}

// using agent avariable
const agent = {
    Articles
}

export default agent;