import { useEffect, useState } from "react";

//Use your FMP API key here
const API_KEY = "*****";

/**
 * A function to call get all the stocks, a loading status,
 * and catch errors while fetching.
 * @returns stockData - Stock data that is being fetched.
 * @returns loading - Loading status.
 */
export function useStockList() {
    const [loading, setLoading] = useState(true);
    const [stockData, setStockData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                setStockData(await getStocks());
                setTimeout(() => {
                    setLoading(false);
                }, 500);
            } catch (error) {
                setError(error);
            }
        })();
    }, []);

    return { stockData, loading, error }; //TODO Throw error and make it look good.
}

/**
 * The function uses the Financial Modeling Prep API to stock data.
 * This function is just to display the symbol, name, and industry.
 * @returns An array of stocks with their symbol, name, and industry.
 */
async function getStocks() {
    const endpoint = `https://financialmodelingprep.com/api/v3/nasdaq_constituent?apikey=${API_KEY}`;
    let response = await fetch(endpoint);
    let data = await response.json();
    let stockList = [];

    data.forEach((element) => {
        stockList.push({
            symbol: element.symbol,
            name: element.name,
            industry: element.sector,
        });
    });

    return stockList;
}
