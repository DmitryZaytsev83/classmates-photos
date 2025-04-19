import React from 'react';
import styles from './GridContainer.module.css';

interface GridContainerProps {
    children: React.ReactNode;
}

const GridContainer = ({children}: GridContainerProps) => {
    return (
        <div className={styles['grid-container']}>
            {children}
        </div>
    );
}

export default GridContainer;
