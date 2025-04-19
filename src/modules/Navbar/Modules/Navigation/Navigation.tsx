import NavbarLinks from '@/data/AppNavigation';
import {NavbarLink} from '@/types/App';
import {Menu, MenuProps} from 'antd';

import {Grid} from 'antd';
import Link from 'next/link';
import {useState} from 'react';
import styles from './Navigation.module.css';

const {useBreakpoint} = Grid;

const getMenuItems = (items: NavbarLink[]) => {
    return items.map((item) => ({
        key: item.key,
        label: (
            <Link href={item.link}>
                {item.title}
            </Link>
        ),
    }));
};

const Navigation = () => {
    const screens = useBreakpoint();
    const [current, setCurrent] = useState<string>('');

    const onClick: MenuProps['onClick'] = (e) => {
        setCurrent(e.key);
    };

    if (!screens) return null;

    if (screens.md) {
        return (
            <Menu
                className={styles.menu}
                mode="horizontal"
                onClick={onClick}
                selectedKeys={[current]}
                items={getMenuItems(NavbarLinks)}
            />
        );
    }
    return null;
};

export default Navigation;
