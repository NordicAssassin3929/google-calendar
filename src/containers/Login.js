import React, {useEffect} from 'react';
import { gapi } from 'gapi-script';
import { init } from "../services/api";

export function Login(props) {

    useEffect(() => {
        handleClientLoad();
    });

    var authorizeButton = document.getElementById('authorize_button');
    var signoutButton = document.getElementById('signout_button');

    /**
     *  On load, called to load the auth2 library and API client library.
     */
    function handleClientLoad() {
        gapi.load('client:auth2', initClient);
    }

    /**
     *  Initializes the API client library and sets up sign-in state
     *  listeners.
     */
    function initClient() {
        init()
            .then(function () {
        }, function(error) {
            appendPre(JSON.stringify(error, null, 2));
        });
    }

    /**
     *  Sign in the user upon button click.
     */
    function handleAuthClick(event) {
        gapi.auth2.getAuthInstance().signIn();
        // need callback here !
        props.history.push('/home');
    }

    /**
     *  Sign out the user upon button click.
     */
    function handleSignoutClick(event) {
        gapi.auth2.getAuthInstance().signOut();
    }

    /**
     * Append a pre element to the body containing the given message
     * as its text node. Used to display the results of the API call.
     *
     * @param {string} message Text to be placed in pre element.
     */
    function appendPre(message) {
        var pre = document.getElementById('content');
        var textContent = document.createTextNode(message + '\n');
        pre.appendChild(textContent);
    }

    return (
        <div>
            <button id="authorize-button" onClick={handleAuthClick}>Authorize</button>
            <button id="signout-button" onClick={handleSignoutClick}>Sign Out</button>
        </div>
    );
}
