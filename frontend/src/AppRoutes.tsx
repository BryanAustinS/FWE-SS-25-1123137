import { Navigate, Route, Routes, RouteProps } from 'react-router-dom'
import  HomePage  from './pages/HomePage.tsx';

export type RouteConfig = RouteProps & {
    path: string;
    isPrivate?: boolean
}

export const routes: RouteConfig[] = [
    {
        isPrivate: true,
        path: '/',
        element: <Navigate to="/home" replace />,
        index: true,
    },
    {
        path: '/home',
        element: <HomePage />
    }
]
export const AppRoutes = () => {
    const renderRouteMap = (route: RouteConfig) => (
        <Route key={route.path} {...route} />
    );

    return <Routes>{routes.map(renderRouteMap)}</Routes>
}