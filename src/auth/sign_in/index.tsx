import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { SupabaseClient } from '@supabase/supabase-js';
import '../../tailwind.css';

interface Props {
  supabase: SupabaseClient;
}

const SignIn: React.FC<Props> = ({ supabase }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const emailInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      if (emailInputRef.current) {
        emailInputRef.current.focus();
      }
    }, []);

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
    };

    const signin_action = async () => {
        try {
            const { error } = await supabase.auth.signInWithPassword({
              email: email,
              password: password,
            });
            // console.log(await supabase.auth.getUser());
            if (error) {
                console.error('Error:', error.message);
            }
            // console.table(data.user?.user_metadata.display_name);
            alert('Đăng nhập thành công!');
            window.location.href = '/todolist';
        } catch (error) {
            console.error('Error:', (error as Error).message);
        }
    }

    return (
      <div className="container mx-auto mt-10">
        <div className="max-w-md mx-auto">
          <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <p className="text-2xl font-bold mb-8 text-center">Đăng nhập</p>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
              <input
                ref={emailInputRef}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="text"
                placeholder="Nhập địa chỉ email"
                autoComplete='current-email'
                value={email}
                onChange={handleEmailChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Mật khẩu</label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="Nhập mật khẩu"
                autoComplete='current-password'
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
            <p className="mb-5 text-right text-slate-400">Bạn chưa có tài khoản?
              <Link to="/signup" className="text-blue-500" style={{ textDecoration: 'none' }}> Đăng ký</Link>
            </p>
            <div className="text-center">
              <button
                onClick={signin_action}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Đăng nhập
              </button>
            </div>
          </form>
        </div>
      </div>
    );
};

export default SignIn;