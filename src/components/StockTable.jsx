import React, { useCallback, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { useNavigate } from "react-router-dom";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham-dark.css";

export function StockTable({ stockData }) {
    let navigate = useNavigate();

    //Stock data fetched from the API.
    const stockList = [...stockData];
    let industryType = "All";

    /** Prerequisites for making a table with ag-grid */
    const gridRef = useRef();
    const [gridApi, setGridApi] = useState(null);
    const [gridColApi, setGridColApi] = useState(null);

    const [rowData, setRowData] = useState();
    const [columnDefs] = useState([
        { field: "symbol", headerName: "Stocks", sortable: true },
        {
            field: "name",
            headerName: "Name",
            sortable: true,
        },
        {
            field: "industry",
            headerName: "Industry",
            sortable: true,
            //removes the quickfilter
            getQuickFilterText: (params) => {
                return "";
            },
        },
    ]);

    /** Table has clickable row, which opens the history of the stock */
    const onClickRow = (e) => {
        //sending data in 2 different ways (learning both ways)
        const link = `/history?code=${e.data.symbol}`;
        navigate(link, { state: { name: e.data.name } });
    };

    const onGridReady = useCallback((params) => {
        //populates the grid
        setRowData(stockList);
        setGridApi(params.api);
        setGridColApi(params.columnApi);
    }, []);

    /** On change function for when the industry type is picked from the dropdown */
    const externalFilterChanged = useCallback((newIndustryType) => {
        industryType = newIndustryType;
        gridRef.current.api.onFilterChanged();
    }, []);

    /** Grid calls this method to know if an external filter is present. */
    const isExternalFilterPresent = useCallback(() => {
        //if industryType has any value other than "All" then start filtering
        return industryType !== "All";
    }, []);

    /** Should return true if external filter passes, otherwise false. */
    const doesExternalFilterPass = useCallback(
        (node) => {
            return industryType === node.data.industry;
        },
        [industryType]
    );

    /** Shows the overlay if no rows are found. */
    const onBtShowNoRows = useCallback(() => {
        gridRef.current.api.showNoRowsOverlay();
    }, []);

    /** Hides the overlay when rows are found. */
    const onBtHide = useCallback(() => {
        gridRef.current.api.hideOverlay();
    }, []);

    /** Ag-Grid's Quick Filter for filtering the Stock code by text. */
    const onFilterTextChange = (e) => {
        gridApi.setQuickFilter(e.target.value);
        if (gridRef.current.api.getDisplayedRowCount() === 0) {
            onBtShowNoRows();
        } else onBtHide();
    };

    //Array of industry options of stocks
    const industryOptions = [
        "All",
        "Communication Services",
        "Consumer Cyclical",
        "Consumer Defensive",
        "Financial Services",
        "Healthcare",
        "Industrials",
        "Technology",
        "Utilities",
    ];

    return (
        <div>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                }}
            >
                <label>
                    <div className="labels">Stock</div>
                    <input
                        type="text"
                        className="customInput"
                        defaultValue={""}
                        onChange={onFilterTextChange}
                        placeholder="Search with a code or name..."
                    />
                </label>
                <label>
                    <div className="labels">Industry</div>
                    <div>
                        <select
                            className="customSelect"
                            onChange={(e) =>
                                externalFilterChanged(e.target.value)
                            }
                        >
                            <option value={industryOptions[0]}>
                                {industryOptions[0]}
                            </option>
                            <option value={industryOptions[1]}>
                                {industryOptions[1]}
                            </option>
                            <option value={industryOptions[2]}>
                                {industryOptions[2]}
                            </option>
                            <option value={industryOptions[3]}>
                                {industryOptions[3]}
                            </option>
                            <option value={industryOptions[4]}>
                                {industryOptions[4]}
                            </option>
                            <option value={industryOptions[5]}>
                                {industryOptions[5]}
                            </option>
                            <option value={industryOptions[6]}>
                                {industryOptions[6]}
                            </option>
                            <option value={industryOptions[7]}>
                                {industryOptions[7]}
                            </option>
                            <option value={industryOptions[8]}>
                                {industryOptions[8]}
                            </option>
                        </select>
                    </div>
                </label>
            </form>
            <div className="table-container">
                <div
                    className="ag-theme-balham-dark"
                    style={{
                        height: 510,
                        width: "70%",
                        fontSize: "1.1em",
                    }}
                >
                    <AgGridReact
                        ref={gridRef}
                        onGridReady={onGridReady}
                        onRowClicked={onClickRow}
                        animateRows={true}
                        isExternalFilterPresent={isExternalFilterPresent}
                        doesExternalFilterPass={doesExternalFilterPass}
                        rowData={rowData}
                        columnDefs={columnDefs}
                        defaultColDef={{ flex: 1 }}
                        overlayNoRowsTemplate={
                            "<div style='padding: 10px; border: 2px solid #444;'>No results found</div>"
                        }
                    ></AgGridReact>
                </div>
            </div>
        </div>
    );
}
