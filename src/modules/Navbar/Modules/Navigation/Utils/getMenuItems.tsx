import {NavbarLink} from '@/types/App';
import Link from 'next/link';

export const getMenuItems = (items: NavbarLink[]) => {
    return items.map((item) => ({
        key: item.key,
        label: (
            <Link href={item.link}>
                {item.title}
            </Link>
        ),
    }));
};
