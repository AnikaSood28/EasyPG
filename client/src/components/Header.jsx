import { FaSearch } from "react-icons/fa";
import logo from '../assets/logo.png';
import '../assets/styles.css'; 
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);
  return (
    <header className="relative bg-emerald-600 shadow-md font-cursive">
      <div className="bubble-container">
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
      </div>
      <div className="flex items-center justify-between relative max-w-6xl mx-auto p-3">
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="h-20" />
        </div>
        <Link to='/'>
         <h1 className='font-bold text-sm sm:text-xl flex flex-wrap p-3'>
            <span className='text-white text-4xl'>Easy</span>
            <span className='text-white text-4xl'>PG</span>
          </h1>
        </Link>
        <form onSubmit={handleSubmit}
          className="bg-white p-3 rounded-lg shadow-sm flex items-center border border-black font-cursive">
          <input
            type="text"
            placeholder="Search.."
            className='bg-transparent rounded-l-lg focus:outline-none w-24 sm:w-64'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}

          />

          <button>
            <FaSearch className='text-white' />
          </button>

        </form>
        <ul className='flex gap-4'>
          <Link to='/'>
            <li className='hidden sm:inline text-white hover:underline'>
              Home
            </li>
          </Link>
          <Link to='/about'>
            <li className='hidden sm:inline text-white hover:underline'>
              About
            </li>
          </Link>
          <Link to='/profile'>
            {currentUser ? (
              <img
                className='rounded-full h-7 w-7 object-cover'
                src={currentUser.avatar}
                alt='profile'
              />
            ) : (
              <li className=' text-white hover:underline'> Sign in</li>
            )}
          </Link>
        </ul>
      </div>

    </header>
  );
}
