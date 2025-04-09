import React, { useContext, useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import { AppContext } from '../Context/AppContext';
import { motion } from 'motion/react';
import axios from 'axios'
import { toast } from 'react-toastify';

const Login = () => {
  const [state, setState] = useState('Login');
  const { setShowLogIn, backendURL, setToken, setUser } = useContext(AppContext);

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setpassword] = useState('')

  const onsubmitHandler = async (e) => {
    e.preventDefault();

    try {

      if (state === 'Login') {
        const { data } = await axios.post(`${backendURL}/api/user/login`, { email, password })
        console.log(`Aaaaaaaaa   ${data.sucess}`);

        if (data.sucess) {
          setToken(data.token)
          setUser(data.user)
          localStorage.setItem('token', data.token)
          setShowLogIn(false)
        } else {
          toast.error(data.message)
        }
      } else {
        const { data } = await axios.post(backendURL + '/api/user/register', { name, email, password })

        if (data.sucess) {
          setToken(data.token)
          setUser(data.user)
          localStorage.setItem('token', data.token)
          setShowLogIn(false)
        } else {
          toast.error(data.message)
        }
      }

    } catch (error) {
      toast.error(data.message)
    }
  }

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full z-50 backdrop-blur-sm bg-black/30 flex justify-center items-center">
      <motion.form onSubmit={onsubmitHandler}
        initial={{ opacity: 0.2, y: 50 }}
        transition={{ duration: 0.3 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative bg-white p-10 rounded-xl text-slate-500">
        <h1 className="text-center text-2xl text-neutral-700 font-medium">{state}</h1>
        <p className="text-sm">Welcome back! Please sign in to continue.</p>

        {state !== 'Login' && (<div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-5">
          <img src={assets.user_icon} alt="" />
          <input onChange={e => setName(e.target.value)} value={name} className="outline-none text-sm" type="text" placeholder="Full Name" required />
        </div>)}

        <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-4">
          <img src={assets.email_icon} alt="" />
          <input onChange={e => setEmail(e.target.value)} value={email} className="outline-none text-sm" type="email" placeholder="Email ID" required />
        </div>

        <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-4">
          <img src={assets.lock_icon} alt="" />
          <input onChange={e => setpassword(e.target.value)} value={password} className="outline-none text-sm" type="password" placeholder="Password" required />
        </div>

        <p className="text-sm text-blue-600 my-4 cursor-pointer">Forgot Password?</p>

        <button className="bg-blue-600 w-full text-white py-2 rounded-full">
          {state === 'Login' ? 'Login' : 'Create Account'}
        </button>

        {state === 'Login' ?
          (<p className="mt-5 text-center">Don’t have an account?{' '}<span className="text-blue-600 cursor-pointer" onClick={() => setState('Sign up')} >Sign up </span>    </p>)
          :
          (<p className="mt-5 text-center">Already have an account?{' '}<span className="text-blue-600 cursor-pointer" onClick={() => setState('Login')} >Login</span></p>)}

        <img onClick={() => setShowLogIn(false)} src={assets.cross_icon} alt="Close" className="absolute top-5 right-5 cursor-pointer" />
      </motion.form>
    </div>
  );
};

export default Login;
