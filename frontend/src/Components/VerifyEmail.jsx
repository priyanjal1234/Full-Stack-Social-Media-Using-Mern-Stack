import React, { useState } from "react";
import { verifyEmail } from "../services/UserService";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setLoggedin } from "../redux/reducers/UserReducer";
import { useNavigate } from "react-router-dom";

function VerifyEmail() {
    let dispatch = useDispatch()
    let navigate = useNavigate()
    const [verifyData, setverifyData] = useState({
        email: '',
        code: ''
    })

    function handleVerifyDataChange(e) {
        let { name,value } = e.target 
        setverifyData(prev => ({...prev,[name]:value}))
    }

    async function handleVerifyDataSubmit(e) {
        e.preventDefault()
        let verifyEmailRes = await verifyEmail(verifyData)
        if(verifyEmailRes.status === 200) {
            toast.success("Email Verified Successfully")
            dispatch(setLoggedin(true))
            navigate("/home")
        }
    }

    return (
        <div className="w-full h-screen bg-zinc-900 flex items-center text-white justify-center">
        <div className="w-[400px] h-fit p-4 border-2 border-white">
            <h1 className="text-3xl font-semibold text-center">
            Verify Your Email
            </h1>
            <form onSubmit={handleVerifyDataSubmit} className="mt-5">
            <label htmlFor="email">Email</label>
            <input
                className="px-3 py-2 bg-zinc-700 outline-none block mt-2 mb-3 w-full rounded-lg"
                type="email"
                placeholder="Email"
                name="email"
                value={verifyData.email}
                onChange={handleVerifyDataChange}
            />
            <label htmlFor="code">Verification Code</label>
            <input
                className="px-3 py-2 bg-zinc-700 outline-none block mt-2 mb-3 w-full rounded-lg"
                type="number"
                name="code"
                placeholder="Write the code"
                value={verifyData.code}
                onChange={handleVerifyDataChange}
            />
            <button className="w-full h-[40px] bg-blue-600 rounded-full" type="submit">Verify</button>
            </form>
        </div>
        </div>
    );
}

export default VerifyEmail;
