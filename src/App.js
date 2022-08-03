import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import "./index.css";
import LandingPage from "./pages/LandingPage";
import Stocks from "./pages/Stocks";
import History from "./pages/History";
import PageNotFound from "./pages/404Page";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="*" element={<PageNotFound />} />
                <Route path="" element={<LandingPage />} />
                <Route path="stocks" element={<Stocks />} />
                <Route path="history" element={<History />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
