import React, { useEffect } from 'react';
import Axios from 'axios';
import '../stylesheets/reportPage.css';
import { Alert, CircularProgress } from '@mui/material';

const ReportPage = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isAlert, setIsAlert] = React.useState(false);
  const [postData, setPostData] = React.useState({
    firstName: '',
    lastName: '',
    roll: '',
    phone: '',
    title: '',
    description: '',
    location: '',
    type: 'lost',
  });
  const [selectedFile, setSelectedFile] = React.useState(null);

  useEffect(() => {
  }, [isLoading, isAlert]);

  const clickHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('upload_preset', 'vaogtmy6');
    let res;
    let image = '';
    setIsLoading(true);
    if (selectedFile) {
      try {
        res = await Axios.post(process.env.REACT_APP_CLOUD_BUCKET, formData);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
        return;
      }

      if (res && res.status === 200) {
        console.log('success', res.data.secure_url);
        image = res.data.secure_url;
      } else {
        return;
      }
    }

    try {
      const data = postData;
      data.image = image;
      await Axios.post(`${process.env.REACT_APP_BACKEND_URL}/report/form`, data);
      setIsLoading(false);
      setIsAlert(true);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      // TODO show the alert that save has failed
    }
    setPostData({
      firstName: '',
      lastName: '',
      roll: '',
      phone: '',
      title: '',
      description: '',
      location: '',
      type: '',
    });
    setSelectedFile('');
  };

  return (
      <>
          {isAlert ? <Alert severity="success" onClose={() => {
          }}>Your Report was successfully Submitted!</Alert> : ''}
          <section className="reportForm">
              {isLoading ? <CircularProgress /> : (
                <div className="container">
                    <form action="#">
                        <div className="form first">
                            <div className="details personal">
                                <span className="title">Personal Details</span>

                                <div className="fields">
                                    <div className="input-field">
                                        <label>First Name</label>
                                        <input type="text" placeholder="Enter your first name"
                                               name="firstName" value={postData.firstName}
                                               onChange={(e) => setPostData({
                                                 ...postData,
                                                 firstName: e.target.value,
                                               })} required />
                                    </div>

                                    <div className="input-field">
                                        <label>Last Name</label>
                                        <input type="text" placeholder="Enter your last name"
                                               name="lastname" value={postData.lastName}
                                               onChange={(e) => setPostData({
                                                 ...postData,
                                                 lastName: e.target.value,
                                               })} required />
                                    </div>

                                    <div className="input-field">
                                        <label>Institute Roll Number</label>
                                        <input type="text" placeholder="Enter roll number"
                                               name="roll" value={postData.roll}
                                               onChange={(e) => setPostData({
                                                 ...postData,
                                                 roll: e.target.value,
                                               })} required />
                                    </div>

                                    <div className="input-field">
                                        <label>Mobile Number</label>
                                        <input type="text" placeholder="Enter mobile number"
                                               name="phone" value={postData.phone}
                                               onChange={(e) => setPostData({
                                                 ...postData,
                                                 phone: e.target.value,
                                               })} required />
                                    </div>

                                </div>
                            </div>

                            <div className="details ID">
                                <span className="title">Report Details</span>

                                <div className="fields">
                                    <div className="input-field">
                                        <label>Report Type</label>
                                        <select name="type" value={postData.type}
                                                onChange={(e) => setPostData({
                                                  ...postData,
                                                  type: e.target.value,
                                                })} required>
                                            <option value="lost">Lost</option>
                                            <option value="found">Found</option>
                                        </select>
                                    </div>

                                    <div className="input-field">
                                        <label>Title</label>
                                        <input type="text"
                                               placeholder="eg: I lost my laptop charger  in cc"
                                               name="title" value={postData.title}
                                               onChange={(e) => setPostData({
                                                 ...postData,
                                                 title: e.target.value,
                                               })} required />
                                    </div>
                                    <div className="input-field">
                                        <label>Location</label>
                                        <input type="text"
                                               placeholder="Enter last location you remember"
                                               name="location" value={postData.location}
                                               onChange={(e) => setPostData({
                                                 ...postData,
                                                 location: e.target.value,
                                               })} required />
                                    </div>

                                    <div className="input-field"
                                         style={{ width: 'calc(2*100% / 3 + 15px)' }}>
                                        <label>Item Description</label>
                                        <textarea inputMode="text" required rows={5}
                                                  name="description" value={postData.description}
                                                  onChange={(e) => setPostData({
                                                    ...postData,
                                                    description: e.target.value,
                                                  })} />
                                    </div>
                                    <br />

                                </div>
                                <div className="btnBox">
                                    <div className="image-field">
                                        <label>Upload Image</label>
                                        <input type="file" className="image-field" name="image"
                                               onChange={(e) => setSelectedFile(e.target.files[0])}
                                               required />
                                    </div>
                                    <button className="nextBtn" onClick={(e) => clickHandler(e)}>
                                        <span className="btnText">Next</span>
                                        <i className="uil uil-navigator"/>
                                    </button>
                                </div>
                            </div>
                        </div>

                    </form>
                </div>
              )}
          </section>
      </>
  );
};

export default ReportPage;
