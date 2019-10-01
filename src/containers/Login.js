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
                let now = new Date();
                let today = (new Date()).toISOString();
                let nextWeek = new Date();
                nextWeek.setDate(now.getDate() + 10);
                let events = response.result.items;
                // const sortedEvents = events.filter(event => event.summary === "Lemax Test Cases");
                const sortedEvents = events.filter(event =>
                    //event.start.dateTime >= today
                event.end.dateTime <= nextWeek
                );
                setEvents(sortedEvents);
                //setEvents(events);
            }, function(reason) {
                console.log(reason);
            });
        }
        gapi.load('client', start);
    }

    function sortEvents(){
        console.log(events);
        // const sortedEvents = events.filter(event =>
        //     event.start.dateTime = "2017-10-12T17:00:00+02:00"
        // );
        // setEvents(sortedEvents);
    }

    return (
        <div>
            <Header />
            <button onClick={sortEvents}>Click me</button>
            {/*{events.map(event => (*/}
            {/*    <ol key={event.id}>*/}
            {/*        {event.summary}*/}
            {/*        {event.start.dateTime}*/}
            {/*        {event.end.dateTime}*/}
            {/*    </ol>*/}
            {/*))}*/}
        </div>
    );
}
