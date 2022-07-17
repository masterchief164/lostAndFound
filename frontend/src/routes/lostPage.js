import React, { useEffect } from 'react';
import '../stylesheets/lostPage.css';
import { Alert, Button, Grid, TextField } from '@mui/material';
import Card from '../components/Card';
import { fetchLost } from '../Api/Data';
import { UserContext } from '../utils/UserContext';

const LostPage = () => {
  const [lostItems, setLostItems] = React.useState([]);
  const [, , , setPageNumber] = React.useContext(UserContext);
  const [isAlert, setIsAlert] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [searchText,setSearchText] = React.useState('');

  const getLostItems = async () =>{
    await fetchLost(setLostItems,searchText);
    console.log(lostItems);
  };

  useEffect(() => {
    setPageNumber(1);
  }, []);

  useEffect(() => {
    getLostItems();
    console.log(searchText);
  }, [searchText]);

  return (<>
      {isAlert ? <Alert severity={isSuccess ? 'success' : 'error'} onClose={() => {
        setIsAlert(false);
      }}>{message}</Alert> : ''}
      <section className="lostContainer">
        <div className='lost-page-section'>
            <div className='filterBox'>
            <TextField
            hiddenLabel
            id="filled-hidden-label-small"
            placeholder='Search'
            variant="outlined"
            size="small"
            value={searchText}
            onChange={(e)=>{setSearchText(e.target.value);}}
             />
             <Button variant="contained" size="small">Search</Button>
             <fieldset>
              <legend>---- Search Filters ----</legend>
              <div>
                <input type="checkbox" id="username" name="username" />
                <label for="username">UserName</label>
              </div>
              <div>
                <input type="checkbox" id="description" name="description" />
                <label for="description">Description</label>
              </div>
              <div>
                <input type="checkbox" id="title" name="title" />
                <label for="title">Title</label>
              </div>
              <div>
                <input type="checkbox" id="lost" name="lost" />
                <label for="lost">Lost</label>
              </div>
              <div>
                <input type="checkbox" id="date" name="date" />
                <label for="date">Date</label>
              </div>
            </fieldset>
            </div>
            <div className='filter-box-spacing'>

            </div>
            <div className={'lostItems'}>
              <div className="lostpage-banner">
              <h1>Lost Items</h1>
             </div>
            <Grid container={true} spacing={5}>
              {
                lostItems.map((item, index) => (
                  <Grid item={true} xs={12} md={6} lg={4} xl={4} key={index}>
                    <Card item={item}
                          type={0}
                          alert={setIsAlert}
                          success={setIsSuccess}
                          message={setMessage}/>
                  </Grid>
                ))
              }
            </Grid>
          </div>
        </div>
      </section>
    </>
  );
};

export default LostPage;
