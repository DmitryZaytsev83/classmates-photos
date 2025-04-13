"use client"; // Это клиентский компонент

import {DesktopOutlined, MoonOutlined, SunOutlined} from "@ant-design/icons";
import {CheckboxGroupProps} from "antd/es/checkbox";
import {useState, useEffect} from 'react';
import {Radio} from 'antd';

enum Theme {
    light = 'light',
    dark = 'dark',
    system = 'system',
}

const options: CheckboxGroupProps<string>['options'] = [
    {
        value: Theme.light,
        label: <SunOutlined/>
    },
    {
        value: Theme.system,
        label: <DesktopOutlined/>
    },
    {
        value: Theme.dark,
        label: <MoonOutlined/>
    },
];

const ThemeSwitcher = () => {
    const [theme, setTheme] = useState<Theme>(Theme.system);

    // Функция для применения выбранной темы
    const applyTheme = (selectedTheme: Theme) => {
        let resolvedTheme = selectedTheme;

        if (selectedTheme === Theme.system) {
            // Определяем текущую системную тему
            resolvedTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? Theme.dark : Theme.light;
        }

        // Устанавливаем атрибут data-theme в HTML
        document.documentElement.setAttribute('data-theme', resolvedTheme);

        // Сохраняем выбор в localStorage
        localStorage.setItem('theme', selectedTheme);
    };

    // Инициализация темы при загрузке
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') as Theme || Theme.system;
        setTheme(savedTheme);
        applyTheme(savedTheme);

        // Слушатель изменений системной темы
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = () => {
            if (theme === Theme.system) {
                applyTheme(Theme.system);
            }
        };

        mediaQuery.addEventListener('change', handleChange);

        // Очистка слушателя при размонтировании компонента
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, [theme]);

    // Обработчик изменения темы
    const handleChange = (value: Theme) => {
        setTheme(value);
        applyTheme(value);
    };

    return (
        <Radio.Group
            size="small"
            options={options}
            onChange={(event) => handleChange(event.target.value)}
            value={theme}
            optionType="button"
            buttonStyle="solid"
        />
    );
};

export default ThemeSwitcher;
