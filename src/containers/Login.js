import React, {useEffect} from 'react';
import {gapi} from 'gapi-script';
import {init} from "../services/api";
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

export function Login(props) {

    useEffect(() => {
        handleClientLoad();
    });

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
            }, function (error) {
                appendPre(JSON.stringify(error, null, 2));
            });
    }

    /**
     *  Sign in the user upon button click.
     */
    function handleAuthClick(event) {
        gapi.auth2.getAuthInstance().signIn().then(() => {
            props.history.push('/home');
        });
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

    const classes = useStyles();

    return (
        <Button onClick={handleAuthClick}
                variant="contained"
                color="primary"
                className={classes.button}>
            Sign in
        </Button>
    );
}

const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(1),
    },
    input: {
        display: 'none',
    },
}));
