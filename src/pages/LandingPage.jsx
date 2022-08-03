import React from "react";
import TopBar from "../components/TopBar";
import { Parallax } from "react-parallax";
import "../styles/LandingPage.css";
import stockImage from "../assets/stock-chart.jpg";

const introText = `Welcome to STONKIES, a Stock Market Portal. You may
                click on stocks to view all the available companies.
                You may search a stock via name, code, or industry
                type. Just click on the stock you would like to see
                the price quote and the price history for.`;

const stockText = `A stock (also known as equity) is a security that represents
                the ownership of a fraction of a corporation. This entitles
                the owner of the stock to a proportion of the corporation's
                assets and profits equal to how much stock they own. Units
                of stock are called "shares." Corporations issue (sell)
                stock to raise funds to operate their businesses. Stocks are
                bought and sold predominantly on stock exchanges, though
                there can be private sales as well, and are the foundation
                of many individual investors' portfolios. Historically, they
                have outperformed most other investments over the long run.`;

const optionsText = `Options give a buyer the right, but not the obligation, to
                buy (call) or sell (put) the underlying stock at a pre-set
                price called the strike price. Options have a cost
                associated with them, called a premium, and an expiration
                date. Options are financial derivatives, meaning that they
                derive their value from the underlying security or stock.`;

const forexText = `The Nasdaq 100 Index is a basket of the 100 largest, most
                actively traded U.S companies listed on the Nasdaq stock exchange. The index 
                includes companies from various industries except for the financial industry,
                like commercial and investment banks. These non-financial sectors include retail,
                biotechnology, industrial, technology, health care, and others.`;

function LandingPage() {
    return (
        <div className="main-container">
            {/* Top Bar Navigation */}
            <TopBar />
            <Parallax blur={9} bgImage={stockImage} strength={-200}>
                <div className="introduction">
                    <div className="intro-container">
                        <div className="intro-header">
                            <h1>Stock Market Portal</h1>
                        </div>
                        <div className="intro-description">{introText}</div>
                    </div>
                </div>
            </Parallax>
            <div className="home-page-container">
                <div className="home-header">
                    <h1>What is a Stock?</h1>
                </div>
                <div className="home-description">{stockText}</div>
                <div className="home-header">
                    <h1>What is an Option? </h1>
                </div>
                <div className="home-description">{optionsText}</div>
                <div className="home-header">
                    <h1>What is Nasdaq 100?</h1>
                </div>
                <div className="home-description">{forexText}</div>
            </div>
        </div>
    );
}

export default LandingPage;
