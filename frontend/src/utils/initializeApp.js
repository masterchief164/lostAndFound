import checkForSession from './checkForSession';

const initializeApp = async (setUser) => {
  checkForSession(setUser);
};

export default initializeApp;
