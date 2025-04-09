import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = (props) => {
    const [user ,setUser] = useState(null);
    const [showLogIn ,setShowLogIn] = useState(false);

    const [token, setToken] = useState(localStorage.getItem('token'))

    const [credit , setCredit] = useState(false)

    // const backendURL = import.meta.env.VITE_BACKEND_URL
    const backendURL = "http://localhost:4000"

    const loadCreditData = async () =>{
        try {
            const {data} = await axios.get(backendURL + '/api/user/credits' , {headers:{token}})

            if(data.sucess){
                setCredit(data.credits)
                setUser(data.user)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
            
        }
    }

    // const navigate = useNavigate()

    const generatedImages = async (prompt) => {
        try {
            
            const {data} = await axios.post(backendURL + '/api/image/generate-image' , {prompt} , {headers:{token}})
             if(data.sucess){
                loadCreditData()
                return data.resultImage
             }else{
                toast.error(error.message)
                loadCreditData()
                if(data.creditBalance === 0){
                    // navigate('/buy')
                }  
             }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    const logout = () => {
        localStorage.removeItem('token');
        setToken('')
        setUser(null)
    }
    useEffect(()=>{

        if(token){
            loadCreditData()
        }
    },[token])

    const value = {
        user , setUser ,showLogIn , setShowLogIn , backendURL , token,setToken,credit,setCredit,loadCreditData
        ,logout , generatedImages
    }

    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider; 