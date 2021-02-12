import React from 'react';

import './Nav.scss';

const Nav = () => {
    return (
        <div className="nav-wrapper">
            <nav className="nav">
                <ul>
                    <li>
                        <a href="/">Каталог оборудование</a>
                        <ul>
                            <li>
                                <a href="/">1 уроверь</a>
                                <ul>
                                    <li>
                                        <a href="/">2 уровень</a>
                                        <ul>
                                            <li>
                                                <a href="/">3 уровень</a>
                                                <ul>
                                                    <li><a href="/">4 уровень</a></li>
                                                    <li><a href="/">4 уровень</a></li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                            <li><a href="/">1 уроверь</a></li>
                            <li><a href="/">1 уроверь</a></li>
                            <li><a href="/">1 уроверь</a></li>
                            <li><a href="/">1 уроверь</a></li>
                        </ul>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Nav;
