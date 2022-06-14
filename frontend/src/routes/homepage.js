import React from "react";
import "../stylesheets/Homepage.css";
import HomepageListItems from "../components/homepageItemsList";
import banner from "../assets/banner.png";

function Homepage() {
    return (
        <>
            <section className="BannerBox">
                <div className="banner">
                    <h1>Lost <span> & </span> Found</h1>
                    <h3>We help everyone to get their lost things !</h3>
                    <img src={banner} alt="banner"/>
                </div>
                <div className="itemTags">
                    <div  className="tag">
                        <h3>LOST ITEMS : 30</h3>
                    </div>
                    <div  className="tag">
                         <h3>FOUND ITEMS : 30</h3>
                    </div>
                </div>
            </section>

            <section className="ListBox">
                <div className="listContainer">
                    <HomepageListItems />
                    <HomepageListItems />
                    <HomepageListItems />
                    <HomepageListItems />
                    <HomepageListItems />
                    <HomepageListItems />
                </div>
                <div className="listContainer">
                    <HomepageListItems />
                    <HomepageListItems />
                    <HomepageListItems />
                    <HomepageListItems />
                    <HomepageListItems />
                    <HomepageListItems />
                </div>
            </section>
        </>
    );
}

export default Homepage;
