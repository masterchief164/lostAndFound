import React, { useEffect } from 'react';
import '../stylesheets/lostPage.css';
import { Grid } from '@mui/material';
import Card from '../components/Card';
import { fetchLost } from '../Api/Data';
import { UserContext } from '../utils/UserContext';

const LostPage = () => {
  const [lostItems, setLostItems] = React.useState([]);
  const [, , , setPageNumber] = React.useContext(UserContext);

  useEffect(() => {
    setPageNumber(1);
  }, []);

  useEffect(() => {
    fetchLost(setLostItems)
      .then(() => console.log('got Data'));
  }, []);
  useEffect(() => {
    console.log(lostItems);
  }, [lostItems]);
  return (
    <section className="lostContainer">
      <div className="lostpage-banner">
        <h1>Lost Items</h1>
      </div>
      <div className={'lostItems'}>
        <Grid container={true} spacing={5}>
          {
            lostItems.map((item, index) => (
              <Grid item={true} xs={12} md={6} lg={4} xl={3} key={index}>
                <Card item={item} type={0} />
              </Grid>
            ))
          }
        </Grid>
      </div>
    </section>
  );
};

export default LostPage;
