import React, {useEffect} from 'react';
import {Header} from "../components/Header";
import { GoogleLogin } from 'react-google-login';
import { GoogleLogout } from 'react-google-login';
import { gapi } from 'gapi-script';
import { GOOGLE_API_KEY, CALENDAR_ID } from "../config.js";

export function Login(props) {



    return (
        <div>
            <Header />
        </div>
    );
}
