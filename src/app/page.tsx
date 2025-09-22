"use client";

import { use, useState } from 'react';
import { useRouter } from 'next/navigation';

import Client from '@/services/Client';
import AuthService from '@/services/auth/Auth.service';

export default function Home() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    Client.builder()
      .path('/autenticacion/sesion')
      .skipAuth()
      .data({ username, password })
      .post({
        onSuccess: (data) => {
          const jwtToken = data.data.token;
          AuthService.login(jwtToken);
          
          if (AuthService.checkAuth()) {
            //window.location.replace('/dashboard')
            router.push('/dashboard');
          }
        },
        onError: (error) => {
          console.error('Login error:', error);          
        }
      });
  };

  return (
    <div className="body-root-inner">
      <div className="registration-wrapper-1">
        <div className="logo-area mb--0">
          <img className="mb--10" src="/assets/images/logo/fav.png" alt="logo" />
        </div>
        <h3 className="title animated fadeIn">Constructora Rojas y Reyes</h3>
        <form action="#" className="registration-form">
          <div className="input-wrapper">
            <label htmlFor="user">Usuario</label>
            <input type="text" id="user" value={username} onChange={e => setUsername(e.target.value)} />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Contraseña</label>
            <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} />
          </div>
          <button className="rts-btn btn-primary" onClick={handleLogin} >Iniciar sesión</button>
        </form>
      </div>
    </div>
  );
}
