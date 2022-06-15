import React from 'react'
import "../stylesheets/lostPage.css"
import IMG from '../assets/banner.png'

const LostPage = () => {
  return (
    <section className='container'>
        <div className='filter-box'>
        </div>
        <div className='lost-items'>
            <div className='lostpage-banner'>
                <h1>Lost Items</h1>
            </div>
            <div className='lostitems-box'>
               <Card/>
               <Card/>
               <Card/>
               <Card/>
               <Card/>
               <Card/>
               <Card/>
               <Card/>
               <Card/>
               <Card/>
            </div>
        </div>
    </section>
  )
}

 const Card = () => {
  return (
    <div className='card-box'>
        <div className="title">
            <img src={IMG} alt="img"></img>
           <p>Lost a laptop charger in the library ejkkce cejkb </p>
       </div>
      <div className="description">
           <h3>Description</h3>
           <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.  </p>
      </div>
      <div className="popup-footer">
          <p>Reported on: 22-04-2022</p>
          <button> FOUND IT </button>
      </div>
    </div>
  )
}



export default LostPage;