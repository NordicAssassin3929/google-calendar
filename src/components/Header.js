import React from 'react';
import {Link} from "react-router-dom";

export function Header() {
    return (
        <div>
            <Link to="/">Login</Link>
            <Link to="/home">Home</Link>
        </div>
    );
}
