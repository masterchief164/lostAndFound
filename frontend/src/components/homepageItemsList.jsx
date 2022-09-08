import React from 'react';
import '../stylesheets/Homepage.css';

const HomepageListItems = (props) => {
  let date = new Date(props.date).toDateString()
    .substring(4);
  date = date === 'lid Date' ? '22 Jan,2022' : date;
  const items = {
    image: (props.image==null || props.image === 'default')?'https://res.cloudinary.com/masterchief/image/upload/v1660475392/lostAndFound/banner_2_ku9kqn.webp':props.image,
    title: props.type===1? `Lost ${props.title}`:`Found  ${props.title}`,
  };

  return (
    <section className="listItem" >
        <img src={items.image} alt="img"></img>
        <div className="listTexts">
            <h3>{items.title}</h3>
            <div>
                <p>{date}</p>
            </div>
        </div>
    </section>
  );
};

export default HomepageListItems;
