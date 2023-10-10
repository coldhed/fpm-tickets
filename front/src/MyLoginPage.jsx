// in src/MyLoginPage.js
import * as React from 'react';
import { useState } from 'react';
import { useLogin, useNotify, Notification } from 'react-admin';

const MyLoginPage = ({ theme }) => {
    const [username, setusername] = useState('');
    const [password, setPassword] = useState('');
    const login = useLogin();
    const notify = useNotify();

    const handleSubmit = e => {
        e.preventDefault();
        // will call authProvider.login({ username, password })
        login({ username, password }).catch(() =>
            notify('Invalid username or password')
        );
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                name="username"
                type="username"
                value={username}
                onChange={e => setusername(e.target.value)}
            />
            <input
                name="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
            <div class="text-3xl" >Test</div>
            <button type="submit">Sign in</button>
        </form>
    );
};

export default MyLoginPage;