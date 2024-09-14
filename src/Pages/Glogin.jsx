import React, { useContext, useEffect, useState } from 'react'
import Header from "../Components/Header"
import axios from 'axios';
import { Context, server } from '..';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Loader from '../Components/Loader';
import alogo from './Images/delhi.png'
import audit from '../Components/Audit'


export default function () {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const { userData, setUserData, mediData, setMediData, loading, setLoading, hosp, setHosp, adata, setAdata } = useContext(Context);
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (Adata) {
  //     navigate("/hdash");
  //   }
  // }, [Adata, navigate]);
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const { data } = await axios.get(`${server}/hosp/govt/${email}`, { withCredentials: true });
      if (data.password == password) {
        
          setAdata(data);
          toast.success(`Welcome ${data.hname}`);
          setLoading(false);
          await audit(`Admin Login of ${data.hname}`)
          navigate("/govt")


      }
      else {
        setAdata("");
        toast.error("Incorrect Password")
        setLoading(false);
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.error("User not found");
      } else {
        toast.error("An error occurred");
      }
      setLoading(false);
    }
  };
  const register = (e) => {
    e.preventDefault();
    navigate("/register")
  }
  if (loading) {
    return <div className='flex items-center justify-center h-screen'>
      <Loader />
    </div>

  }
  return (
    <>
      <Header />
      <div class="font-[sans-serif]">
        <div class="min-h-screen flex fle-col items-center justify-center py-6 px-4">
          <div class="grid md:grid-cols-2 items-center gap-4 max-w-6xl w-full">
            <div class="border border-gray-300 rounded-lg p-6 max-w-md shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] max-md:mx-auto">
              <form class="space-y-4">
                <div class="mb-8">
                  <h3 class="text-gray-800 text-3xl font-extrabold">Sign in</h3>
                  <p class="text-gray-500 text-sm mt-4 leading-relaxed">Sign in to your account and explore a world of possibilities. Your journey begins here.</p>
                </div>
                <div>
                  <label class="text-gray-800 text-sm mb-2 block text-left">Email</label>
                  <div class="relative flex items-center">
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required class="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg outline-purple-600" placeholder="Enter Your Email" />
                    <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" class="w-[18px] h-[18px] absolute right-4" viewBox="0 0 24 24">
                      <circle cx="10" cy="7" r="6" data-original="#000000"></circle>
                      <path d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z" data-original="#000000"></path>
                    </svg>
                  </div>
                </div>
                <div>
                  <label class="text-gray-800 text-sm mb-2 block text-left">Password</label>
                  <div class="relative flex items-center">
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required class="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg outline-purple-600" placeholder="Enter password" />
                    <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" class="w-[18px] h-[18px] absolute right-4 cursor-pointer" viewBox="0 0 128 128">
                      <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z" data-original="#000000"></path>
                    </svg>
                  </div>
                </div>

                <div class="flex flex-wrap items-center justify-between gap-4">
                 

                  
                </div>

                <div class="!mt-8">
                  <button onClick={submitHandler} type="button" class="w-full shadow-xl py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-black hover:bg-green-900 focus:outline-none">
                    Log in
                  </button>
                </div>

              </form>
            </div>
            <div class="lg:h-[500px] md:h-[500px] max-md:mt-8 max-md:w-full relative">
              <img src={alogo} class="object-contain w-full h-full block absolute inset-0" alt="Login Graphic" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
