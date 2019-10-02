import { gapi } from 'gapi-script';
import { API_KEY, CLIENT_ID, DISCOVERY_DOCS, SCOPES, CALENDAR_ID } from "../config.js";

export function getEvents(days, setEvents){
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

            const sortedEvents = events.filter(event =>
                event.start.dateTime >= today
                && event.end.dateTime <= nextWeek.toISOString()
            );
            setEvents(sortedEvents);
        }, function(reason) {
            console.log(reason);
        });
    }
    gapi.load('client', start);
}