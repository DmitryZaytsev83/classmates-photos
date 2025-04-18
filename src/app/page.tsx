"use client";

import '@ant-design/v5-patch-for-react-19';
import Navbar from '@/app/modules/Navbar/Navbar';
import AuthModal from '@/app/modules/AuthModal/AuthModal';
import HeroSection from './components/HeroSection/HeroSection';
import {useState} from 'react';

export default function Home() {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLoginClick = () => setIsModalVisible(true);
    const handleModalClose = () => setIsModalVisible(false);

    return (
        <>
            <Navbar isLoggedIn={isLoggedIn} onLoginAction={handleLoginClick}/>
            <HeroSection/>
            <AuthModal isOpen={isModalVisible} onClose={handleModalClose}/>
        </>
    );
}
