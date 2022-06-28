import React from 'react';
import '../stylesheets/lostPage.css';
import IMG from '../assets/Id.jpg';

const Card = () => (
	<div className='card-box'>
		<div className="popup-header">
			<div className="Image-box">
				<img src={IMG} alt="img"></img>
			</div>
			<div className="Title-box">
				<div className="Main-title">
					<p>Lost a laptop charger</p>
				</div>
				<div className="Description">
					<h3>Description</h3>
					<p className="tags">Laptop,Charger</p>
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit vcjkbck ram shyam Create a function in "Classy" that takes a string as</p>
				</div>
			</div>
		</div>
		<div className="popup-footer">
			<p>Reported on<br/><strong> 22 Jan,2022</strong></p>
			<button> FOUND IT </button>
		</div>
	</div>
);

export default Card;