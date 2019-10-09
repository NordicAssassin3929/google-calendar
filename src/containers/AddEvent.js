import React from 'react';
import useForm from 'react-hook-form';
import { gapi } from 'gapi-script';
import { API_KEY, CLIENT_ID, DISCOVERY_DOCS, SCOPES, CALENDAR_ID } from '../config.js';

function AddEvent(props) {
    const { register, handleSubmit, error } = useForm();

    function createEvent(data){
            console.log(data);
            const st = new Date(data.start);
            const en = new Date(data.end);
            var event = {
                    'summary': data.summary,
                    'location': data.location,
                    'description': data.description,
                    'start': {
                            'dateTime': st.toISOString(),
                            'timeZone': data.timeZone
                    },
                    'end': {
                            'dateTime': en.toISOString(),
                            'timeZone': data.timeZone
                    }
            };
            var request = gapi.client.calendar.events.insert({
                    'calendarId': CALENDAR_ID,
                    'resource': event
            });

            request.execute(function(event) {
                    console.log(event.htmlLink);
            });
    }

    return (
        <form onSubmit={handleSubmit(createEvent)}>
            <p>Summary:</p>
            <input
                type="text"
                ref={register({
                        required: 'Summary is required!',
                        validate: (value) => value.length > 5 || 'Too short'
                })}
                name="summary"
            />
            <p>Location:</p>
            <input
                type="text"
                ref={register({
                        required: 'Location is required!',
                        validate: (value) => value.length > 5 || 'Too short'
                })}
                name="location"
            />
            <p>Description:</p>
            <input
                type="text"
                ref={register({
                        required: 'Description is required!',
                        validate: (value) => value.length > 5 || 'Too short'
                })}
                name="description"
            />
            <p>Start date time:</p>
            <input
                type="datetime-local"
                ref={register({
                        required: 'Start date time is required!',
                        validate: (value) => value.length > 5 || 'Too short'
                })}
                name="start"
            />
            <p>End date time:</p>
            <input
                type="datetime-local"
                ref={register({
                        required: 'End date time is required!',
                        validate: (value) => value.length > 5 || 'Too short'
                })}
                name="end"
            />
            <p>Timezone:</p>
            <input
                type="text"
                ref={register({
                        required: 'Timezone is required!',
                        validate: (value) => value.length > 5 || 'Too short'
                })}
                name="timezone"
            />
                <br></br>
            <button
                type="submit">
                    Add Event
            </button>
        </form>
    );
}

export default AddEvent;
