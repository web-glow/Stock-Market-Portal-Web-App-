import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
    return (
        <div>
            <h1
                style={{
                    color: "white",
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "2em",
                }}
            >
                404 Error
            </h1>
            <h1
                style={{
                    color: "white",
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                Page Not Found
            </h1>
            <Link to="/">
                <h1
                    style={{
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    Go Back
                </h1>
            </Link>
        </div>
    );
};

export default PageNotFound;
