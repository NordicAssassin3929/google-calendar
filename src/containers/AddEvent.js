import React from 'react';
import useForm from 'react-hook-form';
import { gapi } from 'gapi-script';
import { API_KEY, CLIENT_ID, DISCOVERY_DOCS, SCOPES, CALENDAR_ID } from '../config.js';

function AddEvent(props) {
    const { register, handleSubmit, error } = useForm();

    function createEvent(data){
            var event = {
                    'summary': data.summary,
                    'location': data.description,
                    'description': 'A chance to hear more about Google\'s developer products.',
                    'start': {
                            'dateTime': '2015-05-28T09:00:00-07:00',
                            'timeZone': 'America/Los_Angeles'
                    },
                    'end': {
                            'dateTime': '2015-05-28T17:00:00-07:00',
                            'timeZone': 'America/Los_Angeles'
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
                        validate: (value) => value.length > 5 || 'Too shirt'
                })}
            />
            <p>Location:</p>
            <input
                type="text"
                name="location"
            />
            <p>Description:</p>
            <input
                type="text"
                name="description"
            />
            <p>Start date time:</p>
            <input
                type="date"
                name="startDateTime"
            />
            <p>End date time:</p>
            <input
                type="date"
                name="endDateTime"
            />
            <p>Timezone:</p>
            <input
                type="text"
                name="timezone"
            />
        </form>
    );
}

export default AddEvent;
