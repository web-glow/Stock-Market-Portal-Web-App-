import React from "react";

function StockDesc({ desc }) {
    return (
        <div className="desc-container">
            <div
                style={{
                    color: "white",
                    display: "flex",
                    justifyContent: "left",
                    marginInline: "15%",
                    marginTop: "0",
                    borderBottom: "1px solid #3d4749",
                }}
            >
                <p
                    style={{
                        marginTop: "0",
                    }}
                >
                    {desc}
                </p>
            </div>
        </div>
    );
}
export default StockDesc;
