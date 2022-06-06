import React, { useEffect } from "react";
import "../stylesheets/homepageList.css";
import image from "../assets/bluewhitestripes.png";

const List = () => {
    return (<>
        <section className="list-container">
            <img src={image} alt="lostandfound" className="list-image"/>
            <div className="label-box">
                <h3> Harry Potter <span> (20bec09) </span></h3>
                <p>Lost  item description in 10 words after that clip...</p>
            </div>
        </section>
    </>);
}

export default List;