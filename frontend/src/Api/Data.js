import axios from 'axios';

const fetchFound = async (setFoundItems, searchText, searchTags) => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/found?searchText=${searchText}&username=${searchTags.username}&description=${searchTags.description}&title=${searchTags.title}&location=${searchTags.location}`, { withCredentials: true });

    if (res.status === 200) {
      setFoundItems(res.data.data);
    }
  } catch (err) {
    console.log(err);
    return [];
  }
};

const fetchTopFound = async (setTopTenFound,setFoundCount) => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/found?searchText=&username=false&description=false&title=false&location=false&count=10`, { withCredentials: true });
    if (res.status === 200) {
      setTopTenFound(res.data.data);
      setFoundCount(res.data.count);
    }
  } catch (err) {
    console.log(err);
    return [];
  }
};

const fetchTopLost = async (setTopTenLost,setLostCount) => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/lost?searchText=&username=false&description=false&title=false&location=false&count=10`, { withCredentials: true });
    if (res.status === 200) {
      setTopTenLost(res.data.data);
      setLostCount(res.data.count);
    }
  } catch (err) {
    console.log(err);
    return [];
  }
};


const fetchLost = async (setLostItems, searchText, searchTags) => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/lost/?searchText=${searchText}&username=${searchTags.username}&description=${searchTags.description}&title=${searchTags.title}&location=${searchTags.location}`, { withCredentials: true });
    if (res.status === 200) {
      setLostItems(res.data.data);
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

const deleteItem = async (item) => {
  console.log(item);
  if(item.type === 'Lost'){
    return axios.delete(`${import.meta.env.VITE_BACKEND_URL}/lost/delete/${item.id}`, { withCredentials: true });
  }
  return axios.delete(`${import.meta.env.VITE_BACKEND_URL}/found/delete/${item.id}`, { withCredentials: true });
}

export {
  fetchFound, fetchLost, sendAuthorizationCode, logout, claim, fetchTopFound, fetchTopLost, deleteItem
};
