import React from 'react';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import DeleteIcon from '@material-ui/icons/Delete';

function Event(props) {
    return (
        <div>
            <ListItemAvatar>
                <Avatar>
                    <DeleteIcon onClick={props.delEvent.bind(this, props.event.id)} />
                </Avatar>
            </ListItemAvatar>
            Summary - {props.event.summary} <br />
            Description - {props.event.description} <br />
            Start - {props.event.start.dateTime} <br />
            End - {props.event.end.dateTime}
        </div>
    );
}

export default Event;
