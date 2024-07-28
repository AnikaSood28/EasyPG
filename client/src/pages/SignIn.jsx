import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from '../redux/user/userSlice';

import '../assets/styles.css'; 
import OAuth from '../components/OAuth';
export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch =useDispatch();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        
        return;
      }
      dispatch(signInSuccess(data));
      navigate('/');
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };
  return (
    <div className="bg-signup bg-orange-30 min-h-screen flex items-center justify-center px-20">
      <div className="bg-white p-8 rounded-lg shadow-md w-80">
        <h1 className='text-3xl text-center font-semibold my-7 text-cyan-900 font-cursive'>Sign In </h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
         
          <input
            type='email'
            placeholder='email'
            className='border border-emerald-500 p-3 rounded-lg font-cursive'
            id='email'
            onChange={handleChange}

          />
          <input
            type='password'
            placeholder='password'
            className='border border-emerald-500 p-3 rounded-lg font-cursive'
            id='password'
            onChange={handleChange}

          />
          <button 
           disabled={loading}
           className='bg-cyan-900 text-white p-3 rounded-lg hover:bg-cyan-800 font-cursive'>
              {loading ? 'Loading...' : 'Sign In'}
          </button>
          <OAuth/>
        </form>
        <div className='flex gap-2 mt-5'>
          <p className='font-cursive'>Don't have an account?</p>
          <Link to={'/signup'}>
            <span className='text-cyan-900 font-cursive'>Sign up</span>
          </Link>
        </div>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  );
}
