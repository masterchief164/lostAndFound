import React, { useCallback, useEffect, useState } from 'react';
import '../stylesheets/Form.css';
import { Alert, CircularProgress, TextField } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import Axios from 'axios';
import closeButton from '../assets/closeButton.svg';
import { UserContext } from '../utils/UserContext';

const Form = () => {
  const [user, , , setPageNumber] = React.useContext(UserContext);
  const [screen, setScreen] = useState(!(window.matchMedia('(max-width: 768px)').matches));

  useEffect(() => {
    setPageNumber(3);
    let width = window.matchMedia('(max-width: 768px)');
    const handleMediaQueryChange = (x) => {
        if (x.matches) {
          setScreen(false);
        } else {
            setScreen(true);
        }
    }
    width.addListener(handleMediaQueryChange);
  }, []);

  const defaultFormData = {
    firstName: '',
    submittedBy: user ? user.email : '',
    lastName: '',
    title: '',
    description: '',
    location: '',
    itemTag: '',
    image: 'default',
    type: 'Lost',
    dateTime: new Date().toISOString()
      .substring(0, new Date().toISOString()
        .lastIndexOf(':'))
  };

  const [errors, setErrors] = useState({
    firstName: false,
    lastName: false,
    title: false,
    description: false,
    location: false,
    itemTag: false,
    type: false
  });

  const [isLoading, setIsLoading] = useState(false);
  const [postData, setPostData] = useState(defaultFormData);
  const [isAlert, setIsAlert] = useState(false);
  const [imageSelected, setImageSelected] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState('Something went wrong');
  // useEffect(() => {
  //     console.log(postData.firstName);
  // }, [postData]);

  const onDrop = useCallback(async (acceptedFiles) => {
    console.log(acceptedFiles[0]);
    setImageSelected(true);
    const reader = new FileReader();
    reader.readAsDataURL(acceptedFiles[0]);
    reader.onloadend = () => {
      setPostData({
        ...postData,
        image: reader.result
      });
    };
  }, [postData]);

  const {
    getRootProps,
    getInputProps
  } = useDropzone({
    onDrop,
    accepts: 'image/*',
    multiple: false
  });

  const reportTypes = [{
    value: 'Lost',
    label: 'Lost'
  }, {
    value: 'Found',
    label: 'Found'
  }];

  const handleSubmit = async () => {
    if (user == null) {
      setMessage('Please login to submit a report');
      setIsAlert(true);
      return;
    }
    console.log(!Object.values(postData)
      .every((value) => value.length !== 0));
    if (!Object.values(errors)
      .every((value) => value === false) || !Object.values(postData)
      .every((value) => value.length !== 0)) {
      setMessage('Form Incorrectly Filled');
      setIsAlert(true);
      return;
    }
    setIsLoading(true);
    try {
      await Axios.post(`${import.meta.env.VITE_BACKEND_URL}/report/form`, postData, { withCredentials: true });
      // message = resp.data.message;
      // TODO handle error messages in both backend and frontend
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
    setPostData(defaultFormData);
    setImageSelected(false);
  };

  return (<>
    {isAlert ? <Alert severity={isSuccess ? 'success' : 'error'} onClose={() => {
      setIsAlert(false);
    }}>{isSuccess ? 'Your Report was successfully Submitted!' : `Error: ${message}`}</Alert> : ''}
    <section className={'formSection'}>
      {isLoading ? <CircularProgress /> : <div className="formContainer">
        <select value={postData.type} className="selectBox" onChange={(e) => setPostData({
          ...postData,
          type: e.target.value
        })}>
          {reportTypes.map((type) => <option className={'optionBox'} key={type.value}
                                             value={type.value}>{type.label}</option>)}
        </select>

        <div className={'row'}>
          <TextField error={errors.firstName} margin={'normal'} sx={{ width: screen?'20vw':'70vw' }}
                     id="outlined-basic"
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
                     }} required={true} label="First Name" variant="outlined" />
          <TextField error={errors.lastName} margin={'normal'} sx={{ width: screen?'20vw':'70vw' }}
                     id="outlined-basic"
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
                     }} required={true} label="Last Name" variant="outlined" />
        </div>

        <div className={'row'}>
          <TextField error={errors.location} margin={'normal'} sx={{ width: screen?'20vw':'70vw' }}
                     id="outlined-basic"
                     value={postData.location}
                     onChange={(e) => {
                       if (!e.target.value.match(/^[a-zA-Z\s\d,_.-]{2,30}$/)) {
                         setErrors({
                           ...errors,
                           location: true
                         });
                       } else {
                         setErrors({
                           ...errors,
                           location: false
                         });
                       }
                       setPostData({
                         ...postData,
                         location: e.target.value
                       });
                     }} required={true} label="Last Seen Place" variant="outlined" />
          <TextField margin={'normal'} sx={{ width: screen?'20vw':'70vw' }} id="outlined-basic"
                     type={'datetime-local'}
                     value={postData.dateTime}
                     onChange={(e) => setPostData({
                       ...postData,
                       dateTime: e.target.value
                     })} required={true} label="Last Seen Time" variant="outlined" />
        </div>

        <div className={'row'}>
          <TextField error={errors.itemTag} margin={'normal'} sx={{ width: screen?'20vw':'70vw' }}
                     id="outlined-basic"
                     value={postData.itemTag}
                     helperText={'Tag like mobile, bag, laptop'}
                     onChange={(e) => {
                       if (!e.target.value.match(/^[a-zA-Z,\s]{2,15}$/)) {
                         setErrors({
                           ...errors,
                           itemTag: true
                         });
                       } else {
                         setErrors({
                           ...errors,
                           itemTag: false
                         });
                       }
                       setPostData({
                         ...postData,
                         itemTag: e.target.value
                       });
                     }} required={true} label="Item Tag" variant="outlined" />
          <TextField error={errors.title} margin={'normal'} sx={{ width: screen?'20vw':'70vw' }}
                     id="outlined-basic"
                     value={postData.title} helperText={' '}
                     onChange={(e) => {
                       if (!e.target.value.match(/^[a-z\sA-Z]{2,15}$/)) {
                         setErrors({
                           ...errors,
                           title: true
                         });
                       } else {
                         setErrors({
                           ...errors,
                           title: false
                         });
                       }
                       setPostData({
                         ...postData,
                         title: e.target.value
                       });
                     }} required={true} label="Title" variant="outlined" />
        </div>

        <TextField error={errors.description} margin={'normal'} multiline={true} minRows={5}
                   sx={{ width: screen?'50vw':'75vw' }}
                   value={postData.description}
                   onChange={(e) => {
                     if (e.target.value.length < 1) {
                       setErrors({
                         ...errors,
                         description: true
                       });
                     } else {
                       setErrors({
                         ...errors,
                         description: false
                       });
                     }
                     setPostData({
                       ...postData,
                       description: e.target.value
                     });
                   }} required={true}
                   id="outlined-basic" label="Description" variant="outlined" />

        <div className={'dropBox'} {...getRootProps()}>
          <input {...getInputProps()} />
          {imageSelected ? <div className="container" id={'preview'}>
            <img src={postData.image} alt="Preview" className={'previewImg'} />
            <img src={closeButton} alt="Preview" className={'close'}
                 onClick={() => {
                   setImageSelected(false);
                   setPostData({
                     ...postData,
                     image: ''
                   });
                 }} />
          </div> : <p>Drop files here or click to upload</p>}
        </div>

        <button className={'submitButtonForm'} onClick={handleSubmit}>Submit</button>
      </div>}
    </section>
  </>);
};

export default Form;
