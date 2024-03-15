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
import ConfirmPage from "../../features/email/ConfirmPage";
import RequestPage from "../../features/email/RequestPage";
import ResendConfirm from "../../features/email/ResendConfirm";
import ErrorPage from "../../features/email/ErrorPage";
import ProfilePage from "../../features/profile/ProfilePage";
import RequireAuth from "../../features/user/requireAuth";

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <App />,
        children: [
            {
                element: <RequireAuth />,
                children: [
                    {
                        path: '/article',
                        element: <ArticleDashBoard />
                    },
                    {
                        path: '/article/:id',
                        element: <ArticlesDetail />
                    },
                    {
                        path: '/writearticle',
                        element: <ArticleForm key='create' />
                    },
                    {
                        path: '/manage/:id',
                        element: <ArticleForm key='manage' />
                    },
                    {
                        path: '/failed-resend',
                        element: <ErrorPage />
                    },
                    {
                        path: '/profile/:username',
                        element: <ProfilePage />,

                    },

                ]
            },
            {
                path: '/error',
                element: <TestErrors />
            },
            {
                path: '/not-found',
                element: <NotFound />
            },
            {
                path: '/server-error',
                element: <ServerError />
            },
            {
                path: '/about-me',
                element: <AboutMe />
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/confirm-email',
                element: <ConfirmPage />
            },
            {
                path: '/confirm-request',
                element: <RequestPage />
            },
            {
                path: '/resend-email',
                element: <ResendConfirm />
            },
            {
                path: '*',
                element: <Navigate to='/not-found' />
            }
        ]

    }
]

export const router = createBrowserRouter(routes)