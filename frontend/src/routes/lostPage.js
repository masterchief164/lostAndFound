import React, { useEffect } from 'react';
import '../stylesheets/lostPage.css';
import { Alert, Grid } from '@mui/material';
import Card from '../components/Card';
import { fetchLost } from '../Api/Data';
import { UserContext } from '../utils/UserContext';

const LostPage = () => {
  const [lostItems, setLostItems] = React.useState([]);
  const [, , , setPageNumber] = React.useContext(UserContext);
  const [isAlert, setIsAlert] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [message, setMessage] = React.useState('');

  useEffect(() => {
    setPageNumber(1);
  }, []);

  useEffect(() => {
    fetchLost(setLostItems)
      .then(() => console.log(lostItems));
  }, []);

  return (<>
      {isAlert ? <Alert severity={isSuccess ? 'success' : 'error'} onClose={() => {
        setIsAlert(false);
      }}>{message}</Alert> : ''}
      <section className="lostContainer">
        <div className="lostpage-banner">
          <h1>Lost Items</h1>
        </div>
        <div className={'lostItems'}>
          <Grid container={true} spacing={5}>
            {
              lostItems.map((item, index) => (
                <Grid item={true} xs={12} md={6} lg={4} xl={3} key={index}>
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
      </section>
    </>
  );
};

export default LostPage;
