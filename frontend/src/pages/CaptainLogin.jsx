import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { CaptainDataContext } from '../context/CaptainContext'

const Captainlogin = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { captain, setCaptain } = React.useContext(CaptainDataContext)
    const navigate = useNavigate()

    const submitHandler = async (e) => {
        e.preventDefault();
        console.log('Form submitted'); // Debug log 1
        console.log('Email:', email, 'Password:', password); // Debug log 2
        console.log('Base URL:', import.meta.env.VITE_BASE_URL); // Debug log 3

        const captainData = {
            email: email,
            password: password
        }

        try {
            console.log('Sending request to:', `${import.meta.env.VITE_BASE_URL}/captains/login`); // Debug log 4

            const response = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/captains/login`,
                captainData
            )

            console.log('Response received:', response); // Debug log 5

            if (response.status === 200) {
                const data = response.data
                console.log('Response data:', data); // Debug log 6

                setCaptain(data.captain)
                localStorage.setItem('token', data.token)

                console.log('Navigating to /captain-home'); // Debug log 7
                navigate('/captain-home')
            }
        } catch (error) {
            console.error('Full error object:', error); // Debug log 8
            console.error('Error response:', error.response); // Debug log 9
            console.error('Error message:', error.message); // Debug log 10
        }

        setEmail('')
        setPassword('')
    }

    return (
        <div className='p-7 h-screen flex flex-col justify-between'>
            <div>
                <img className='w-20 mb-3' src="https://www.svgrepo.com/show/505031/uber-driver.svg" alt="" />

                <form onSubmit={submitHandler}>
                    <h3 className='text-lg font-medium mb-2'>What's your email</h3>
                    <input
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
                        type="email"
                        placeholder='email@example.com'
                    />

                    <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
                    <input
                        className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        type="password"
                        placeholder='password'
                    />

                    <button
                        type="submit"
                        className='bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
                    >
                        Login
                    </button>
                </form>

                <p className='text-center'>
                    Join a fleet?
                    <Link to='/captain-signup' className='text-blue-600'>Register as a Captain</Link>
                </p>
            </div>

            <div>
                <Link
                    to='/login'
                    className='bg-[#d5622d] flex items-center justify-center text-white font-semibold mb-5 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
                >
                    Sign in as User
                </Link>
            </div>
        </div>
    )
}

export default Captainlogin