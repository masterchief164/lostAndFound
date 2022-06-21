import React from "react";

export const LostItemsContext = React.createContext();

export const LostItemsContextProvider = ({ children }) => {
    const [lostItems, setLostItems] = React.useState(null);
    return (
        <LostItemsContext.Provider value={[lostItems, setLostItems]}>
            {children}
        </LostItemsContext.Provider>
    );

};
