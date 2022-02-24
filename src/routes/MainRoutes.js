// project imports
import MainLayout from 'layout/MainLayout';
import { lazy } from 'react';
import Loadable from 'ui-component/Loadable';

// dashboard routing

//Outros

const Sobre = Loadable(lazy(() => import('views/sobre')));
const TesteRadio = Loadable(lazy(() => import('views/testeRadio')));
const MainPageRadio = Loadable(lazy(() => import('views/mainPageRadio')));
const Uploads = Loadable(lazy(() => import('views/uploads')));
const ListarAudios = Loadable(lazy(() => import('views/listarAudios')));


// ==============================|| PRINCIPAIS ROTAS ||============================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <TesteRadio />
        },
        {
            path: '/sobre',
            element: <Sobre />
        },
        {
            path: '/main',
            element: <MainPageRadio />
        },
        {
            path: '/testeRadio',
            element: <TesteRadio />
        },
        {
            path: '/mainpage',
            element: <MainPageRadio />
        },
        {
            path: '/uploads',
            element: <Uploads />
        },
        {
            path: '/listarAudios',
            element: <ListarAudios />
        }
    ]
};

export default MainRoutes;
