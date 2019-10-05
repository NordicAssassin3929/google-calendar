import { gapi } from 'gapi-script';
import { API_KEY, CLIENT_ID, DISCOVERY_DOCS, SCOPES, CALENDAR_ID } from "../config.js";

let events = [];

export function getAllEvents(){
    function start() {
        gapi.client.init({
            'apiKey': API_KEY
        }).then(() => {
            return gapi.client.request({
                'path': `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events`,
            })
        }).then((response) => {
            events = response.result.items;
        }, function(reason) {
            console.log(reason);
        });
        return events;
    }
    gapi.load('client', start);
    return events;
}


