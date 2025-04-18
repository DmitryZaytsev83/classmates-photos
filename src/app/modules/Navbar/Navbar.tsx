'use client';

import {useState} from 'react';
import {Layout, Menu, Button, Drawer, Avatar, Dropdown} from 'antd';
import {HeartOutlined, MenuOutlined} from '@ant-design/icons';
import Link from 'next/link';
import styles from './Navbar.module.css';
import GridContainer from '@/app/components/GridContainer/GridContainer';
import ThemeSwitcher from '@/app/modules/ThemeSwitcher/ThemeSwitcher';

const {Header} = Layout;

type NavbarProps = {
    isLoggedIn: boolean;
    onLoginAction: () => void;
}

export default function Navbar({isLoggedIn, onLoginAction}: NavbarProps) {
    const [isDrawerVisible, setIsDrawerVisible] = useState(false);

    const menuItems = [
        {
            key: 'games',
            label: <Link href="/games">
                Игры
            </Link>,
        },
        {
            key: 'info',
            label: <Link href="/info">
                Информация
            </Link>,
        },
    ];

    const profileMenu = (
        <Menu>
            <Menu.Item key="profile">Профиль</Menu.Item>
            <Menu.Item key="logout">Выйти</Menu.Item>
        </Menu>
    );

    return (
        <Header className={styles.wrapper}>
            <GridContainer>
                {/* Логотип */}
                <div className={styles.navbar}>
                    <div style={{flex: 1}}>
                        <div className={styles.logo}>
                            <HeartOutlined />
                            <span>Родной класс</span>
                        </div>
                    </div>

                    {/* Навигация для десктопа */}
                    <Menu
                        mode="horizontal"
                        items={menuItems}
                        className={styles['navbar-menu-desktop']}
                    />

                    <ThemeSwitcher />

                    {/* Аватар профиля или кнопка "Войти" */}
                    {
                        isLoggedIn
                            ? (
                                <Dropdown
                                    overlay={profileMenu}
                                    trigger={['click']}>
                                    <Avatar style={{cursor: 'pointer'}}>U</Avatar>
                                </Dropdown>
                            )
                            : (
                                <Button
                                    type="primary"
                                    onClick={onLoginAction}>
                                    Войти
                                </Button>
                            )
                    }

                    {/* Кнопка для открытия Drawer на мобильных устройствах */}
                    <Button
                        icon={<MenuOutlined />}
                        className={styles['navbar-menu-mobile']}
                        onClick={() => setIsDrawerVisible(true)}
                    />

                    {/* Drawer для мобильных устройств */}
                    <Drawer
                        title="Меню"
                        placement="right"
                        onClose={() => setIsDrawerVisible(false)}
                        open={isDrawerVisible}>
                        <Menu mode="vertical" items={menuItems} />
                    </Drawer>
                </div>
            </GridContainer>
        </Header>
    );
}
