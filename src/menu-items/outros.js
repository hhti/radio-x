// assets
import {
  IconBrandChrome,
  IconCertificate,
  IconHelp,
  IconLayoutCards,
} from '@tabler/icons';

// constant
const icons = { IconBrandChrome, IconHelp, IconCertificate, IconLayoutCards };

// ==============================|| DOCUMENTAÇÃO DOS NENUS ||============================== //

const outros = {
  id: 'outros',
  type: 'group',
  children: [
    {
      id: 'sobre',
      title: 'Sobre a Radio X',
      type: 'item',
      url: '/sobre',
      icon: icons.IconHelp,
      breadcrumbs: false,
    },
  ],
};

export default outros;
