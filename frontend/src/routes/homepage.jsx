import React, { useEffect, useState } from 'react';
import '../stylesheets/Homepage.css';
import HomepageListItems from '../components/homepageItemsList';
import { UserContext } from '../utils/UserContext';
import { fetchTopFound, fetchTopLost } from '../Api/Data';

function Homepage() {
  const [, , , setPageNumber] = React.useContext(UserContext);
  const [topTenFound,setTopTenFound] = useState([]);
  const [topTenLost, setTopTenLost] = useState([]);
  const [lostCount, setLostCount] = useState(0);
  const [foundCount, setFoundCount] = useState(0);

  const getFoundItems = async () => {
    await fetchTopFound(setTopTenFound,setFoundCount);
  };

  const getLostItems = async() =>{
    await fetchTopLost(setTopTenLost,setLostCount);
  }
  useEffect(() => {
    setPageNumber(0);
    getLostItems()
    getFoundItems()
  }, []);



  return (
    <>
      <section className="BannerBox">
        <div className="banner">
          <h1>Lost <span> & </span> Found</h1>
          <h3>We help everyone to get their lost things !</h3>
          <img src={'https://res.cloudinary.com/masterchief/image/upload/v1660475392/lostAndFound/banner_2_ku9kqn.webp'} alt="banner" />
        </div>
        <div className="itemTags">
          <div className="tag">
            <h3>LOST ITEMS : {lostCount}</h3>
          </div>
          <div className="tag">
            <h3>FOUND ITEMS : {foundCount}</h3>
          </div>
        </div>
      </section>

      <section className="ListBox">
        <div className="listContainer">
          {topTenLost.map((item,index) => <HomepageListItems image={item.image} date={item.dateTime} title={item.title} type={1} key={index}/>)}
        </div>
        <div className="listContainer">
          {topTenFound.map((item,index) => <HomepageListItems image={item.image} date={item.dateTime} title={item.title} type={0} key={index}/>)}
        </div>
      </section>
    </>
  );
}

export default Homepage;
