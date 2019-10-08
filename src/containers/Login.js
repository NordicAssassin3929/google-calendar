import React, {useEffect, useState} from 'react';
import { useEffectOnce, useUpdateEffect } from 'react-use';
import { Header } from '../components/Header';
import { gapi } from 'gapi-script';
import { CALENDAR_ID } from '../config.js';
import Event from "./Event";
import AddEvent from "./AddEvent";
import { init } from "../services/api";

export function Login() {

    const [events, setEvents] = useState([]);
    const [days, setDays] = useState(7);
    let allEvents = [];
    let now = new Date();
    let today = (new Date()).toISOString();
    let nextWeek = new Date();
    nextWeek.setDate(now.getDate() + days);
    const next = nextWeek.toISOString();

    useEffect(() => {
        getEvents();
    }, [days]);

    function getEvents(){
        function start() {
            init()
                .then(() => {
                return gapi.client.request({
                    'path': `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?timeMax=${next}&timeMin=${today}`,
                })
            }).then((res) => {
                // let now = new Date();
                // let today = (new Date()).toISOString();
                // let nextWeek = new Date();
                // nextWeek.setDate(now.getDate() + days);
                setEvents(res.result.items);
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
