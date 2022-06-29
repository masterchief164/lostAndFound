import React from 'react';

export const UserContext = React.createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = React.useState(null);
  const [pageNumber, setPageNumber] = React.useState(0);
  return (
    <UserContext.Provider value={[user, setUser, pageNumber, setPageNumber]}>
      {children}
    </UserContext.Provider>
  );
};
