'use client';

import React, {useState, useEffect} from 'react';
import {Segmented} from 'antd';

import {ThemeOptions} from './Data/Data';
import {Theme} from './types';


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
        <Segmented
            value={theme}
            onChange={handleChange}
            options={ThemeOptions}
        />
    );
};

export default ThemeSwitcher;
