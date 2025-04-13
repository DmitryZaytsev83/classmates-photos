// app/components/ThemeSwitcher.tsx
"use client"; // Это клиентский компонент

import {useState, useEffect} from 'react';
import {Select} from 'antd';

const ThemeSwitcher = () => {
    const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system');

    // Функция для применения выбранной темы
    const applyTheme = (selectedTheme: 'light' | 'dark' | 'system') => {
        let resolvedTheme = selectedTheme;

        if (selectedTheme === 'system') {
            // Определяем текущую системную тему
            resolvedTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }

        // Устанавливаем атрибут data-theme в HTML
        document.documentElement.setAttribute('data-theme', resolvedTheme);

        // Сохраняем выбор в localStorage
        localStorage.setItem('theme', selectedTheme);
    };

    // Инициализация темы при загрузке
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | 'system' || 'system';
        setTheme(savedTheme);
        applyTheme(savedTheme);

        // Слушатель изменений системной темы
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = (e: MediaQueryListEvent) => {
            if (theme === 'system') {
                applyTheme('system');
            }
        };

        mediaQuery.addEventListener('change', handleChange);

        // Очистка слушателя при размонтировании компонента
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, [theme]);

    // Обработчик изменения темы
    const handleChange = (value: 'light' | 'dark' | 'system') => {
        setTheme(value);
        applyTheme(value);
    };

    return (
        <Select
            defaultValue="system"
            value={theme}
            onChange={handleChange}
            options={[
                {
                    value: 'light',
                    label: 'Светлая'
                },
                {
                    value: 'dark',
                    label: 'Темная'
                },
                {
                    value: 'system',
                    label: 'Системная'
                },
            ]}
            style={{width: 120}}
        />
    );
};

export default ThemeSwitcher;
