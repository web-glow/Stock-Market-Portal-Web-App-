import { useEffect, useState } from "react";

//Use your Alphavantage API key here
const API_KEY_ALPHA = "*****";
/**
 * A helper function to get the stock price history,
 * a loading status and to catch errors while fetching.
 * @param {String} code The stock symbol for which the price history is being requested.
 * @returns stockHistory - An array of object which contains the stock price history.
 * @returns loading - A loading status.
 * @returns errorHistory - Any errors that occured while fetching stock price history.
 */
export function useHistory(code) {
    const [loading, setLoading] = useState(true);
    const [stockHistory, setStockHistory] = useState([]);
    const [errorHistory, setErrorHistory] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                let history = await getHistory(code);
                setStockHistory(await history);
                setTimeout(() => {
                    setLoading(false);
                }, 1000);
            } catch (error) {
                console.log(error);
                setErrorHistory(error);
            }
        })();
    }, []);

    return { stockHistory, loading, errorHistory };
}
/**
 * A function to call the AlphaVantage API and get the price History data.
 * Also converts the incoming data to a desired array format.
 * @param {String} code The stock symbol for which the price history is being requested.
 * @returns An array of objects which contains the price history.
 */
async function getHistory(code) {
    const endpoint = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${code}&apikey=${API_KEY_ALPHA}`;
    let response = await fetch(endpoint);
    let data = await response.json();

    //error if code is invalid.
    if (data["Error Message"]) {
        throw new Error(
            "The data doesn't exist. Please go back to select another stock!"
        );
    }
    //There is no error if API runs out of calls.
    //The API sends an object with a note instead.
    if (data["Note"]) {
        throw new Error(
            "Too many API calls. Please Go back and try again in a few minutes!"
        );
    }

    /** Disintegrating the incoming data so that date and the price info is together in single objects.
        Example:
        incoming data["Time Series (Daily)"][0] = {2022-04-23: {open: '224.00', close: '245.24', ...}}
        convert into history[0] = {date: '2022-04-23', open: '224.00', close: '245.24', ...}
    */
    let allDates = Object.keys(data["Time Series (Daily)"]);
    let correspondingData = Object.values(data["Time Series (Daily)"]);

    let opens = [];
    let highs = [];
    let lows = [];
    let closes = [];
    let volumes = [];

    correspondingData.forEach((element) => {
        opens.push(element["1. open"]);
        highs.push(element["2. high"]);
        lows.push(element["3. low"]);
        closes.push(element["4. close"]);
        volumes.push(element["5. volume"]);
    });

    let history = [];
    for (let i = 0; i < allDates.length; i++) {
        history.push({
            date: allDates[i],
            open: opens[i],
            high: highs[i],
            low: lows[i],
            close: closes[i],
            //adding commas to volume
            volume: Number(volumes[i]).toLocaleString("en"),
        });
    }
    return history;
}

/**
 * A helper function to get the latest stock quote or show error.
 * @param {String} code The stock symbol for which the quote is being requested.
 * @returns currentQuote - The price quote of the stock.
 * @returns errorQuote - Errors while using the API.
 */
export function useQuote(code) {
    const [currentQuote, setCurrentQuote] = useState([]);
    const [errorQuote, setErrorQuote] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                let res = await getQuote(code);
                if (res["Note"]) {
                    throw new Error(
                        "Too many API calls. Please Go back and try again in a few minutes!"
                    );
                } else if (!res["Global Quote"]) {
                    //Error handling for Alphavantage is not the best. The error message is not great
                    throw new Error(
                        "Unknown Error Occured. Please go back and try again later!"
                    );
                } else setCurrentQuote(res["Global Quote"]);
            } catch (error) {
                setErrorQuote(error);
            }
        })();
    }, []);

    return { currentQuote, errorQuote };
}

/**
 * The function uses the Alphavantage API to get price quote of a stock.
 * @param {String} code The stock symbol to be used in the API call.
 * @returns JSON Object with the quote price.
 */
async function getQuote(code) {
    const endpoint = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${code}&apikey=${API_KEY_ALPHA}`;
    let response = await fetch(endpoint);
    let data = await response.json();
    return data;
}

/**
 * A helper function to get the description of the selected stock.
 * @param {String} code The stock symbol for which the description is being requested.
 * @returns Description - Description of the selected stock.
 * @returns descError - Errors while using the API.
 */
export function useDesc(code) {
    const [description, setDescription] = useState("");
    const [descError, setDescError] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                let res = await getDesc(code);

                setDescription(res["Description"]);
            } catch (error) {
                setDescError(error);
            }
        })();
    }, []);

    return { description, descError };
}

/**
 * The function uses the Alphavantage API to get the overview of a company stock.
 * @param {String} code The stock symbol to be used in the API call.
 * @returns A JSON object that contains the company overview.
 */
async function getDesc(code) {
    const endpoint = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${code}&apikey=${API_KEY_ALPHA}`;
    let response = await fetch(endpoint);
    let data = await response.json();
    return data;
}

/**
 * Filters an array of stock history from the current date till the picked date (from the past).
 * @param {String} date The date picked to be filtered till (yyyy-MM-dd).
 * @param {Array} stockArray the stock data that needs to be filtered.
 * @returns An array of filtred stock history.
 */
export function dateFilter(date, stockArray) {
    let result = [];
    stockArray.forEach((element) => {
        if (new Date(element.date) >= new Date(date)) {
            result.push(element);
        }
    });
    return result;
}
