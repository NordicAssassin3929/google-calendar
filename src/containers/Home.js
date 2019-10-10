import React, {useEffect, useState} from 'react';
import {Header} from '../components/Header';
import {gapi} from 'gapi-script';
import {CALENDAR_ID} from '../config.js';
import Event from "./Event";
import AddEvent from "./AddEvent";
import {init} from "../services/api";
import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';

export function Home() {

    const [events, setEvents] = useState([]);
    const [days, setDays] = useState(7);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getEvents();
    }, [days]);

    async function getEvents() {
        let now = new Date();
        let today = (new Date()).toISOString();
        let nextWeek = new Date();
        nextWeek.setDate(now.getDate() + days);
        const next = nextWeek.toISOString();
        const res = await gapi.client.request({
            'path': `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?timeMax=${next}&timeMin=${today}`,
        });
        const allEvents = res.result.items;

        let sortedEvents = allEvents.sort((a, b) => {
            return new Date(a.start.dateTime) - new Date(b.start.dateTime)
        });

        setEvents(sortedEvents);
        setLoading(false);
    }

    function delEvent(id) {
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

    function day_1() {
        setDays(1);
    }

    function day_7() {
        setDays(7);
    }

    function day_30() {
        setDays(30);
    }

    const classes = useStyles();

    return (
        <div>
            <Header/>
            <Button onClick={day_1}
                    color="primary"
                    variant="outlined"
                    className={classes.button}>
                List events by 1 day
            </Button>
            <Button onClick={day_7}
                    variant="outlined"
                    color="primary"
                    className={classes.button}>
                List events by 7 days
            </Button>
            <Button onClick={day_30}
                    variant="outlined"
                    color="primary"
                    className={classes.button}>
                List events by 30 days
            </Button>
            <List className={classes.root}>
                {loading || !events ? (
                        <div>loading...</div>)
                    : (
                        events.map(event => (
                            <ListItem alignItems="flex-start" key={event.id}>
                                <Event key={event.id}
                                       event={event}
                                       delEvent={delEvent}></Event>
                            </ListItem>
                        ))
                    )}
            </List>
            <AddEvent/>
        </div>
    );
}

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
    },
}));
