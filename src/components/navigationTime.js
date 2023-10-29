import React from 'react';
import { Link } from 'react-router-dom';

function Nav() {
    return(
        <nav>
            <ul>
                {/* placeholder nav  links i think. home and profile should work */}
                <li><Link to="/home">Home</Link></li>
                <li><Link to="/History">User History</Link></li>
                <li><Link to="/sign">Sign In / Sign Out</Link></li>
            </ul>
            {/* placeholder line thing cuz i need it haha */}
            <hr></hr>
        </nav>
    );
};

export default Nav;