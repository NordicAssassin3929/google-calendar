import React, {useEffect, useState} from 'react';
import {Header} from "../components/Header";
import { gapi } from 'gapi-script';
import { API_KEY, CLIENT_ID, DISCOVERY_DOCS, SCOPES, CALENDAR_ID } from "../config.js";

export function Login(props) {

    const [events, setEvents] = useState([]);

    useEffect(() => {
        getEvents();
    });

    function getEvents(){
        function start() {
            gapi.client.init({
                'apiKey': API_KEY
            }).then(function() {
                return gapi.client.request({
                    'path': `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events`,
                })
            }).then( (response) => {
                let events = response.result.items;
                setEvents(events);
            }, function(reason) {
                console.log(reason);
            });
        }
        gapi.load('client', start);
    }

    return (
        <div>
            <Header />
            {events.map(event => (
                <ol key={event.id}>
                    <li>
                        {event.summary}
                    </li>
                    <li>
                        {event.start.dateTime}
                    </li>
                    <li>
                        {event.end.dateTime}
                    </li>
                </ol>
            ))}
        </div>
    );
}
