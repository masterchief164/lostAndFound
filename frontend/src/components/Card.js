import React from 'react';
import '../stylesheets/Card.css';
import IMG from '../assets/Id.jpg';


const Card = ({
  item,
  setPopupTrigger,
}) => {
  const image = item.image === undefined || item.image === 'default' || item.image === '' ? IMG : item.image;
  let date = new Date(item.dateTime).toDateString()
    .substring(4);
  date = date === 'lid Date' ? '22 Jan,2022' : date;
  const title = item.title === undefined ? 'default' : item.title;
  const description = item.description === undefined ? 'default' : item.description;
  // const location = item.location === undefined ? 'default' : item.location;
  const button = (item.type) === 'Lost' ? 'Found' : 'Claim';

  const clickHandler = async () => {
    setPopupTrigger(true);
  };
 
  return (
    <>
    <div className="card-box">
      <div className="popup-header">
        <div className="Image-box">
          <img src={image} alt="img"></img>
        </div> 
        <div className="Title-box">
          <div className="Main-title">
            <p>{title}</p>
          </div>
          <div className="Description">
             {item.claimedBy  ? <p className="tags" style={{ color:'green' }}>Status : {button === 'Found' ? button : button+'ED'} </p> :
              <p className="tags" style={{ color:'red' }}>Status : Not yet {button === 'Found' ? button : button+'ED'} </p> }
             <h3>Description</h3>
            <p>{description}</p>
          </div>  
        </div>
      </div>
      <div className="popup-footer">
        <p>Reported on<br /><strong>{date}</strong></p>
        <button onClick={clickHandler}>{button} it</button>
      </div>
    </div>
    </>
  );
};

export default Card;
