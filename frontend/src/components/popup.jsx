import React, {useEffect} from 'react';
import '../stylesheets/popups.css';
import { UserContext } from '../utils/UserContext';
import IMG from '../assets/Id.jpg';
import { claim } from '../Api/Data';

const Popup = (props) => {
     const [user] = React.useContext(UserContext);
     const [claimedBy, setClaimedBy] = React.useState(props.data.claimedBy);
     const button = (props.data.type) === 'Lost' ? 'Found' : 'Claim';

     const clickHandler = async (e) => {
          e.preventDefault();
          if (user === null) {
               alert('Please Login First');
               props.success(false);
               props.message('Please login to claim an item');
               return;
          }

          const resp = await claim(props.data);
          if (resp.status === 200) {
               props.message('Successfully claimed item');
               props.success(true);
                setClaimedBy(user.name);
          } else {
               props.message('Error claiming item');
               alert(true);
               props.success(false);
          }
     };

     useEffect(()=>{
          setClaimedBy(props.data.claimedBy);
     },[props.data.claimedBy]);


     return (props.trigger) ? (
          <div className="popup">
               <div className="popup-inner">
                    <div className="close-btn">
                         <button onClick={() => props.setPopupTrigger(false)} accessKey='esc'> X </button>
                    </div>
                    <div className="title">
                         <h3>{props.data.title}<span>{claimedBy ? <p style={{ color: 'green' }}>Status : {button === 'Found' ? button : button + 'ed'} </p> :
                              <p style={{ color: 'red' }}>Status : Not yet {button === 'Found' ? button : button + 'ed'} </p>}</span></h3>

                         <img src={props.data.image === undefined || props.data.image === 'default' || props.data.image === '' ? IMG : props.data.image} alt="img"></img>
                    </div>
                    <div className="description">
                         <h3>Reported by : <span>{props.data.firstName + ' ' + props.data.lastName + `(${props.data.submittedBy})`}</span></h3>
                    </div>
                    <div className="description">
                         <h3>Last seen location : <span>{props.data.location} </span></h3>
                    </div>
                    <div className="description">
                         <h3>Reported date & time : <span>{props.data.dateTime.split('T')[0] + ' | ' + props.data.dateTime.split('T')[1]}</span></h3>
                    </div>
                    <div className="description">
                         <h3>Description : </h3>
                         <p>{props.data.description} </p>
                    </div>
                    <div className="description">
                         <h3>{button === 'Found' ? button : button + 'ed'} by : <span>{claimedBy ? claimedBy : 'Not yet reported'}</span></h3>
                         {claimedBy ? '' : <p className='descp'>Note : Click on {button.toLocaleLowerCase()} button if you found the item / it is your item.</p>}
                    </div>
                    <div className="description desc-btn">
                         {claimedBy || (user && props.data.submittedBy == user.email) ? <button onClick={(e) => { e.preventDefault(); }} className="btn-inv">{button}</button> : <button onClick={(e) => { clickHandler(e); }} className='btn-vis'>{button}</button>}
                    </div>
                    <div className="description">
                         {claimedBy ? <p className='descp1'>This item is already reported!</p> : ''}
                    </div>
                    {props.children}
               </div>
          </div>
     ) : '';
};

export default Popup;
