import { Navigate, Route, Routes, RouteProps, useNavigate } from 'react-router-dom'
import  HomePage  from './pages/HomePage.tsx';
import TripDetailsPage from './pages/TripDetailsPage.tsx';
import { Navbar } from './components/navbar/Navbar.tsx'
import { Box } from '@mantine/core'

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
    },
    {
        path: `/trip/:id`,
        element: <TripDetailsPage/>
    }
]
export const AppRoutes = () => {
    const navigate = useNavigate();
    const renderRouteMap = (route: RouteConfig) => (
        <Route key={route.path} {...route} />
    );

    const onClickBrand = () => {
        navigate(`/home`);
    }

    return(
        <>
            <Navbar onClick={onClickBrand}/>
            <Box py="md" px="md">
                <Routes>{routes.map(renderRouteMap)}</Routes>
            </Box>
        </>
    ) 
}