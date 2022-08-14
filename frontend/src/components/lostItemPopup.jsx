import React from 'react';
import '../stylesheets/popups.css';

function LostPopup(props) {
  return (props.trigger) ? (
    <div className="popup">
      <div className="container">
        <div className="close-btn">
          <button onClick={() => props.setTrigger(false)}> X</button>
        </div>
        <div className="title">
          <img src={'https://res.cloudinary.com/masterchief/image/upload/v1660475392/lostAndFound/banner_2_ku9kqn.webp'} alt="img"></img>
          <h3>Lost a laptop charger</h3>
        </div>
        <div className="description">
          <h3>Description</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Ut ut venenatis urna. Cras venenatis orci lorem,
            eget mollis urna sagittis feugiat. Nulla commodo eget sem in congue.
            Curabitur blandit ipsum quis ipsum fermentum condimentum.
            Integer id nulla quis turpis consectetur fringilla at non nisi.
            Vivamus id porttitor magna. Morbi interdum varius nibh,
            sit amet ultricies nisl ultrices eu. Curabitur sagittis nisi nunc,
            eu tempus dolor egestas ut. Nam tempus fermentum ligula a fermentum.
            Vivamus pulvinar gravida nibh et malesuada.
            Sed mollis in libero faucibus consequat. In diam justo,
            feugiat nec leo vel, vehicula eleifend ligula.</p>
        </div>
        <div className="popup-footer">
          <p>&#8226; Harry Potter </p>
          <p>&#8226; 20BEC998</p>
          <button> FOUND IT</button>
        </div>
        {props.children}
      </div>
    </div>
  ) : '';
}

export default LostPopup;
