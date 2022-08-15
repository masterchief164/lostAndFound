/* eslint-disable no-constant-condition */
import React, { useEffect } from 'react';
import '../stylesheets/lostPage.css';
import { Alert, CircularProgress, Grid, TextField } from '@mui/material';
import Card from '../components/Card';
import { fetchLost } from '../Api/Data';
import { UserContext } from '../utils/UserContext';
import Popup from '../components/popup';

const LostPage = () => {
  const [lostItems, setLostItems] = React.useState([]);
  const [, , , setPageNumber] = React.useContext(UserContext);
  const [isAlert, setIsAlert] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [searchText, setSearchText] = React.useState('');
  const [searchTags, setSearchTags] = React.useState({ username: false, description: false, title: false, location: false });
  const [searchBtn, setSearchbtn] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [popupTrigger, setPopupTrigger] = React.useState(false);
  const [popupData, setPopupData] = React.useState({});

  const getLostItems = async () => {
    await fetchLost(setLostItems, searchText, searchTags);
    setIsLoading(false);
  };

  const searchBtnHandler = async (e) => {
    e.preventDefault();
    setSearchbtn(!searchBtn);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };


  useEffect(() => {
    setPageNumber(1);
    document.addEventListener('keydown', (e) => {
      if(e.key === 'Escape') {
        setPopupTrigger(false);
      }
    }, false);
  }, []);

  useEffect(() => {
    getLostItems();
  }, [searchBtn]);


  return (<>
    {isAlert ? <Alert severity={isSuccess ? 'success' : 'error'} onClose={() => {
      setIsAlert(false);
    }}>{message}</Alert> : ''}
    <section className="lostContainer">
      <div className='lost-page-section'>
        <div className='filterBox'>
          <div className='search-box'>
            <TextField
              hiddenLabel
              id="filled-hidden-label-small"
              placeholder='Search'
              variant="outlined"
              size="small"
              value={searchText}
              onChange={(e) => { setSearchText(e.target.value); }}
            />
            <button onClick={(e) => { searchBtnHandler(e); }}>Search</button>
          </div>
          <fieldset>
            <legend>---- Search Filters ----</legend>
            <div>
              <input type="checkbox" id="username" name="username" value={searchTags.username} onChange={() => { setSearchTags({ ...searchTags, username: !searchTags.username }); }} />
              <label htmlFor="username">UserName</label>
            </div>
            <div>
              <input type="checkbox" id="description" name="description" value={searchTags.description} onChange={() => { setSearchTags({ ...searchTags, description: !searchTags.description }); }} />
              <label htmlFor="description">Description</label>
            </div>
            <div>
              <input type="checkbox" id="title" name="title" value={searchTags.title} onChange={() => { setSearchTags({ ...searchTags, title: !searchTags.title }); }} />
              <label htmlFor="title">Title</label>
            </div>
            <div>
              <input type="checkbox" id="lost" name="lost" />
              <label htmlFor="lost">Lost</label>
            </div>
            <div>
              <input type="checkbox" id="date" name="date" value={searchTags.location} onChange={() => { setSearchTags({ ...searchTags, location: !searchTags.location }); }} />
              <label htmlFor="date">Location</label>
            </div>
          </fieldset>
        </div>
        <div className='filter-box-spacing'>

        </div>
        <div className={'lostItems'}>
          <div className="lostpage-banner">
            <h1>Lost Items</h1>
          </div>
          {isLoading ? <div className='progressBox'><CircularProgress /></div> : (<Grid container={true} spacing={5}>
            {lostItems.length === 0 || lostItems == null ?
              <div className='progressBox'>
                <h3>No lost items found , Report a new item.</h3>
              </div> :
              (lostItems.map((item, index) => (
                <Grid item={true} xs={12} md={6} lg={4} xl={4} key={index}>
                  <Card item={item}
                    setPopupTrigger={setPopupTrigger}
                    setPopupData={setPopupData} />
                  <Popup trigger={popupTrigger}
                    setPopupTrigger={setPopupTrigger}
                    data={popupData}
                    alert={setIsAlert}
                    success={setIsSuccess}
                    message={setMessage}  >
                  </Popup>
                </Grid>
              ))
              )
            }
          </Grid>)}

        </div>
      </div>
    </section>
  </>
  );
};

export default LostPage;
