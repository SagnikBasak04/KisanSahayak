import { useState } from "react";
import { Link } from "react-router-dom";
import { FaPhoneAlt } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { HiMiniEyeSlash } from "react-icons/hi2";
import useLogin from "../../hooks/useLogin";
import Spinner from "../../components/Spinner";
import useGetMetadata from "../../hooks/useGetMetadata";

const Login = () => {
  const [inputs, setInputs] = useState({
    phoneno: "",
    password: ""
  });
  const [secure, setSecure] = useState(true);
  const { loading, login } = useLogin();
  const {loading: enloading, metadata} = useGetMetadata();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(inputs);
    await metadata();
  };


  return (
    <div className="flex items-center justify-center min-h-screen min-w-screen bg-cover bg-center" style={{ backgroundImage: "url('bg.jpg')" }}>
      <div className="w-11/12 max-w-md bg-yellow-100 p-14 text-center rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-yellow-700">Login</h1>
        <div className="w-8 h-1 bg-yellow-700 mx-auto my-4 rounded-full"></div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div className="flex items-center bg-gray-200 rounded-lg">
              <FaPhoneAlt className="fa-solid fa-phone ml-4 text-gray-500" />
              <input
                type="text"
                placeholder="Contact Number"
                className="w-full p-4 bg-transparent border-0 focus:outline-none"
                value={inputs.phoneno}
                onChange={(e) => setInputs({ ...inputs, phoneno: e.target.value })}
              />
            </div>
            <div className="flex items-center bg-gray-200 rounded-lg">
              <RiLockPasswordFill className="fa-solid fa-phone ml-4 text-gray-500" />
              <input
                type={secure ? "password" : "text"}
                placeholder="Password"
                className="w-full p-4 bg-transparent border-0 focus:outline-none"
                value={inputs.password}
                onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
              />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setSecure(!secure);
                }}
                className="bg-transparent hover:bg-slate-200"
              ><HiMiniEyeSlash className="fa-solid fa-phone mr-4 text-gray-500" /></button>
            </div>

            <div className="flex justify-between items-center text-green-700">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" /> Remember Me
              </label>
              <a href="#" className="underline">Forgot Password?</a>
            </div>
          </div>

          <div className="flex justify-center mt-8">
            <button className="w-full bg-yellow-700 text-white py-2 rounded-full hover:bg-yellow-600 transition-colors" disabled={loading}>
              {loading ? <Spinner /> : "Login"}
            </button>
          </div>

          <Link to="/signup" className="text-green-700 mt-4 hover:underline hover:text-green-900">{"Don't"} have an Account? Signup</Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
