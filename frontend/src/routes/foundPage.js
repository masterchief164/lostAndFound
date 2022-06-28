import React from 'react';
import '../stylesheets/lostPage.css';
import IMG from '../assets/banner.png';
import { FoundItemsContext } from '../utils/FoundItemsContext';
import Card from '../components/Card';

const FoundPage = () => {
	const [foundItems, setFoundItems] = React.useContext(FoundItemsContext);
	return (
		<section className='lostContainer'>
			<div className='filter-box'>
			</div>
			<div className='lost-items'>
				<div className='lostpage-banner'>
					<h1>Found Items</h1>
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


export default FoundPage;
