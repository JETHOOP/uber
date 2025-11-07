import React, { useContext, useEffect, useState } from 'react';
import { CaptainDataContext } from '../context/CaptainContext';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const CaptainProtectWrapper = ({ children }) => {
    const { captain, setCaptain } = useContext(CaptainDataContext);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            setIsLoading(false);
            return;
        }

        const fetchCaptain = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setCaptain(res.data.captain);
            } catch (err) {
                localStorage.removeItem('token');
            } finally {
                setIsLoading(false);
            }
        };

        fetchCaptain();
    }, [setCaptain]);

    if (isLoading) return <div className="h-screen flex items-center justify-center">Loading...</div>;

    if (!captain) return <Navigate to="/captain-login" replace />;

    return <>{children}</>;
};

export default CaptainProtectWrapper;
