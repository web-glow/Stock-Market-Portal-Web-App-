import React, { useState } from "react";
import TopBar from "../components/TopBar";
import { useStockList } from "../apis/FMPApi";
import { StockTable } from "../components/StockTable";
import "../styles/Stocks.css";
import Loading from "../components/Loading";

function Stocks() {
    const { stockData, loading, error } = useStockList();

    if (error) {
        return (
            <div className="main-container">
                <TopBar />
                {/* uses the same css classes that are used for the loading display */}
                <div className="search-box-container">
                    <div className="loading-box">
                        <p className="labels">{error?.message}</p>
                    </div>
                </div>
            </div>
        );
    }

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="main-container">
            <TopBar />
            <div className="search-box-container">
                <StockTable stockData={stockData} />
            </div>
        </div>
    );
}

export default Stocks;
