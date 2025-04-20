import NavbarLinks from '@/data/AppNavigation';
import {Grid, Menu, MenuProps} from 'antd';
import {useState} from 'react';

import styles from './Navigation.module.css';
import {getMenuItems} from './Utils/getMenuItems';

const {useBreakpoint} = Grid;


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
