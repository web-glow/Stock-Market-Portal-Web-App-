import React from "react";
import { Link } from "react-router-dom";
import stonkMan from "../assets/stonk-man.png";
import "../styles/TopBar.css";

function TopBar() {
    return (
        <div className="nav-container">
            <div className="nav-header">
                <div className="logo-container">
                    <img
                        className="website-logo"
                        src={stonkMan}
                        alt="stonk-man"
                    />
                </div>
                <h1>S</h1>
                <h1>T</h1>
                <h1>O</h1>
                <h1>N</h1>
                <h1>K</h1>
                <h1>I</h1>
                <h1>E</h1>
                <h1>S</h1>
            </div>
            <div className="inner-container">
                <Link to="/" className="links">
                    <li className="nav-item">Home</li>
                </Link>
                <li className="nav-divider">|</li>
                <Link to="/stocks" className="links">
                    <li className="nav-item">Stocks</li>
                </Link>
            </div>
        </div>
    );
}

export default TopBar;
