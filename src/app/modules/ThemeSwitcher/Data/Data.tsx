import {Theme} from '../types';
import {DesktopOutlined, MoonOutlined, SunOutlined} from '@ant-design/icons';
import React, {JSX} from 'react';

type ThemeOption = {
    value: Theme;
    icon: JSX.Element;
}

export const ThemeOptions: ThemeOption[] = [
    {
        value: Theme.light,
        icon: <SunOutlined />,
    },
    {
        value: Theme.system,
        icon: <DesktopOutlined />,
    },
    {
        value: Theme.dark,
        icon: <MoonOutlined />,
    },
];
