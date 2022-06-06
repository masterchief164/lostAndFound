import React, { useEffect } from "react";
import "../stylesheets/lostandfoundHome.css";
import "../stylesheets/homepageList.css";
import List from "./listView";
const HomepageList = () => {

    return (<>
        <section className="container">
            <div className="box">
                <h3>Latest <span> #10 Lost</span> Items List</h3>
                <div className="inner-box">
                <List/>
                <List/>
                <List/>
                <List/>
                <List/>
                <List/>
                <List/>
                </div>
            </div>
            <div className="box">
              <h3>Latest <span>#10 Found</span> Items List</h3>
              <div className="inner-box">
                <List/>
                <List/>
                <List/>
                <List/>
                <List/>
                <List/>
                <List/>
              </div>
            </div>
        </section>
    </>);
}

export default HomepageList;