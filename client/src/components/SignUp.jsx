import axios from 'axios'
import React, { useState } from 'react'
import { IconContext } from 'react-icons'
import { BiCameraMovie } from 'react-icons/bi'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function SignUp() {

    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState({
        username: "",
        email: "",
        password: ""
    });
    const { username, email, password } = inputValue;

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setInputValue({ ...inputValue, [name]: value });
    };
    console.log(inputValue);

    const handleError = (msg) => {
        toast.error(msg);

    }

    const handleSuccess = (msg) => {
        toast.success(msg, {
            position: "bottom-right"
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post("http://localhost:8000/signup", { ...inputValue });
            const { success, message } = data;
            if (success) {
                handleSuccess(message);
                setTimeout(() => {
                    navigate('/');
                }, (1000));
            } else {
                handleError(message);
            }
        } catch (err) {
            console.log(err);
        }
        setInputValue({
            ...inputValue,
            email: "",
            password: "",
            username: "",
        });
    }



    return (
        <section className='h-screen flex justify-center'>
            <div className='flex items-center'>
                <div>
                    <div className='mb-10 w-96 '>
                        <div className='flex justify-center'>
                            <IconContext.Provider value={{ color: 'red', size: 70 }}>
                                <BiCameraMovie></BiCameraMovie>
                            </IconContext.Provider>
                        </div>
                        <h2 className='mt-6 text-center text-2xl font-extrabold text-gray-900 mb-3'>
                            Signup to create an account
                        </h2>
                        <p className='mt-2 text-center text-sm text-gray-600 inline'>Already have an account?</p>
                        <Link to='/' className='mx-2 text-red-500'>Login
                        </Link>
                    </div>
                    <div className="block w-full max-w-xs">
                        <form action="" onSubmit={handleSubmit} className='w-96 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
                            <div className='mb-4'>
                                <label className='text-left block text-gray-700 text-sm font-bold mb-2' htmlFor="username">Username</label>
                                <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' value={username} onChange={handleOnChange} name="username" type="text" placeholder='Enter your username' />
                                <label className='text-left block text-gray-700 my-1 text-sm font-bold mb-2' htmlFor="email">Email</label>
                                <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' value={email} onChange={handleOnChange} name="email" required type="email" placeholder="Enter your email" />
                                <label className='text-left block text-gray-700 my-1 text-sm font-bold mb-2' htmlFor="password">Password</label>
                                <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-light focus:outline-none focus:shadow-outline' value={password} onChange={handleOnChange} name="password" type="password" placeholder='Enter your password' />
                                <label className='text-left block text-gray-700 my-1 text-sm font-bold mb-2' htmlFor="confirmPassword">Confirm Password</label>
                                <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-light focus:outline-none focus:shadow-outline' name="confirmPassword" type="text" placeholder='Re-enter your password' />
                            </div>
                            <button className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' type="submit">Submit</button>
                        </form>
                    </div>
                </div>
                <ToastContainer position="top-center" ></ToastContainer>
            </div>
        </section>

    );
}

export default SignUp;