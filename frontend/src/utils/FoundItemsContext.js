import React from "react";

export const FoundItemsContext = React.createContext();

export const FoundItemsContextProvider = ({ children }) => {
    const [FoundItems, setFoundItems] = React.useState(null);
    return (
        <FoundItemsContext.Provider value={[FoundItems, setFoundItems]}>
            {children}
        </FoundItemsContext.Provider>
    );

};
