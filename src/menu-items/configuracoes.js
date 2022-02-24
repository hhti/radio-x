// assets
import { IconFileCode, IconFilePlus, IconListCheck, IconTrash } from '@tabler/icons';

// constant
const icons = {
    IconFileCode,
    IconFilePlus,
    IconTrash,
    IconListCheck
};

// ==============================|| PLANEJAMENTO ||============================== //

const configuracoes = {
    id: 'geral',
    title: 'Gearl',
    type: 'group',
    children: [
        {
            id: 'audio',
            title: 'Audio',
            type: 'collapse',
            icon: icons.IconFileCode,

            children: [
                {
                    id: 'tocar',
                    title: 'Tocar',
                    type: 'item',
                    url: '/testeRadio',
                    icon: icons.IconFilePlus,
                    breadcrumbs: false
                },
                {
                    id: 'upload',
                    title: 'Uploads',
                    type: 'item',
                    url: '/uploads',
                    breadcrumbs: false,
                    icon: icons.IconTrash
                },
                {
                    id: 'listar_Audios',
                    title: 'Listar Audios',
                    type: 'item',
                    url: '/listarAudios',
                    breadcrumbs: false,
                    icon: icons.IconListCheck
                }
            ]
        }
    ]
};

export default configuracoes;
