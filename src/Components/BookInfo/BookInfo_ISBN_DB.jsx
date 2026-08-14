import React, { useState, useEffect } from "react";
import "./BookInfo_ISBN_DB.scss";

const BookInfo_ISBN_DB = ({ isbn }) => {
    const [book, setBook] = useState(null);

    useEffect(() => {
        if (!isbn) return;

        const headers = {
            "Content-Type": "application/json",
            "Authorization": import.meta.env.VITE_ISBN_KEY
        };
        console.log("Authorization:", import.meta.env.VITE_ISBN_KEY)

        const url = `https://api2.isbndb.com/book/${isbn}`;

        fetch(url, { headers })
            .then(res => res.json())
            .then(json => {
                console.log("Single_Book:", json);
                setBook(json.book);
            })
            .catch(error => console.error("Error:", error));
    }, [isbn]);

    console.log(book);

    if (!isbn) return null;
    if (!book) return null;

    return (
            <div className="book-info_ISBN_DB" >

                <div className="book-details_ISBN_DB">

                    <div className="book-info_avtor_title_ISBN_DB">{book.authors?.join(", ")}</div>
                    <div className="book-info_avtor_title_ISBN_DB">{book.title}</div>

                    <div>ISBN.DB: {isbn}</div>
                    <div className="book-fakts_ISBN_DB">
                        <p>Leto: {book.date_published || "No Date found"}</p>
                        <p>Language: {book.language || "No language found"}</p>
                        <p>Pages: {book.pages || "No pages found"}</p>
                    </div>
                    <div>{book.synopsis || "No synopsis found"}</div>
                </div>

                <img className="book-cover_ISBN_DB" src={book.image} alt="Book cover" />

            </div>
    );
};

export default BookInfo_ISBN_DB;


