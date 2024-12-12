import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const BookList = () => {
    const API_KEY = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;

    const [favourites, setFavourites] = useState(() => {
        const savedFavourites = localStorage.getItem('favourites');
        return savedFavourites ? JSON.parse(savedFavourites) : [];
    });

    const [books, setBooks] = useState([]);

    useEffect(() => {
        if (favourites.length > 0) {
            const fetchBooks = async () => {
                const bookPromises = favourites.map((favId) =>
                    fetch(`https://www.googleapis.com/books/v1/volumes/${favId}?key=${API_KEY}`)
                        .then(response => response.json())
                        .then(data => data)
                        .catch(error => console.error('Error fetching book:', error))
                );

                const booksData = await Promise.all(bookPromises);
                setBooks(booksData);
            };

            fetchBooks();
        }
    }, [favourites, API_KEY]);

    const removeFavourite = (bookId) => {
        const updatedFavourites = favourites.filter(favId => favId !== bookId);
        setFavourites(updatedFavourites);
        localStorage.setItem('favourites', JSON.stringify(updatedFavourites));
    };

    if (books.length === 0) {
        return (
            <div className='bg-amber-50'>
                <h1>No Books Yet</h1>
                <Link to="/">Back to Home</Link>
            </div>
        );
    }

    return (
        <div className='bg-amber-50 min-h-screen'>
            <h1 className='font-lobster text-sienna font-bold text-4xl lg:text-6xl text-center p-10'>My BookList</h1>
            <div className='text-center flex flex-col lg:flex-row justify-center font-nunito'>
                <Link to="/" className='bg-sienna text-center text-sm rounded-full font-bold text-amber-50 mx-24 p-2 lg:text-lg lg:mx-5 lg:px-6 lg:py-3 hover:bg-stone-800 transition'>Back to Home</Link>
            </div>
            <ul className='m-6 sm:m-12 lg:m-24 flex flex-wrap justify-center font-nunito'>
                {books.map(book => (
                    <li key={book.id} className='w-full sm:w-1/2 lg:w-1/3 p-3 sm:p-5 flex justify-center hover:shadow-lg transition'>
                        <Link to={`/book/${book.id}`} className='text-field font-bold hover:underline w-full flex justify-center'>
                                {book.volumeInfo.imageLinks?.thumbnail ? (
                                    <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} className='max-w-full' />
                                ) : (
                                    <div className='w-32 h-48 bg-gray-200 flex items-center justify-center'>
                                        <span>No Cover Available</span>
                                    </div>
                                )}
                            </Link>
                        <div className='bg-white flex flex-col justify-center items-center w-full p-4 sm:p-6'>
                            <div className='text-center w-full sm:w-2/3'>
                                <Link to={`/book/${book.id}`} className='text-field font-bold hover:underline'>{book.volumeInfo.title}</Link>
                            </div>
                            <p className='text-center w-full sm:w-2/3'>Author: {book.volumeInfo.authors?.join(', ')}</p>
                            <div className='text-center mt-4'>
                                <button className='bg-field px-4 py-2 font-bold rounded-full text-amber-50 hover:bg-lime-800 transition' onClick={() => removeFavourite(book.id)}>Remove Favourite</button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>

        </div>

    )
}

export default BookList