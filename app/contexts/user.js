"use client";
import { createContext, useContext, useEffect, useState } from 'react';
import { fetchProfile } from '../helpers/backend';
import { useRouter } from 'next/navigation';
import { message } from 'antd';
import swalAlert from '../components/common/alert';

const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {
    const [user, setLoggedInUser] = useState({});
    const [userLoading, setUserLoading] = useState(true); 
    let router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            fetchProfile().then(({success, data}) => {
                if (success) {
                    setLoggedInUser(data);
                } else {
                    localStorage.removeItem('token');
                    setLoggedInUser({});
                }
                setUserLoading(false); 
            });
        } else {
            setUserLoading(false);
        }
    }, []);

    const logOut = () => {
        localStorage.removeItem('token');
        setLoggedInUser(null);
        swalAlert.success('You have successfully logged out!!');
        router.push('/login');
    };

    return (
        <UserContext.Provider value={{ user, logOut, setLoggedInUser, userLoading}}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => useContext(UserContext);
export default UserContext;
