"use client";

import {useState} from 'react';
import {Modal, Form, Input, Button} from 'antd';

type AuthModalProps = {
    isOpen: boolean;
    onClose: () => void;
}

type onFinishProps = {
    email: string;
    password: string;
    passwordConfirm: string;
}

export default function AuthModal({isOpen, onClose}: AuthModalProps) {
    const [isLoginMode, setIsLoginMode] = useState(true);

    const onFinish = (values: onFinishProps) => {
        console.log(isLoginMode ? 'Вход:' : 'Регистрация:', values);
        onClose();
    };

    return (
        <Modal
            title={
                isLoginMode
                    ? 'Войти'
                    : 'Регистрация'
            }
            open={isOpen}
            onCancel={onClose}
            footer={null}>
            <Form
                onFinish={onFinish}
                layout="vertical">
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                            required: true,

                            message: 'Введите email!'
                        }
                    ]}>
                    <Input/>
                </Form.Item>
                <Form.Item
                    label="Пароль"
                    name="password" rules={[
                    {
                        required: true,
                        message: 'Введите пароль!'
                    }
                ]}>
                    <Input.Password/>
                </Form.Item>
                {
                    !isLoginMode && (
                        <Form.Item label="Подтвердите пароль" name="confirmPassword" rules={[
                            {
                                required: true,
                                message: 'Подтвердите пароль!'
                            },
                            ({getFieldValue}) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('Пароли не совпадают!'));
                                },
                            }),
                        ]}>
                            <Input.Password/>
                        </Form.Item>
                    )
                }
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit" block>
                        {
                            isLoginMode
                                ? 'Войти'
                                : 'Зарегистрироваться'
                        }
                    </Button>
                </Form.Item>
                <Button
                    type="link"
                    onClick={() => setIsLoginMode(!isLoginMode)}>
                    {
                        isLoginMode
                            ? 'Нет аккаунта? Зарегистрируйтесь'
                            : 'Уже есть аккаунт? Войдите'
                    }
                </Button>
            </Form>
        </Modal>
    );
}
