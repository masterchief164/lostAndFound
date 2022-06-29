import React, { useEffect } from 'react';
import '../stylesheets/lostPage.css';
import { Grid } from '@mui/material';
import Card from '../components/Card';
import { fetchFound } from '../Api/Data';
import { UserContext } from '../utils/UserContext';

const FoundPage = () => {
  const [foundItems, setFoundItems] = React.useState([]);
  const [, , , setPageNumber] = React.useContext(UserContext);

  useEffect(() => {
    setPageNumber(2);
  }, []);

  useEffect(() => {
    fetchFound(setFoundItems)
      .then(() => console.log('got Data'));
  }, []);
  useEffect(() => {
    console.log(foundItems);
  }, [foundItems]);
  return (
    <section className="lostContainer">
      <div className="lostpage-banner">
        <h1>Found Items</h1>
      </div>
      <div className={'lostItems'}>
        <Grid container={true} spacing={5}>
          {
            foundItems.map((item, index) => (
              <Grid item={true} xs={12} md={6} lg={4} xl={3} key={index}>
                <Card item={item} type={1}/>
              </Grid>
            ))
          };

        </Grid>
      </div>
    </section>
  );
};

export default FoundPage;
