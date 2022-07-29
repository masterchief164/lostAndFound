import React, { useEffect, useState } from 'react';
import '../stylesheets/Dashboard.css';
import { Alert, CircularProgress, TextField } from '@mui/material';
import Axios from 'axios';
import profileIcon from '../assets/profile.png';
import { UserContext } from '../utils/UserContext';
import banner from '../assets/banner.png';

const Dashboard = () => {
  const [user,setUser] = React.useContext(UserContext);
  const [isAlert, setIsAlert] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const defaultFormData = {
    firstName: user ? user.given_name : 'First Name',
    lastName: user ? user.family_name : 'Last Name',
    phoneNumber: user ? user.phoneNumber : '',
    hallNumber: user ? user.hallNumber : '1',
    roomNumber: user? user.roomNumber : 'F-103',
    batch: user ? user.batch : '2020',
  };

  const [errors, setErrors] = useState({
    firstName: false,
    lastName: false,
    phoneNumber: false,
    hallNumber: false,
    roomNumber: false,
    batch: false

  });
  const [postData, setPostData] = useState(defaultFormData);

  useEffect(() => {
    setPostData(defaultFormData);
  }, [user]);

  const handleSubmit = async () => {
    if (user == null) {
      setMessage('Please login to submit a report');
      setIsAlert(true);
      return;
    }
    if (!Object.values(errors)
      .every((value) => value === false) || !Object.values(postData)
      .every((value) => value.length !== 0)) {
      setMessage('Form Incorrectly Filled');
      setIsAlert(true);
      return;
    }
    setIsLoading(true);
    try {
      const response = await Axios.post(`${import.meta.env.VITE_BACKEND_URL}/profile/update`, postData, { withCredentials: true });
      console.log(response.data.userData);
      console.log("here");
      setUser(response.data.userData);
      setIsLoading(false);
      setIsAlert(true);
      setIsSuccess(true);
    } catch (error) {
      console.log(error);
      setMessage(error.message);
      setIsAlert(true);
      setIsSuccess(false);
      setIsLoading(false);
    }
  };

  return (<>
      {isAlert ? <Alert severity={isSuccess ? 'success' : 'error'} onClose={() => {
        setIsAlert(false);
      }}>{isSuccess ? 'Your Report was successfully Submitted!' : `Error: ${message}`}</Alert> : ''}
      <section className={'formSection'}>
        {isLoading ? <CircularProgress /> : <div className={'wrapper'}>
          <div className={'preview'}>
            <img className={'bgimg'} src={banner} alt={'banner image'} />
            <img className={'profile'} referrerPolicy="no-referrer" src={user ? user.picture : profileIcon}
                 alt={'Profile Icon'} />
            <h1>{postData.firstName}</h1>
            <span>{postData.lastName}</span>
            <p>{postData.roomNumber ? `${postData.roomNumber}, ` : ''}{postData.hallNumber ? `Hall: ${postData.hallNumber}` : ''}</p>
          </div>
          <div className={'form'}>
            <h1>Dashboard</h1>
            <h2>Welcome {`${postData.firstName}..`}</h2>
            <div className={'row'}>
              <TextField error={errors.firstName} margin={'dense'} sx={{ width: '20vw' }}
                         id='outlined-basic'
                         value={postData.firstName}
                         onChange={(e) => {
                           if (!e.target.value.match(/^[a-zA-Z]{2,20}$/)) {
                             setErrors({
                               ...errors,
                               firstName: true
                             });
                           } else {
                             setErrors({
                               ...errors,
                               firstName: false
                             });
                           }
                           setPostData({
                             ...postData,
                             firstName: e.target.value
                           });
                         }} required={true} label='First Name' variant='outlined' />
              <TextField error={errors.lastName} margin={'dense'} sx={{ width: '20vw' }}
                         id='outlined-basic'
                         value={postData.lastName}
                         onChange={(e) => {
                           if (!e.target.value.match(/^[a-zA-Z]{2,20}$/)) {
                             setErrors({
                               ...errors,
                               lastName: true
                             });
                           } else {
                             setErrors({
                               ...errors,
                               lastName: false
                             });
                           }
                           setPostData({
                             ...postData,
                             lastName: e.target.value
                           });
                         }} required={true} label='Last Name' variant='outlined' />
            </div>

            <div className={'row'}>
              <TextField error={errors.phoneNumber} margin={'dense'} sx={{ width: '20vw' }}
                         id='outlined-basic'
                         value={postData.phoneNumber}
                         onChange={(e) => {
                           if (!e.target.value.match(/^[0-9]{10}$/)) {
                             setErrors({
                               ...errors,
                               phoneNumber: true
                             });
                           } else {
                             setErrors({
                               ...errors,
                               phoneNumber: false
                             });
                           }
                           setPostData({
                             ...postData,
                             phoneNumber: e.target.value
                           });
                         }} required={true} label='Phone Number' variant='outlined' />
              <TextField error={errors.batch} margin={'dense'}
                         sx={{ width: '20vw' }}
                         id='outlined-basic'
                         value={postData.batch}
                         onChange={(e) => {
                           if (!e.target.value.match(/^[0-9]{4}$/)) {
                             setErrors({
                               ...errors,
                               batch: true
                             });
                           } else {
                             setErrors({
                               ...errors,
                               batch: false
                             });
                           }
                           setPostData({
                             ...postData,
                             batch: e.target.value
                           });
                         }} required={true} label='Batch' variant='outlined' />
            </div>

            <div className={'row'}>
              <TextField error={errors.hallNumber} margin={'dense'} sx={{ width: '20vw' }}
                         id='outlined-basic'
                         value={postData.hallNumber}
                         helperText={'Like 2 😂️'}
                         onChange={(e) => {
                           if (!e.target.value.match(/^[134]$/)) {
                             setErrors({
                               ...errors,
                               hallNumber: true
                             });
                           } else {
                             setErrors({
                               ...errors,
                               hallNumber: false
                             });
                           }
                           setPostData({
                             ...postData,
                             hallNumber: e.target.value
                           });
                         }} required={true} label='Hall Number' variant='outlined' />
              <TextField error={errors.roomNumber} margin={'dense'} sx={{ width: '20vw' }}
                         id='outlined-basic'
                         value={postData.roomNumber}
                         helperText={'Like F-103 '}
                         onChange={(e) => {
                           if (!e.target.value.match(/^[A-G] - [0-9]{3}$/) &&
                             !e.target.value.match(/^[A-G] -[0-9]{3}$/) &&
                             !e.target.value.match(/^[A-G]- [0-9]{3}$/) &&
                             !e.target.value.match(/^[A-G]-[0-9]{3}$/)) {
                             setErrors({
                               ...errors,
                               roomNumber: true
                             });
                           } else {
                             setErrors({
                               ...errors,
                               roomNumber: false
                             });
                           }
                           setPostData({
                             ...postData,
                             roomNumber: e.target.value
                           });
                         }} required={true} label='Room Number' variant='outlined' />
            </div>
            <button className={'submitButton'} onClick={handleSubmit}>Submit</button>
          </div>
        </div>}
      </section>
    </>
  );
};

export default Dashboard;
