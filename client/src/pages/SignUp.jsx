import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate('/signin');
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };
  return (
    <div className="bg-signup bg-orange-30 min-h-screen flex items-center justify-center px-20">
      <div className="bg-white p-8 rounded-lg shadow-md w-80">
        <h1 className='text-3xl text-center font-semibold my-7 text-cyan-900 font-cursive'>Sign Up</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <input
            type='text'
            placeholder='username'
            className='border border-emerald-500 p-3 rounded-lg font-cursive'
            id='username'
            onChange={handleChange}

          />
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
              {loading ? 'Loading...' : 'Sign Up'}
          </button>
          <OAuth/>
        </form>
        <div className='flex gap-2 mt-5'>
          <p className='font-cursive'>Have an account?</p>
          <Link to={'/signin'}>
            <span className='text-cyan-900 font-cursive'>Sign in</span>
          </Link>
        </div>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  );
}
