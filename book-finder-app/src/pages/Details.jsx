import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const Details = () => {
    const { id } = useParams();
    const [book, setBook] = useState(null);

    const API_KEY = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;


    useEffect(() => {
        fetch(`https://www.googleapis.com/books/v1/volumes?q=${id}&key=${API_KEY}`)
            .then(response => response.json())
            .then(data => setBook(data.items[0]))
            .catch(error => console.error('Error Fetching Book Details:', error));
    }, [id, API_KEY])

    if (!book) {
        return <div>Loading...</div>
    }

    return (
        <div className='bg-amber-50 min-h-screen p-6'> 
            <h1 className='text-6xl font-lobster text-center text-sienna'>{book.volumeInfo.title}</h1>
            <div className='flex flex-col items-center justify-center mt-8 font-nunito'>
                <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} className='max-w-xs rounded shadow-md' />
                <div className='container mt-6 text-sienna'> 
                    <p className='mb-2 text-center'><strong>Authors:</strong> {book.volumeInfo.authors?.join(', ')}</p>
                    <p className='mb-2 text-center'><strong>Published Date:</strong> {book.volumeInfo.publishedDate}</p>
                    <p className='mb-4'>{book.volumeInfo.description}</p>
                </div>
                <Link to="/" className='mt-6 font-bold inline-block bg-sienna text-amber-50 px-4 py-2 rounded-full hover:bg-stone-800 transition'>Back to Home</Link>
            </div>
        </div>

    )
}

export default Details