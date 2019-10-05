import React from 'react';

function Event(props) {
    return (
        <div>
            <div>
            <br />
            {props.event.summary} <br />
            {props.event.start.dateTime} <br />
            {props.event.end.dateTime}
            </div>
            <button onClick={props.delEvent.bind(this, props.event.id)}
                    style={btnStyle}>x</button>
        </div>
    );
}

const btnStyle = {
    background: '#ff0000',
    color: '#fff',
    border: 'none',
    padding: '5px 8px',
    borderRadius: '50%',
    cursor: 'pointer',
};

export default Event;
