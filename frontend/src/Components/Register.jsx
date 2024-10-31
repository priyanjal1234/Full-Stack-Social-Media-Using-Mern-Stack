import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { registerUser } from "../services/UserService";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoggedin } from "../redux/reducers/UserReducer";

function Register() {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let {isLoggedin} = useSelector(state => state.user)
  const [registerData, setregisterData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if(isLoggedin) {
      return navigate("/home")
    }
    return navigate("/")
  },[])

  function handleRegisterChange(e) {
    let { name, value } = e.target;
    setregisterData((prev) => ({ ...prev, [name]: value }));
  }

  async function registerSubmit(data) {
    let registerUserRes = await registerUser(data);
    if (registerUserRes.status === 201) {
      toast.success(
        "Please check your email for verification."
      );
      navigate("/verify-email");
    }
  }

  return (
    <div className="w-full h-screen bg-zinc-900 text-white flex items-center justify-center">
      <div className="w-full md:w-[390px] h-fit border-2 border-white p-4">
        <h1 className="text-3xl font-semibold text-center">
          Create Your Account
        </h1>
        <form onSubmit={handleSubmit(registerSubmit)} className="mt-5">
          <label htmlFor="name">Name</label>
          <input
            {...register("name", {
              required: "Name is required",
              minLength: {
                value: 3,
                message: "Name must be at least 3 characters",
              },
            })}
            onChange={handleRegisterChange}
            value={registerData.name}
            className="block px-3 py-2 bg-zinc-700 outline-none mb-3 mt-2 w-full rounded-lg  focus:border-blue-500"
            type="text"
            placeholder="Name"
            name="name"
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
          <label htmlFor="username">Username</label>
          <input
            {...register("username", {
              required: "Username is required",
              minLength: {
                value: 3,
                message: "Username must be at least 3 characters",
              },
            })}
            onChange={handleRegisterChange}
            value={registerData.username}
            className="block px-3 py-2 bg-zinc-700 outline-none mb-3 mt-2 w-full rounded-lg  focus:border-blue-500"
            type="text"
            placeholder="Username"
            name="username"
          />
          {errors.username && (
            <p className="text-red-500">{errors.username.message}</p>
          )}
          <label htmlFor="email">Email</label>
          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email format",
              },
            })}
            onChange={handleRegisterChange}
            value={registerData.email}
            className="block px-3 py-2 bg-zinc-700 outline-none mb-3 mt-2 w-full rounded-lg  focus:border-blue-500"
            type="email"
            placeholder="Email"
            name="email"
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
          <label htmlFor="password">Password</label>
          <input
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).{8,}$/i,
                message:
                  "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character",
              },
            })}
            onChange={handleRegisterChange}
            value={registerData.password}
            className="block px-3 py-2 bg-zinc-700 outline-none mb-3 mt-2 w-full rounded-lg  focus:border-blue-500"
            type="password"
            placeholder="Password"
            name="password"
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
          <button
            className="w-full h-[40px] bg-blue-600 rounded-full hover:bg-blue-700 transition duration-300 ease-in-out"
            type="submit"
          >
            Create
          </button>
        </form>
        <span className="block mt-3">Already have an account? <Link to={'/login'} className="text-blue-600 cursor-pointer">Login</Link></span>
      </div>
    </div>
  );
}

export default Register;
