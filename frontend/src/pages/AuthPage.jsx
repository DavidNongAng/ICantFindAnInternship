/*
 *  This file contains the authentification page.
 *  When first open it will display the login form, and allows the user to switch between login and register views.
 *  Implemented firebase authentification for google logins. 
 */

import React, { useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, registerUser } from '../redux/slices/authSlice';
import '../styles/AuthPage.css';

const AuthPage = () => {

    // State Management
    const [ isLogin, setIsLogin ] = useState(true);
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const dispatch = useDispatch();    
    const { loading, error } = useSelector((state) => state.auth);

    const handleSubmit = (e) => {
        e.preventDefault();
        const credentials = { email, password };
        if(isLogin){
            dispatch(loginUser(credentials));
        }else{
            dispatch(registerUser(credentials));
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-box">
                <h2>{isLogin ? 'Login' : 'Register'}</h2>

                <form onSubmit={handleSubmit} className="auth-form">
                    <input 
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input 
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit" className="auth-button" disabled={loading}>
                        {isLogin ? 'Login' : 'Register'}
                    </button>
                </form>

                {error && <p className="auth-error">{error}</p>}

                {/* Toggle View */}
                <p onClick={() => setIsLogin(!isLogin)} className="toggle-mode">
                    {isLogin ? "Don't' have an account? Register" : 'Already have an account? Login'}
                </p>
            </div>
        </div>
    );
};

export default AuthPage;