import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import { useNavigate, useParams } from 'react-router-dom';

const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); 
  const { id } = useParams();
  const handleDeleteBook = () => {
    setLoading(true);
    axios
    .delete(`http://localhost:5555/books/${id}`)
    .then((response) => {
      setLoading(false);
      navigate('/');
    }).catch((error) => {
      setLoading(false);
      alert('Failed to delete book');
      console.log(error);
    });
  };

  return (
    <div className='p-4'>
      <BackButton/>
      <h1 className='text-3xl my-4'>Delete Book</h1>
      {loading? (<Spinner/>):""}
      <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto'>
        <h3 className='text-2xl'> Are you sure you want to delete this book?</h3>
        <button className='p-4 bg-red-600 text-white m-8 w-full rounded-xl' onClick={handleDeleteBook}>Yes, delete it!</button>
      </div>
    </div>
  )
}

export default DeleteBook