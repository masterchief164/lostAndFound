import checkForSession from './checkForSession';
import { fetchFound, fetchLost } from '../Api/Data';

const initializeApp = async (setUser, setLostItems, setFoundItems) => {
  checkForSession(setUser);
  const Promises = [fetchFound(setFoundItems), fetchLost(setLostItems)];
  const [found, lost] = await Promise.all(Promises);
  console.log(lost);
  setFoundItems(found);
  setLostItems(lost);
  console.log('got Data');
};

export default initializeApp;
