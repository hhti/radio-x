// assets
import {
  IconFileCode, IconHeadphones,
  IconListCheck, IconMusic, IconPlayerPlay, IconSettings
} from '@tabler/icons';

// constant
const icons = {
  IconFileCode,
  IconHeadphones,
  IconListCheck,
  IconMusic,
  IconPlayerPlay,
  IconSettings
};

// ==============================|| PLANEJAMENTO ||============================== //

const configuracoes = {
  id: 'geral',
  title: ' ',
  type: 'group',
  children: [
    {
      id: 'audio',
      title: 'Áudio',
      type: 'collapse',
      icon: icons.IconHeadphones,

      children: [
        {
          id: 'tocar',
          title: 'Tocar',
          type: 'item',
          url: '/testeRadio',
          icon: icons.IconPlayerPlay,
          breadcrumbs: false,
        },
        {
          id: 'gestao',
          title: 'Gestão de áudio',
          type: 'item',
          url: '/uploads',
          breadcrumbs: false,
          icon: icons.IconSettings,
        }
      ],
    },
  ],
};

export default configuracoes;
