import React, { useContext, useState } from 'react';
import Header from "../Components/Header";
import axios from 'axios';
import { Context, server } from '..';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [aadhar, setAadhar] = useState("");
  const [phone, setPhone] = useState("");
  const [tnc, setTnc] = useState(false);
  const {userData,setUserData} = useContext(Context)
  const navigate = useNavigate();



  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      try {
        await axios.get(`${server}/user/user/${email}`, { withCredentials: true });
        toast.error("User already exists");
      } catch (error) {
        if (error.response && error.response.status === 404) {
          try {
            const { data } = await axios.post(
              `${server}/user/add`,
              {
                name,
                email,
                password: pass,
                aadhar,
                phone,
                tnc,
              },
              {
                headers: {
                  "Content-Type": "application/json",
                },
                withCredentials: true,
              }
            );
            setUserData(data);
            toast.success(`Welcome ${data.name}`);
          } catch (error) {
            if (error.response && error.response.data) {
              toast.error(error.response.data.message);
            } else {
              toast.error("Something went wrong");
            }
          }
        } else {
          toast.error("Something went wrong");
        }
      }
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  const loginHandler = (e)=>{
    e.preventDefault();
    navigate("/login")
  }

  return (
    <>
      <Header />
      <div className="font-[sans-serif] bg-white md:h-screen">
        <div className="grid md:grid-cols-2 items-center gap-8 h-full">
          <div className="max-md:order-1 p-4 bg-gray-50 h-full">
            <img
              src="https://readymadeui.com/signin-image.webp"
              className="lg:max-w-[90%] w-full h-full object-contain block mx-auto"
              alt="login-image"
            />
          </div>

          <div className="flex items-center p-6 h-full w-full">
            <form className="max-w-lg w-full mx-auto" onSubmit={submitHandler}>
              <div className="mb-12">
                <h3 className="text-blue-500 md:text-3xl text-2xl font-extrabold max-md:text-center">Create an account</h3>
              </div>

              <div>
                <label className="text-gray-800 text-xs block mb-2 text-left">Full Name</label>
                <div className="relative flex items-center">
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    required
                    className="w-full bg-transparent text-sm border-b border-gray-300 focus:border-blue-500 px-2 py-3 outline-none"
                    placeholder="Enter name"
                  />
                </div>
              </div>
              <div className="mt-6">
                <label className="text-gray-800 text-xs block mb-2 text-left">Email</label>
                <div className="relative flex items-center">
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    required
                    className="w-full bg-transparent text-sm border-b border-gray-300 focus:border-blue-500 px-2 py-3 outline-none"
                    placeholder="Enter email"
                  />
                </div>
              </div>
              <div>
                <label className="text-gray-800 text-xs block mb-2 text-left">Aadhar Card</label>
                <div className="relative flex items-center">
                  <input
                    value={aadhar}
                    onChange={(e) => setAadhar(e.target.value)}
                    type="text"
                    required
                    className="w-full bg-transparent text-sm border-b border-gray-300 focus:border-blue-500 px-2 py-3 outline-none"
                    placeholder="Enter Aadhar card number"
                  />
                </div>
              </div>
              <div>
                <label className="text-gray-800 text-xs block mb-2 text-left">Phone Number</label>
                <div className="relative flex items-center">
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    type="text"
                    required
                    className="w-full bg-transparent text-sm border-b border-gray-300 focus:border-blue-500 px-2 py-3 outline-none"
                    placeholder="Enter phone number"
                  />
                </div>
              </div>
              <div className="mt-6">
                <label className="text-gray-800 text-xs block mb-2 text-left">Password</label>
                <div className="relative flex items-center">
                  <input
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                    type="password"
                    required
                    className="w-full bg-transparent text-sm border-b border-gray-300 focus:border-blue-500 px-2 py-3 outline-none"
                    placeholder="Enter password"
                  />
                </div>
              </div>
              
              <div className="flex items-center mt-6">
                <input
                  checked={tnc}
                  onChange={() => setTnc(!tnc)}
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 shrink-0 rounded"
                />
                <label htmlFor="remember-me" className="ml-3 block text-sm text-gray-800">
                  I accept the <a href="javascript:void(0);" className="text-blue-500 font-semibold hover:underline ml-1">Terms and Conditions</a>
                </label>
              </div>

              <div className="mt-12">
                <button
                  type="submit"
                  className="w-full py-3 px-6 text-sm tracking-wider font-semibold rounded-md bg-blue-600 hover:bg-blue-700 text-white focus:outline-none"
                >
                  Create an account
                </button>
                <p onClick = {loginHandler} className="text-sm mt-6 text-gray-800">
                  Already have an account? <a href="javascript:void(0);" className="text-blue-500 font-semibold hover:underline ml-1">Login here</a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
