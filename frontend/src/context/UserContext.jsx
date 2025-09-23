import { useState } from "react"
import { createContext } from "react"

export const UserDataContext = createContext()

const userContext = ({ children }) => {
const [user, setuser] = useState({
    email:'',
    fulName:{
        firstName:'',
        lastName:''
    }
})
    return (
        <div>
            <UserDataContext.Provider value={{ user }}>
                {children}
            </UserDataContext.Provider>
        </div>
    )
}

export default userContext
