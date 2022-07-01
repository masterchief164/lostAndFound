import axios from 'axios';

const fetchFound = async (setFoundItems) => {
  try {
    const res = await axios.get('http://localhost:8000/found', { withCredentials: true });
    if (res.status === 200) {
      setFoundItems(res.data);
    }
  } catch (err) {
    console.log(err);
    return [];
  }
};

const fetchLost = async (setLostItems) => {
  try {
    const res = await axios.get('http://localhost:8000/lost', { withCredentials: true });
    if (res.status === 200) {
      setLostItems(res.data);
    }
  } catch (err) {
    console.log(err);
    return [];
  }
};

const sendAuthorizationCode = async (code, setUser) => {
  try {
    const res = await axios.post('http://localhost:8000/auth/googleLogin', { tokenId: code }, { withCredentials: true });
    setUser(res.data.userData);
    localStorage.setItem('userDataLost', JSON.stringify(res.data.userData));
    localStorage.removeItem('state');
  } catch (err) {
    console.log(err);
  }
};

const logout = async (setUser) => {
  await axios.get('http://localhost:8000/auth/logout', { withCredentials: true })
    .then((response) => {
      if (response.status === 200) {
        console.log('logged out');
        localStorage.removeItem('userDataLost');
        setUser(null);
      }
    });
};

const claim = async (type, id) => {
  if (type === 0) {
    // console.log('found');
    return axios.get(`http://localhost:8000/lost/foundIt/${id}`, { withCredentials: true });
  }
  // console.log('claimed');
  return axios.get(`http://localhost:8000/found/claimIt/${id}`, { withCredentials: true });
};

export {
  fetchFound, fetchLost, sendAuthorizationCode, logout, claim,
};
