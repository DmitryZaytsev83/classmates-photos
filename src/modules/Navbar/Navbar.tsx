'use client';

import {useState} from 'react';
import Link from 'next/link';
import {Layout, Menu, Button, Drawer, Avatar, Dropdown} from 'antd';
import {HeartOutlined, MenuOutlined} from '@ant-design/icons';
import Navigation from '@/modules/Navbar/Modules/Navigation/Navigation';
import GridContainer from '@/components/GridContainer/GridContainer';
import ThemeSwitcher from '@/modules/ThemeSwitcher/ThemeSwitcher';

import styles from './Navbar.module.css';

const {Header} = Layout;

type NavbarProps = {
    isLoggedIn?: boolean;
    onLoginAction?: () => void;
}

export default function Navbar({isLoggedIn, onLoginAction}: NavbarProps) {
    const [isDrawerVisible, setIsDrawerVisible] = useState(false);


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
                        <Link href="/">
                            <div className={styles.logo}>
                                <HeartOutlined />
                                <span>Родной класс</span>
                            </div>
                        </Link>
                    </div>

                    {/* Навигация для десктопа */}
                    <Navigation />

                    <div className={styles.switcherWrapper}>
                        <ThemeSwitcher />
                    </div>

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
                        <Navigation />
                    </Drawer>
                </div>
            </GridContainer>
        </Header>
    );
}
