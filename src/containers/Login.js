import React from 'react';
import {Header} from "../components/Header";
import { GoogleLogin } from 'react-google-login';
import {GoogleAPI} from 'react-google-oauth'

export function Login(props) {

    const responseGoogle = (response) => {
        console.log(response);
    };

    return (
        <div>
            <Header />
            <GoogleAPI clientId="827593341333-7u9kvo2hav67polo622mmg9u1vlo8ta7.apps.googleusercontent.com"
                       onUpdateSigninStatus={Function}
                       onInitFailure={Function} >
            </GoogleAPI>
        </div>
    );
}
