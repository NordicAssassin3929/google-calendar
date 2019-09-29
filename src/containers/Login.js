import React from 'react';
import {Header} from "../components/Header";
import { GoogleLogin } from 'react-google-login';
import { GoogleLogout } from 'react-google-login';

export function Login(props) {

    const responseGoogle = (response) => {
        console.log(response.Zi.access_token);
        const token = response.Zi.access_token;
        localStorage.setItem('accessToken', token);
    };

    const logout = (response) => {
        console.log(response);
        localStorage.setItem('accessToken', '');
    };

    return (
        <div>
            <Header />
            <GoogleLogin
                clientId="827593341333-t058si6pfn8t6j7fcdnt44dk9ugup3lq.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
            />
            <GoogleLogout
                clientId="827593341333-t058si6pfn8t6j7fcdnt44dk9ugup3lq.apps.googleusercontent.com"
                buttonText="Logout"
                onLogoutSuccess={responseGoogle}
            >
            </GoogleLogout>
        </div>
    );
}
