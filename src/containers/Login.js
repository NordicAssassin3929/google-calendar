import React, {useEffect, useState} from 'react';
import { useEffectOnce, useUpdateEffect } from 'react-use';
import {Header} from '../components/Header';
import { gapi } from 'gapi-script';
import { API_KEY, CLIENT_ID, DISCOVERY_DOCS, SCOPES, CALENDAR_ID } from '../config.js';
import Event from "./Event";
import {getAllEvents} from "../services/api";

export function Login() {

    const [events, setEvents] = useState([]);
    const [days, setDays] = useState(7);
    let allEvents = [];

    useEffect(() => {
        //allEvents = getEvents();
        getEvents();
    },  [days]);

    // useEffect(() => {
    //     sortEvents();
    // },[days]);

    useUpdateEffect(() => {
        //  sortEvents();
    });

    // async function getEvents(){
    //     await getAllEvents();
    // }

    function getEvents(){
        function start() {
            init()
                .then(() => {
                return gapi.client.request({
                    'path': `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events`,
                })
            }).then((res) => {
                allEvents = res.result.items;
                let now = new Date();
                let today = (new Date()).toISOString();
                let nextWeek = new Date();
                nextWeek.setDate(now.getDate() + days);

                let sortedEvents = allEvents.sort((a, b) =>
                { return new Date(a.start.dateTime) - new Date(b.start.dateTime) });

                sortedEvents = allEvents.filter(event =>
                    event.start.dateTime >= today
                    && event.start.dateTime <= nextWeek.toISOString()
                );
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

    function sortEvents(){
        let now = new Date();
        let today = (new Date()).toISOString();
        let nextWeek = new Date();
        nextWeek.setDate(now.getDate() + days);

        let sortedEvents = allEvents.sort((a, b) =>
        { return new Date(a.start.dateTime) - new Date(b.start.dateTime) });

        sortedEvents = allEvents.filter(event =>
            event.start.dateTime >= today
            && event.start.dateTime <= nextWeek.toISOString()
        );
        setEvents(sortedEvents);
        console.log(events);
    }

    function init(){
        return gapi.client.init({
            'apiKey': API_KEY,
            'clientId': CLIENT_ID,
            'scope': SCOPES
        });
    }

    function day_1(){
        setDays(1);
        sortEvents();
    }

    function day_7(){
        setDays(7);
        sortEvents();
    }

    function day_30(){
        setDays(30);
        sortEvents();
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
        </div>
    );
}
