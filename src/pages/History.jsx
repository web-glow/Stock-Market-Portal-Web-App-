import React, { useEffect, useState } from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import { dateFilter, useDesc, useHistory, useQuote } from "../apis/AlphaAPI";
import QuoteBox from "../components/QuoteBox";
import StockDesc from "../components/StockDesc";
import TopBar from "../components/TopBar";
import { AgGridReact } from "ag-grid-react";
import DatePicker from "react-datepicker";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

import "../styles/History.css";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham-dark.css";
import "react-datepicker/dist/react-datepicker.css";
import Loading from "../components/Loading";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

//settings for the chart
export const options = {
    responsive: true,
    plugins: {
        title: {
            display: true,
            text: "Price History",
        },
    },
    scales: {
        x: {
            grid: {
                color: "rgba(187, 202, 255,0.1)",
                borderColor: "#bbcaff",
            },
        },
        y: {
            grid: {
                color: "rgba(187, 202, 255,0.1)",
                borderColor: "#bbcaff",
            },
        },
    },
};

function History() {
    //using location to get the name of the stock.
    const location = useLocation();
    const [searchParams] = useSearchParams();
    //Gets the code 'xxxx' from the url '...history?code=xxxx'
    const stockCode = searchParams.get("code") || "";
    const [startDate, setStartDate] = useState(new Date());

    const [rowData, setRowData] = useState([]);

    /** ------ Chart Prerequisites ------- */
    //Getting arrays of closing prices and dates for the chart
    const closingValues = [];
    const dates = [];
    rowData.forEach((element) => {
        closingValues.push(element.close);
        dates.push(element.date);
    });

    /**reversing the array so that the x axis displays the oldest date
     * on the far left side and the current date, price on the far right*/
    const labels = dates.reverse();
    const data = {
        labels,
        datasets: [
            {
                label: "Closing Price",
                data: closingValues.reverse(),
                borderColor: "#f8f8f8",
                backgroundColor: "#312e65",
            },
        ],
    };

    /** ------ STOCK HISTORY ------ */
    const { stockHistory, loading, errorHistory } = useHistory(stockCode);
    useEffect(() => {
        setRowData([...stockHistory]);
    }, [stockHistory]);

    //Table column headings
    const [columnDefs] = useState([
        { field: "date", headerName: "Date" },
        { field: "open", headerName: "Open ($)" },
        { field: "high", headerName: "High ($)" },
        { field: "low", headerName: "Low ($)" },
        { field: "close", headerName: "Close ($)" },
        { field: "volume", headerName: "Volume" },
    ]);

    /**
     * Filter for displaying data from picked Date to current date.
     * @param {Date} e Picked date from the date picker to be searched till
     */
    const onFilterTextChange = (e) => {
        setStartDate(e); //date displayed on the datepicker

        //getting the yyyy-MM-dd format from the full date.
        let searchDate = `${e.getFullYear()}-${
            e.getMonth() + 1
        }-${e.getDate()}`;
        const currentDate = `${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}`;
        const pickedDate = `${new Date(e).getDate()}/${new Date(
            e
        ).getMonth()}/${new Date(e).getFullYear()}`;

        //if the date picked is the current date then display all data
        if (currentDate == pickedDate) {
            handleClearFilter();
        } else {
            //filter the constant data and set the row accordingly
            setRowData(dateFilter(searchDate, stockHistory));
        }
    };

    /**
     * Handles clear filter button.
     * If clicked, the clears the date filter and displays the full history.
     */
    const handleClearFilter = () => {
        setRowData(stockHistory);
        setStartDate(new Date());
    };

    /** ------ STOCK DESCRIPTION ------ */
    const { description, descError } = useDesc(stockCode);

    /** ------ STOCK QUOTE ------ */
    //Gets current price quote of the stock
    const { currentQuote, errorQuote } = useQuote(stockCode);

    //if duplicate error, then display only 1
    if (errorQuote?.message == errorHistory?.message && errorQuote) {
        return (
            <div className="main-container">
                <TopBar />
                <div className="search-box-container">
                    <div className="loading-box">
                        <p className="labels">{errorQuote?.message}</p>
                    </div>
                </div>
            </div>
        );
    }

    //Can throw different errors, hence display both the errors
    if (errorQuote || errorHistory || descError) {
        return (
            <div className="main-container">
                <TopBar />
                <div className="search-box-container">
                    <div className="loading-box">
                        <p className="labels">{errorQuote?.message}</p>
                        <p className="labels">{errorHistory?.message}</p>
                        <p className="labels">{descError?.message}</p>
                    </div>
                </div>
            </div>
        );
    }

    //displaying only upto 2 decimal points for the headers
    const change = parseFloat(currentQuote["09. change"]).toFixed(2);
    const changePercent = parseFloat(
        currentQuote["10. change percent"]
    ).toFixed(2);

    if (loading) {
        return <Loading />;
    }
    return (
        <div>
            <TopBar />

            <div className="upper-container">
                <div className="heading">
                    <div className="top-header">
                        <h6 className="stock-symbol">{stockCode}</h6>
                        <h6
                            className="changes"
                            style={{
                                color: change > 0 ? "#32bb1d" : "#bb1d1d",
                            }}
                        >
                            {changePercent}% ({change})
                        </h6>
                    </div>
                    <h1 className="stock-name">
                        {location.state?.name
                            ? location.state.name
                            : "This symbol not part of Nasdaq 100 list"}
                    </h1>
                </div>

                {/* Component for the description of the Stock */}
                <StockDesc desc={description} />
                <div className="lower-container">
                    <div
                        className="ag-theme-balham-dark"
                        style={{ height: 300, width: 1220 }}
                    >
                        <div className="history-header">
                            Price History
                            <div className="date-box">
                                <DatePicker
                                    wrapperClassName="my-date-picker"
                                    dateFormat="yyyy/MM/dd"
                                    selected={startDate}
                                    onChange={onFilterTextChange}
                                    maxDate={new Date()}
                                />
                            </div>
                            <button
                                onClick={handleClearFilter}
                                style={{
                                    marginLeft: "1em",
                                    maxHeight: "50px",
                                    display: "inline-block",
                                    marginTop: "1em",
                                }}
                            >
                                Clear Filter
                            </button>
                        </div>

                        {/* Table for Price History */}
                        <AgGridReact
                            rowData={rowData}
                            columnDefs={columnDefs}
                        ></AgGridReact>
                    </div>
                </div>
            </div>

            <div className="chart-quote-container">
                {/* Chart for Price History */}
                <div className="myChart">
                    <Line options={options} data={data} />
                </div>

                {/* Component for price quote for the stock */}
                <QuoteBox currentQuote={currentQuote} />
            </div>
        </div>
    );
}

export default History;
