import React, {useEffect, useState} from 'react';
import {Header} from "../components/Header";
import { gapi } from 'gapi-script';
import { API_KEY, CLIENT_ID, DISCOVERY_DOCS, SCOPES, CALENDAR_ID } from "../config.js";

export function Login(props) {

    const [events, setEvents] = useState([]);
    const [days, setDays] = useState(7);

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
                nextWeek.setDate(now.getDate() + days);
                let events = response.result.items;

                let sortedEvents = events.sort((a, b) =>
                { return new Date(a.start.dateTime) - new Date(b.start.dateTime) });

                sortedEvents = events.filter(event =>
                    event.start.dateTime >= today
                    && event.start.dateTime <= nextWeek.toISOString()
                );
                setEvents(sortedEvents);
            }, function(reason) {
                console.log(reason);
            });
        }
        gapi.load('client', start);
    }

    function sortEvents(){
        console.log(events);
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
            <button onClick={sortEvents}>Click me</button>
            <button onClick={day_1}>1 day</button>
            <button onClick={day_7}>7 days</button>
            <button onClick={day_30}>30 days</button>
            {events.map(event => (
                <ol key={event.id}>
                    {event.summary} <br />
                    {event.start.dateTime} <br />
                    {event.end.dateTime}
                </ol>
            ))}
        </div>
    );
}
