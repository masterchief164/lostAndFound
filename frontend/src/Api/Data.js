import axios from 'axios';

const fetchFound = async (setFoundItems,searchText,searchTags) => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/found?searchText=${searchText}&username=${searchTags.username}&description=${searchTags.description}&title=${searchTags.title}&location=${searchTags.location}`, { withCredentials: true });
    if (res.status === 200) {
      setFoundItems(res.data);
    }
  } catch (err) {
    console.log(err);
    return [];
  }
};

const fetchLost = async (setLostItems,searchText,searchTags) => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/lost/?searchText=${searchText}&username=${searchTags.username}&description=${searchTags.description}&title=${searchTags.title}&location=${searchTags.location}`, { withCredentials: true });
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
    const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/googleLogin`, { tokenId: code }, { withCredentials: true });
    setUser(res.data.userData);
    localStorage.setItem('userDataLost', JSON.stringify(res.data.userData));
    console.log('hereData');
    localStorage.removeItem('state');
    return res.data.userData;
  } catch (err) {
    console.log(err);
  }
};

const logout = async (setUser) => {
  await axios.get(`${import.meta.env.VITE_BACKEND_URL}/auth/logout`, { withCredentials: true })
    .then((response) => {
      if (response.status === 200) {
        console.log('logged out');
        localStorage.removeItem('userDataLost');
        setUser(null);
      }
    });
};

const claim = async (item) => {
  if (item.type === 'Lost') {
    return axios.get(`${import.meta.env.VITE_BACKEND_URL}/lost/foundIt/${item.id}`, { withCredentials: true });
  }
  return axios.get(`${import.meta.env.VITE_BACKEND_URL}/found/claimIt/${item.id}`, { withCredentials: true });
};

export {
  fetchFound, fetchLost, sendAuthorizationCode, logout, claim,
};
