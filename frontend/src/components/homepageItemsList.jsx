import React from 'react';
import '../stylesheets/Homepage.css';

const HomepageListItems = () => {
  // const [btnPopup, setBtnPopup] = useState(false);
  return (
    <section className="listItem" >
        <img src={'https://res.cloudinary.com/masterchief/image/upload/v1660475392/lostAndFound/banner_2_ku9kqn.webp'} alt="img"></img>
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
