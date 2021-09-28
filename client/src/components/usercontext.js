
import { createContext, useState } from "react";

export const UserContext = createContext();
export const UpdateUserContext = createContext()


export function UserProvider({children}) {
    const [user,setUser] = useState({user:null,isAuthenticated:false})

    

    return (
        <UserContext.Provider value={[user,setUser]}>
            
                {children}
            
        </UserContext.Provider>
    )
};

