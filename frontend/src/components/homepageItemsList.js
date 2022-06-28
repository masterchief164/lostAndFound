import React, { useState } from 'react';
import '../stylesheets/Homepage.css';
import IMG from '../assets/banner.png';

const HomepageListItems = () => {
  const [btnPopup, setBtnPopup] = useState(false);
  return (
    <section className="listItem" >
        <img src={IMG} alt="img"></img>
        <div className="listTexts">
            <h3>Lost a Laptop Charger </h3>
            <div>
                <p>26 March 2022</p>
            </div>
        </div>
    </section>
  );
};

export default HomepageListItems;
