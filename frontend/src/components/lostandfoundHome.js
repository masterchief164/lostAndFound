import React from "react";
import "../stylesheets/lostandfoundHome.css";
import stripes from "../bluewhitestripes.png"
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
            <h3>Lost Items Count : </h3>
            <h3>Found Items Count : </h3>
        </div>
        </section>
    </>);
}

export default Home;