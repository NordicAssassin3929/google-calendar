import React, {useEffect, useState} from 'react';
import { useEffectOnce, useUpdateEffect } from 'react-use';
import { Header } from '../components/Header';
import { gapi } from 'gapi-script';
import { CALENDAR_ID } from '../config.js';
import Event from "./Event";
import AddEvent from "./AddEvent";
import { init } from "../services/api";
import {useAsync} from 'react-use';

export function Login() {

    // var authorizeButton = document.getElementById('authorize_button');
    // var signoutButton = document.getElementById('signout_button');
    //
    // /**
    //  *  On load, called to load the auth2 library and API client library.
    //  */
    // function handleClientLoad() {
    //     gapi.load('client:auth2', initClient);
    // }
    //
    // /**
    //  *  Initializes the API client library and sets up sign-in state
    //  *  listeners.
    //  */
    // function initClient() {
    //     gapi.client.init({
    //         apiKey: API_KEY,
    //         clientId: CLIENT_ID,
    //         discoveryDocs: DISCOVERY_DOCS,
    //         scope: SCOPES
    //     }).then(function () {
    //         // Listen for sign-in state changes.
    //         gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
    //
    //         // Handle the initial sign-in state.
    //         updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    //         authorizeButton.onclick = handleAuthClick;
    //         signoutButton.onclick = handleSignoutClick;
    //     }, function(error) {
    //         appendPre(JSON.stringify(error, null, 2));
    //     });
    // }
    //
    // /**
    //  *  Called when the signed in status changes, to update the UI
    //  *  appropriately. After a sign-in, the API is called.
    //  */
    // function updateSigninStatus(isSignedIn) {
    //     if (isSignedIn) {
    //         authorizeButton.style.display = 'none';
    //         signoutButton.style.display = 'block';
    //         listUpcomingEvents();
    //         insertEvent();
    //         listUpcomingEvents();
    //     } else {
    //         authorizeButton.style.display = 'block';
    //         signoutButton.style.display = 'none';
    //     }
    // }
    //
    // /**
    //  *  Sign in the user upon button click.
    //  */
    // function handleAuthClick(event) {
    //     gapi.auth2.getAuthInstance().signIn();
    // }
    //
    // /**
    //  *  Sign out the user upon button click.
    //  */
    // function handleSignoutClick(event) {
    //     gapi.auth2.getAuthInstance().signOut();
    // }
    //
    // /**
    //  * Append a pre element to the body containing the given message
    //  * as its text node. Used to display the results of the API call.
    //  *
    //  * @param {string} message Text to be placed in pre element.
    //  */
    // function appendPre(message) {
    //     var pre = document.getElementById('content');
    //     var textContent = document.createTextNode(message + '\n');
    //     pre.appendChild(textContent);
    // }

    const [events, setEvents] = useState([]);
    const [days, setDays] = useState(7);

    useEffect(() => {
        getEvents();
    }, [days]);

    async function getEvents(){
        function start() {
            let now = new Date();
            let today = (new Date()).toISOString();
            let nextWeek = new Date();
            nextWeek.setDate(now.getDate() + days);
            const next = nextWeek.toISOString();
            init()
                .then(() => {
                return gapi.client.request({
                    'path': `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?timeMax=${next}&timeMin=${today}`,
                })
            }).then((res) => {
                const allEvents = res.result.items;

                let sortedEvents = allEvents.sort((a, b) => {
                    return new Date(a.start.dateTime) - new Date(b.start.dateTime)
                });

                setEvents(sortedEvents);
            }, (reason) => {
                console.log(reason);
            });
        }
        gapi.load('client', start);
    }

    function delEvent(id){
        console.log(id);
        init()
            .then(() => {
                return gapi.client.request({
                    'path': `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events/${id}`,
                    'method': 'DELETE',
                })
            }).then((res) => {
                console.log(res);
        });
        setEvents([...events.filter(event => event.id !== id)]);
    }

    function day_1(){
        setDays(1);
    }

    function day_7(){
        setDays(7);
    }

    function day_30(){
        setDays(30);
    }

    return (
        <div>
            <Header />
            <button onClick={day_1}>1 day</button>
            <button onClick={day_7}>7 days</button>
            <button onClick={day_30}>30 days</button>
            {events.map(event => (
                <Event key={event.id}
                       event={event}
                       delEvent={delEvent}></Event>
            ))}
            <AddEvent />
        </div>
    );
}
