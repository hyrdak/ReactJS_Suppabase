import React, { useState, useEffect, useRef } from 'react';
import { SupabaseClient } from '@supabase/supabase-js';
import { Link } from 'react-router-dom';

interface Props {
  supabase: SupabaseClient;
}

const SignUp: React.FC<Props> = ({ supabase }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [confirmEmail, setConfirmEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [nameError, setNameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [confirmEmailError, setConfirmEmailError] = useState('');
    const displayNameInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      if (displayNameInputRef.current) {
        displayNameInputRef.current.focus();
      }
    }, []);

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newEmail = event.target.value;
        setEmail(newEmail);
        setEmailError(validateEmail(newEmail) ? '' : 'Email chưa hợp lệ');
    };
    
    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newPassword = event.target.value;
        setPassword(newPassword);
        setPasswordError(newPassword.length >= 6 ? '' : 'Mật khẩu phải có ít nhất 6 ký tự');
        setConfirmPasswordError(confirmPassword && newPassword !== confirmPassword ? 'Mật khẩu không khớp' : '');
    };

    const handleDisplayNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newName = event.target.value;
        setDisplayName(newName);
        setNameError(newName ? '' : 'Vui lòng nhập tên hiển thị');
    };

    const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newConfirmPassword = event.target.value;
        setConfirmPassword(newConfirmPassword);
        setConfirmPasswordError(newConfirmPassword !== password ? 'Mật khẩu không khớp' : '');
    };

    const handleConfirmEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newConfirmEmail = event.target.value;
        setConfirmEmail(newConfirmEmail);
        setConfirmEmailError(newConfirmEmail !== email ? 'Email không khớp' : '');
    };

    const validateEmail = (email: string): boolean => {
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return pattern.test(email);
    };

    const signup_action = async () => {
        setEmailError(email ? '' : 'Vui lòng nhập email');
        setNameError(displayName ? '' : 'Vui lòng nhập tên hiển thị');
        setPasswordError(password ? '' : 'Vui lòng nhập mật khẩu');
        setConfirmPasswordError(confirmPassword ? '' : 'Vui lòng nhập lại mật khẩu');
        setConfirmEmailError(confirmEmail ? '' : 'Vui lòng nhập lại email');

        try {
            if (emailError || nameError || passwordError || confirmPasswordError || confirmEmailError) {
                throw new Error('Vui lòng điền đầy đủ thông tin');
            }
            if (!confirmEmail) {
                throw new Error('Vui lòng nhập lại email');
            }
            
            const { data, error } = await supabase.auth.signUp({
                email: email,
                password: password,
                options: {
                    data: { display_name: displayName },
                },
            });
            if (error) {
                throw error;
            }
            alert('Đăng ký thành công! \n Email: ' + data.user?.email);
            window.location.href = '/signin';
        } catch (error:any) {
            console.error('Lỗi đăng ký:', error.message);
        }
    };

    return (
        <div className="container mx-auto mt-10">
            <div className="max-w-md mx-auto">
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <p className="text-2xl font-bold mb-8 text-center">Đăng ký</p>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Tên hiển thị</label>
                        <input
                            ref={displayNameInputRef}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="name"
                            type="text"
                            placeholder="Nhập tên của bạn"
                            value={displayName}
                            onChange={handleDisplayNameChange}
                        />
                        {nameError && <small className='text-red-500'>{nameError}</small>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            type="email"
                            placeholder="Nhập địa chỉ email"
                            value={email}
                            onChange={handleEmailChange}
                        />
                        {emailError && <small className='text-red-500'>{emailError}</small>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmEmail">Nhập lại email</label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="confirmEmail"
                            type="email"
                            placeholder="Nhập lại địa chỉ email"
                            value={confirmEmail}
                            onChange={handleConfirmEmailChange}
                        />
                        {confirmEmailError && <small className='text-red-500'>{confirmEmailError}</small>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Mật khẩu</label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            type="password"
                            placeholder="Nhập mật khẩu"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                        {passwordError && <small className='text-red-500'>{passwordError}</small>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">Nhập lại mật khẩu</label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="confirmPassword"
                            type="password"
                            placeholder="Nhập lại mật khẩu"
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                        />
                        {confirmPasswordError && <small className='text-red-500'>{confirmPasswordError}</small>}
                    </div>
                    <p className="mb-5 text-right text-slate-400">Bạn đã có tài khoản?
                        <Link to="/signin" className="text-blue-500" style={{ textDecoration: 'none' }}> Đăng nhập</Link>
                    </p>
                    <div className="text-center">
                        <button
                            onClick={signup_action}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="button"
                        >
                            Đăng ký
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUp;