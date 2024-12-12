import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import IonIcon from '@reacticons/ionicons';

const Home = () => {
    const [books, setBooks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [favourites, setFavourites] = useState(() => {
        const savedFavourites = localStorage.getItem('favourites');
        return savedFavourites ? JSON.parse(savedFavourites) : [];
    });

    //used to hide the API key when pushing to github/online
    const API_KEY = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;


    const searchBooks = () => {

        fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&key=${API_KEY}`)
            .then(response => response.json())
            .then((data) => {
                setBooks(data.items);
            })
            .catch(error => console.error('Error Fetching Books:', error));
    };

    const toggleFavourite = (book) => {
        const updatedFavourites = favourites.includes(book.id)
            ? favourites.filter(favId => favId !== book.id)
            : [...favourites, book.id];
        setFavourites(updatedFavourites);
        localStorage.setItem('favourites', JSON.stringify(updatedFavourites));
    };

    useEffect(() => {

        fetch(`https://www.googleapis.com/books/v1/volumes?q=harry+potter&key=${API_KEY}`)
            .then(response => response.json())
            .then(data => setBooks(data.items))
            .catch(error => console.error('Error fetching books:', error));
    }, []);

    return (
        <div className='bg-amber-50'>
            <h1 className='font-lobster text-stone-700 font-bold text-4xl lg:text-6xl text-center p-10'>My Virtual Library</h1>

            <div className='text-center flex flex-col lg:flex-row justify-center font-nunito'>
                <Link to="/booklist" className='bg-stone-700 text-center text-sm rounded-full font-bold text-amber-50 mx-24 p-2 lg:text-lg lg:mx-5 lg:px-6 lg:py-3 hover:bg-stone-800 transition'>View BookList</Link>
                <div className='flex justify-center m-5 lg:m-0'>
                    <input
                        type="text"
                        placeholder='Search for a Book...'
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className='rounded-full p-2 border-2'

                    />

                    <button className='mx-2' onClick={searchBooks}>
                        <IonIcon className='p-2 text-2xl text-amber-50 bg-stone-700 rounded-full hover:bg-stone-800 transition' name='search'></IonIcon>
                    </button>
                </div>
            </div>

            <ul className='m-6 sm:m-12 lg:m-24 flex flex-wrap justify-center font-nunito'>
                {books && books.length > 0 ? (
                    books.map((book) => (
                        <li key={book.id} className='w-full sm:w-1/2 lg:w-1/3 p-3 sm:p-5 flex justify-center hover:shadow-lg transition'>
                            <Link to={`/book/${book.id}`} className='text-lime-800 font-bold hover:underline w-full flex justify-center'>
                                <img
                                    src={book.volumeInfo.imageLinks.thumbnail}
                                    alt={book.volumeInfo.title}
                                    className='max-w-full' />
                            </Link>
                            <div className='bg-white flex flex-col justify-center items-center w-full p-4 sm:p-6'>
                                <div className='text-center w-full sm:w-2/3'>
                                    <Link
                                        to={`/book/${book.volumeInfo.title}`}
                                        className='text-lime-800 font-bold hover:underline'
                                    >
                                        {book.volumeInfo.title}
                                    </Link>
                                </div>
                                <p className='text-center w-full sm:w-2/3'>Author: {book.volumeInfo.authors?.join(', ')}</p>
                                <div className='text-center mt-4'>
                                    <button onClick={() => toggleFavourite(book)} className='bg-lime-800 px-4 py-2 font-bold rounded-full text-amber-50 hover:bg-lime-900 transition'>
                                        {favourites.includes(book.id) ? '- Remove from Booklist' : '+ Add to Book List'}
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))
                ) : (
                    <p>No Books Found</p>
                )}
            </ul>


        </div>

    )
}

export default Home