"use client"; // Это клиентский компонент

import {useState} from 'react';
import styles from './RippleButton.module.css';

interface RippleButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
}

export default function RippleButton({children, onClick}: RippleButtonProps) {
    const [ripples, setRipples] = useState<any[]>([]);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        const button = event.currentTarget;
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        // Добавляем новый ripple
        const newRipple = {x, y, size};
        setRipples((prev) => [...prev, newRipple]);

        // Удаляем ripple после завершения анимации
        setTimeout(() => {
            setRipples((prev) => prev.filter((_, index) => index !== ripples.length));
        }, 600);

        // Вызываем переданный обработчик onClick
        if (onClick) {
            onClick();
        }
    };

    return (
        <button
            className={styles['ripple-button']}
            onClick={handleClick}>
            {children}
            {
                ripples.map((ripple, index) => (
                    <span
                        key={index}
                        className={styles['ripple-effect']}
                        style={{
                            width: ripple.size,
                            height: ripple.size,
                            top: ripple.y,
                            left: ripple.x,
                        }}
                    />
                ))
            }
        </button>
    );
}
