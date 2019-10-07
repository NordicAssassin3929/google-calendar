import { gapi } from 'gapi-script';
import { API_KEY, CLIENT_ID, DISCOVERY_DOCS, SCOPES, CALENDAR_ID } from "../config.js";

let events = [];

// export function getAllEvents(){
//     function start() {
//         gapi.client.init({
//             'apiKey': API_KEY
//         }).then(() => {
//             return gapi.client.request({
//                 'path': `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events`,
//             })
//         }).then((response) => {
//             events = response.result.items;
//         }, (reason) => {
//             console.log(reason);
//         });
//         return events;
//     }
//     gapi.load('client', start);
//     return events;
// }

/**
 *  On load, called to load the auth2 library and API client library.
 */
export function handleClientLoad() {
    gapi.load('client:auth2', initClient);
}
/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */
function initClient() {
    gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES
    });
}

/**
 *  Sign in the user upon button click.
 */
function handleAuthClick(event) {
    gapi.auth2.getAuthInstance().signIn();
}

/**
 *  Sign out the user upon button click.
 */
function handleSignoutClick(event) {
    gapi.auth2.getAuthInstance().signOut();
}





