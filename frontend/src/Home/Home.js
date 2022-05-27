import React from "react";
import "./Home.css";

const Home = () => {
    let lostItemsCount = 5;
    let foundItemsCount = 10;
    return (<>
        <section className={"sectionTop"}>
            <div className={"home"}>
                <p>Lost <span>&</span> Found</p>
            </div>
            <div className={"boxes"}>
                <span>Total Lost Items {lostItemsCount}</span>
                <span>Total Found Items {foundItemsCount}</span>
            </div>
        </section>

        <section className={"section"}>
            <div className={"boxesTable"}>
                <div className={"row"}>
                    <p>Lost Items</p>
                    <div className={"table"}>
                        <p>Lost</p>
                    </div>
                </div>
                <div className={"row"}>
                    <p>Found Items</p>
                    <div className={"table"}>
                        <p>Found</p>
                    </div>
                </div>
            </div>
        </section>
    </>);
}

export default Home;