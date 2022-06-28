import React from 'react';
import '../stylesheets/lostPage.css';
import IMG from '../assets/banner.png';
import Card from '../components/Card';
import { LostItemsContext } from '../utils/LostItemsContext';

const LostPage = () => {
	const [lostItems, setLostItems] = React.useContext(LostItemsContext);
	return (
		<section className='lostContainer'>
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
	);
};


export default LostPage;
