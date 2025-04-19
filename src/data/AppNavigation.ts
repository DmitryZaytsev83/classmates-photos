import getRoutes from '@/routes/Routes';
import {NavbarLink} from '@/types/App';

const NavbarLinks: NavbarLink[] = [
    {
        title: 'Фото',
        link: getRoutes().appNavigation.photo(),
        key: 'photo',
    },
    {
        title: 'Инфо',
        link: getRoutes().appNavigation.info(),
        key: 'info',
    },
];

export default NavbarLinks;
