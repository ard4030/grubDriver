"use client"
const { createContext, useState } = require("react");

export const ViewContext = createContext();
export const ViewWrapper = ({children}) => {
    const [open, setOpen] = useState(false)

    return(
        <ViewContext.Provider value={{open, setOpen}}>
            {children}
        </ViewContext.Provider>
    )
}