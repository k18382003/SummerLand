import { Navigate, RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import ArticleDashBoard from "../../features/articles/dashboard/ArticleDashBoard";
import ArticleForm from "../../features/articles/form/ArticleForm";
import ArticlesDetail from "../../features/articles/detail/ArticleDetail";
import TestErrors from "../../features/error/TestError";
import NotFound from "../../features/error/NotFound";
import ServerError from "../../features/error/ServerError";
import AboutMe from "../../features/aboutme/aboutme";
import Login from "../../features/user/login";

export const routes: RouteObject[] = [
    {
        path : '/',
        element : <App />,
        children : [
            {
                path : '/articles',
                element : <ArticleDashBoard />
            },
            {
                path : '/articles/:id',
                element : <ArticlesDetail />
            },
            {
                path : '/writearticle',
                element : <ArticleForm key='create'/>
            },
            {
                path : '/manage/:id',
                element : <ArticleForm key='manage' />
            },
            {
                path : '/error',
                element : <TestErrors />
            },
            {
                path : '/not-found',
                element : <NotFound />
            },
            {
                path : '/server-error',
                element : <ServerError />
            },
            {
                path : '/about-me',
                element : <AboutMe />
            },
            {
                path : '/login',
                element : <Login />
            },
            {
                path : '*',
                element : <Navigate to='/not-found' />
            }
        ]
        
    }
]

export const router = createBrowserRouter(routes)