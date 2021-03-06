import React from 'react';
import history from "../../history";

export default function Header() {
    return(    
        <nav>
        <div className="nav-wrapper #4dd0e1 cyan lighten-2">
            <a href="" className="brand-logo center" onClick={() => history.push('/')}>Michelindatabase
            <i className="large material-icons">local_dining</i></a>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
            </ul>
        </div>
        </nav>
    )
}