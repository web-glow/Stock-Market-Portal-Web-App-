import React from "react";
import TopBar from "./TopBar";

function Loading() {
    return (
        <div className="main-container">
            <TopBar />
            <div className="search-box-container">
                <div className="loading-box">
                    <p className="labels">Loading...</p>
                </div>
            </div>
        </div>
    );
}

export default Loading;
