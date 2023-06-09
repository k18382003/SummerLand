import axios, { AxiosError, AxiosResponse } from "axios";
import { Article } from "../models/article";
import { toast } from "react-toastify";
import { router } from "../route/Routes";
import { store } from "../stores/store";
import { User, UserFormValue } from "../models/user";



// Testing loading
const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay) // use nodeJs settimeout
    })    
}


// set root url
// axios.defaults.baseURL = 'http://localhost:5000/api/';
const axiosInstance = axios.create({
    baseURL : 'http://localhost:5000/api/',
 })

axiosInstance.interceptors.request.use(config => {
    const token = store.commondstore.token;
    if (token) {
        // config.headers.set("Cookies", "123");
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
})

axiosInstance.interceptors.response.use(async res =>{
    await sleep(1000);
    return res;
}, (error : AxiosError) => {
    const {data, status, config} = error.response as AxiosResponse;

    switch (status) {
        case 400:
            if (data.errors &&config.method === 'get' && data.errors.hasOwnProperty("ArticleID"))
            {
                router.navigate('not-found'); 
            }

            if (data.errors)
            {
                const modalStateError = [];
                for (var key in data.errors) {
                    if (data.errors[key]) {
                        modalStateError.push(data.errors[key]);
                    }
                }
                throw modalStateError.flat();
            } 
            else
            {
                toast.error(data);
            }
            break;
        case 401:
            toast.error('Unauthorized');
            break;
        case 403:
            toast.error('forbidden');
            break;
        case 404:
            router.navigate('not-found');
            break;
        case 500:
            store.commondstore.setServerError(data);
            router.navigate('server-error');
            break;
    }
    return Promise.reject(error);
})

// use <T> to be able to specify the returning type later
const resBody = <T>(res: AxiosResponse<T>) => {
        res.config.headers.set("Access-Control-Allow-Origin", "true");
        return res.data;    
    }; 

// setting resAPI function and return type
const requests = {
    get: <T>(url: string) => axiosInstance.get<T>(url).then(resBody),
    post: <T>(url: string, body: object) => axiosInstance.post<T>(url, body).then(resBody),
    put: <T>(url: string, body: object) => axiosInstance.put<T>(url, body).then(resBody),
    del: <T>(url: string) => axiosInstance.delete<T>(url).then(resBody)
}

// declare function
const Articles = {
    List : () => requests.get<Article[]>(`./article`),
    // for the routing
    Details : (id : string ) => requests.get<Article>(`./article/${id}`),
    Create : (article: Article) => requests.post<void>(`./article`, article),
    Update : (article : Article) => requests.put<void>(`./article/${article.artID}`, article),
    Delete : (id: string) => requests.del<void>(`./article/${id}`)
}

const Account = {
    CurrentUser : () => requests.get<User>('./account'),
    LogIn : (user : UserFormValue) => requests.post<User>('./account/login', user),
    Register : (user : UserFormValue) => requests.post<User>('./account/register', user)
}

// using agent avariable
const agent = {
    Articles,
    Account
}

export default agent;