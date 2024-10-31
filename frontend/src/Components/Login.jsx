import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { loginUser } from "../services/UserService";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setLoggedin } from "../redux/reducers/UserReducer";
import { Link, useNavigate } from "react-router-dom";

function Login() {
    let dispatch = useDispatch()
    let navigate = useNavigate()
    let { isLoggedin } = useSelector(state => state.user)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  useEffect(() => {
    if(isLoggedin) {
      return navigate("/home")
    }
    return navigate("/login")
  },[])

  async function onSubmit(data) {
    let loginUserRes = await loginUser(data)
    if(loginUserRes.status === 200) {
        toast.success("Login Success")
        dispatch(setLoggedin(true))
        navigate("/home")
    }
  }

  return (
    <div className="w-full h-screen bg-zinc-900 text-white flex items-center justify-center">
      <div className="w-[400px] h-fit p-4 border-2 border-white">
        <h1 className="text-3xl font-semibold text-center">
          Login Your Account
        </h1>
        <form className="mt-5" onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="email">Email</label>
          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email format",
              },
            })}
            className="block mt-2 mb-3 px-3 py-2 bg-zinc-700 w-full outline-none"
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
            })}
            className="block mt-2 mb-3 px-3 py-2 bg-zinc-700 w-full outline-none"
            type="password"
            placeholder="Password"
            name="password"
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
          <button
            className="w-full h-[40px] bg-blue-600 rounded-full"
            type="submit"
          >
            Login
          </button>
        </form>
        <Link to={'/forgot-password'} className="text-blue-600 block mt-3">Forgot Password</Link>
        <span className="block mt-3">Don't have an account? <Link className="text-blue-600" to={'/'}>Sign up</Link></span>
      </div>
    </div>
  );
}

export default Login;
