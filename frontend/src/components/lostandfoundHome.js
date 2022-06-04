import React from "react";
import "../stylesheets/lostandfoundHome.css";
const Home = () => {
    let lostItemsCount = 5;
    let foundItemsCount = 10;
    return (<>
        <section className="section">
            <p>
                Lost Something or Found a new Item?
                <span>
                    LOST & FOUND
                </span>
                &mdash; Report it Here &mdash;
            </p>
            <div className="items-box">
                <div className="items-box-col">
                    <h3>Lost Items Count</h3>
                    <h4>{lostItemsCount}</h4>
                </div>
                <div className="items-box-col">
                    <h3>Found Items Count</h3>
                    <h4>{foundItemsCount}</h4>
                </div>
            </div>
            <a data-scroll href="#full">
                <div className={"arrow"}></div>
            </a>
        </section>

    </>);
}

export default Home;