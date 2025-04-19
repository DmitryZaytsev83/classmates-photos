'use client';

import '@ant-design/v5-patch-for-react-19';
import AuthModal from '@/modules/AuthModal/AuthModal';
import HeroSection from '@/components/HeroSection/HeroSection';
import {useState} from 'react';

export default function Home() {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleModalClose = () => setIsModalVisible(false);

    return (
        <>
            <HeroSection />
            <AuthModal isOpen={isModalVisible} onClose={handleModalClose} />
        </>
    );
}
