import React from 'react';
import useForm from 'react-hook-form';
import { gapi } from 'gapi-script';
import { CALENDAR_ID } from '../config.js';
import { makeStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";

function AddEvent() {
    const { register, handleSubmit } = useForm();

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

    const classes = useStyles();

    return (
        <form onSubmit={handleSubmit(createEvent)}>
            <p>Summary:</p>
            <input
                type="text"
                ref={register({
                    required: 'Location is required!',
                    validate: (value) => value.length > 0 || 'Too short'
                })}
                name="summary"
            />
            <p>Location:</p>
            <input
                type="text"
                ref={register({
                    required: 'Location is required!',
                    validate: (value) => value.length > 0 || 'Too short'
                })}
                name="location"
            />
            <p>Description:</p>
            <input
                type="text"
                ref={register({
                        required: 'Description is required!',
                        validate: (value) => value.length > 0 || 'Too short'
                })}
                name="description"
            />
            <p>Start date time:</p>
            <input
                type="datetime-local"
                ref={register({
                        required: 'Start date time is required!',
                        validate: (value) => value.length > 0 || 'Too short'
                })}
                name="start"
            />
            <p>End date time:</p>
            <input
                type="datetime-local"
                ref={register({
                        required: 'End date time is required!',
                        validate: (value) => value.length > 0 || 'Too short'
                })}
                name="end"
            />
            <p>Timezone:</p>
            <input
                type="text"
                ref={register({
                        required: 'Timezone is required!',
                        validate: (value) => value.length > 0 || 'Too short'
                })}
                name="timezone"
            />
            <br></br>
            <br></br>
            <Button
                type="submit"
                variant="outlined"
                className={classes.button}>
                Add Event
            </Button>
        </form>
    );
}

const useStyles = makeStyles(theme => ({
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
}));

export default AddEvent;
