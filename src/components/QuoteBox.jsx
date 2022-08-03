import "../styles/QuoteBox.css";

function QuoteBox({ currentQuote }) {
    const options = {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    };

    //**------Data for price quote------ */
    const open = `$ ${Number(currentQuote["02. open"]).toLocaleString(
        "en",
        options
    )}`;
    const high = `$ ${Number(currentQuote["03. high"]).toLocaleString(
        "en",
        options
    )}`;
    const low = `$ ${Number(currentQuote["04. low"]).toLocaleString(
        "en",
        options
    )}`;
    const price = `$ ${Number(currentQuote["05. price"]).toLocaleString(
        "en",
        options
    )}`;
    const volume = Number(currentQuote["06. volume"]).toLocaleString("en");
    const latestTradingDay = currentQuote["07. latest trading day"];
    const previousClose = `$ ${Number(
        currentQuote["08. previous close"]
    ).toLocaleString("en", options)}`;
    const change = currentQuote["09. change"];
    const changePercent = currentQuote["10. change percent"];

    return (
        <div className="outer-box">
            <div className="quote-container">
                <li
                    className="row"
                    style={{ fontWeight: "600", fontSize: "2.3em" }}
                >
                    Price Quote
                </li>
                <div className="quote-column">
                    <li className="row" style={{ fontWeight: "400" }}>
                        Open
                    </li>
                    <li className="row2">{open}</li>
                </div>
                <div className="quote-column">
                    <li className="row" style={{ fontWeight: "400" }}>
                        High
                    </li>
                    <li className="row2">{high}</li>
                </div>
                <div className="quote-column">
                    <li className="row" style={{ fontWeight: "400" }}>
                        Low
                    </li>
                    <li className="row2">{low}</li>
                </div>
                <div className="quote-column">
                    <li className="row" style={{ fontWeight: "400" }}>
                        Price
                    </li>
                    <li className="row2">{price}</li>
                </div>
                <div className="quote-column">
                    <li className="row" style={{ fontWeight: "400" }}>
                        Volume
                    </li>
                    <li className="row2">{volume}</li>
                </div>
                <div className="quote-column">
                    <li className="row" style={{ fontWeight: "400" }}>
                        Latest Trading Day
                    </li>
                    <li className="row2">{latestTradingDay}</li>
                </div>
                <div className="quote-column">
                    <li className="row" style={{ fontWeight: "400" }}>
                        Previous Close
                    </li>
                    <li className="row2">{previousClose}</li>
                </div>
                <div className="quote-column">
                    <li className="row" style={{ fontWeight: "400" }}>
                        Change
                    </li>
                    <li className="row2">{change}</li>
                </div>
                <div className="quote-column">
                    <li className="row" style={{ fontWeight: "400" }}>
                        Change Percent
                    </li>
                    <li className="row2">{changePercent}</li>
                </div>
            </div>
        </div>
    );
}

export default QuoteBox;
