/*
 *  This file contains the authentification page.
 *  When first open it will display the login form, and allows the user to switch between login and register views.
 *  Implemented firebase authentification for google logins. 
 */

import React, { useState } from 'react';
import { auth, provider } from '../firebase';
import { signInWithPopup } from 'firebase/auth';
import '../styles/AuthPage.css';

const AuthPage = () => {
    const [ isLogin, setIsLogin ] = useState(true);

    const handleGoogleLogin = async () => {
        try{
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            console.log('User signed in: ', user);
            // Send info to backend
        }catch(err){
            console.error('Google sign-in error: ', err );
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-box">
                <h2>{isLogin ? 'Login' : 'Register'}</h2>

                {/* Google Auth Button */}
                <button onClick={handleGoogleLogin} className="google-button">
                    Continue with Google 
                </button>

                {/* Toggle View */}
                <p onClick={() => setIsLogin(!isLogin)} className="toggle-mode">
                    {isLogin ? "Don't' have an account? Register" : 'Already have an account? Login'}
                </p>
            </div>
        </div>
    );
};

export default AuthPage;