import checkForSession from './checkForSession';
import { fetchFound, fetchLost } from '../Api/Data';

const initializeApp = async (setUser, setLostItems, setFoundItems) => {
  const Promises = [checkForSession(setUser), fetchFound(setFoundItems), fetchLost(setLostItems)];
  await Promise.all(Promises);
};

export default initializeApp;
