import React, { useContext, useState } from 'react';
import Header from "../Components/Header";
import axios from 'axios';
import { Context, server } from '..';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function Hregister() {
  const [hname, setHname] = useState("");
  const [haddress, setHaddress] = useState("");
  const [hphone, setHphone] = useState("");
  const [hemail, setHemail] = useState("");
  const [hpassword, setHpassword] = useState("");
  const [bed, setBed] = useState("");
  const [bbed, setBbed] = useState("");
  const [ebed, setEbed] = useState("");
  const [bebed, setBebed] = useState("");
  const [hverified, setHverified] = useState(false); // Verified status
  const { hdata, setHdata } = useContext(Context);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      try {
        await axios.get(`${server}/hosp/find/${hname}`, { withCredentials: true });
        toast.error("User already exists");
      } catch (error) {
        if (error.response && error.response.status === 404) {
          try {
            const {data} = await axios.post(
                `${server}/hosp/add`,
                {
                  hname,
                  haddress,
                  hphone,
                  hemail,
                  hpassword,
                  bed,
                  bbed,
                  ebed,
                  bebed,
                  hverified,
                },
                {
                  headers: { "Content-Type": "application/json" },
                  withCredentials: true,
                }
              );
              toast.success(`Hospital ${hname} registered successfully`);
            setHdata(data);
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

  const loginHandler = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  return (
    <>
      <Header />
      <div className="font-[sans-serif] bg-white md:h-screen">
        <div className="grid md:grid-cols-2 items-center gap-8 h-full">
          <div className="max-md:order-1 p-4 bg-gray-50 h-full">
            <img
              src="https://readymadeui.com/signin-image.webp"
              className="lg:max-w-[90%] w-full h-full object-contain block mx-auto"
              alt="register-image"
            />
          </div>

          <div className="flex items-center p-6 h-full w-full">
            <form className="max-w-lg w-full mx-auto" onSubmit={submitHandler}>
              <div className="mb-12">
                <h3 className="text-blue-500 md:text-3xl text-2xl font-extrabold max-md:text-center">Register Hospital</h3>
              </div>

              {/* Hospital Name */}
              <div className="mt-6">
                <label className="text-gray-800 text-xs block mb-2 text-left">Hospital Name</label>
                <input
                  value={hname}
                  onChange={(e) => setHname(e.target.value)}
                  type="text"
                  required
                  className="w-full bg-transparent text-sm border-b border-gray-300 focus:border-blue-500 px-2 py-3 outline-none"
                  placeholder="Enter hospital name"
                />
              </div>

              {/* Hospital Address */}
              <div className="mt-6">
                <label className="text-gray-800 text-xs block mb-2 text-left">Address</label>
                <input
                  value={haddress}
                  onChange={(e) => setHaddress(e.target.value)}
                  type="text"
                  required
                  className="w-full bg-transparent text-sm border-b border-gray-300 focus:border-blue-500 px-2 py-3 outline-none"
                  placeholder="Enter address"
                />
              </div>

              {/* Hospital Phone */}
              <div className="mt-6">
                <label className="text-gray-800 text-xs block mb-2 text-left">Phone Number</label>
                <input
                  value={hphone}
                  onChange={(e) => setHphone(e.target.value)}
                  type="text"
                  required
                  className="w-full bg-transparent text-sm border-b border-gray-300 focus:border-blue-500 px-2 py-3 outline-none"
                  placeholder="Enter phone number"
                />
              </div>

              {/* Hospital Email */}
              <div className="mt-6">
                <label className="text-gray-800 text-xs block mb-2 text-left">Email</label>
                <input
                  value={hemail}
                  onChange={(e) => setHemail(e.target.value)}
                  type="email"
                  required
                  className="w-full bg-transparent text-sm border-b border-gray-300 focus:border-blue-500 px-2 py-3 outline-none"
                  placeholder="Enter email"
                />
              </div>

              {/* Password */}
              <div className="mt-6">
                <label className="text-gray-800 text-xs block mb-2 text-left">Password</label>
                <input
                  value={hpassword}
                  onChange={(e) => setHpassword(e.target.value)}
                  type="password"
                  required
                  className="w-full bg-transparent text-sm border-b border-gray-300 focus:border-blue-500 px-2 py-3 outline-none"
                  placeholder="Enter password"
                />
              </div>

              {/* Beds Available */}
              <div className="mt-6">
                <label className="text-gray-800 text-xs block mb-2 text-left">Total Beds Available</label>
                <input
                  value={bed}
                  onChange={(e) => setBed(e.target.value)}
                  type="number"
                  required
                  className="w-full bg-transparent text-sm border-b border-gray-300 focus:border-blue-500 px-2 py-3 outline-none"
                  placeholder="Enter total beds available"
                />
              </div>

              {/* Booked Beds */}
              <div className="mt-6">
                <label className="text-gray-800 text-xs block mb-2 text-left">Booked Beds</label>
                <input
                  value={bbed}
                  onChange={(e) => setBbed(e.target.value)}
                  type="number"
                  required
                  className="w-full bg-transparent text-sm border-b border-gray-300 focus:border-blue-500 px-2 py-3 outline-none"
                  placeholder="Enter booked beds"
                />
              </div>

              {/* Emergency Beds */}
              <div className="mt-6">
                <label className="text-gray-800 text-xs block mb-2 text-left">Emergency Beds Available</label>
                <input
                  value={ebed}
                  onChange={(e) => setEbed(e.target.value)}
                  type="number"
                  required
                  className="w-full bg-transparent text-sm border-b border-gray-300 focus:border-blue-500 px-2 py-3 outline-none"
                  placeholder="Enter emergency beds available"
                />
              </div>

              {/* Booked Emergency Beds */}
              <div className="mt-6">
                <label className="text-gray-800 text-xs block mb-2 text-left">Booked Emergency Beds</label>
                <input
                  value={bebed}
                  onChange={(e) => setBebed(e.target.value)}
                  type="number"
                  required
                  className="w-full bg-transparent text-sm border-b border-gray-300 focus:border-blue-500 px-2 py-3 outline-none"
                  placeholder="Enter booked emergency beds"
                />
              </div>

              

              {/* Submit Button */}
              <div className="mt-12">
                <button
                  type="submit"
                  className="w-full py-3 px-6 text-sm tracking-wider font-semibold rounded-md bg-blue-600 hover:bg-blue-700 text-white focus:outline-none"
                >
                  Register Hospital
                </button>
                <p onClick={loginHandler} className="text-sm mt-6 text-gray-800">
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
