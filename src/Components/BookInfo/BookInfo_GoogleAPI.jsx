import React, { useState, useEffect } from "react";
import "./BookInfo_GoogleAPI.scss";

const BookInfo_GoogleAPI = ({ isbn }) => {
    const [book, setBook] = useState(null);

    useEffect(() => {
        if (!isbn) return;

        // Prevent duplicate calls
        if (book?.isbn_13 === isbn || book?.isbn_10 === isbn) return;

        // Check cache
        const cached = localStorage.getItem(isbn);
        if (cached) {
            setBook(JSON.parse(cached));
            return;
        }

        const timer = setTimeout(async () => {
            try {
                const url = `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`;
                const res = await fetch(url);

                // If Google rate-limits, avoid breaking UI
                if (res.status === 429) {
                    setBook({
                        title: "Rate limit reached",
                        authors: "",
                        description: "Google Books API is temporarily limiting requests.",
                        thumbnail: null,
                        publish_date: "",
                        isbn_10: "",
                        isbn_13: ""
                    });
                    return;
                }

                const data = await res.json();
                const item = data.items?.[0];

                if (!item) {
                    setBook({ title: "No title found" });
                    return;
                }

                const info = item.volumeInfo;

                const isbn10 = info.industryIdentifiers?.find(id => id.type === "ISBN_10")?.identifier;
                const isbn13 = info.industryIdentifiers?.find(id => id.type === "ISBN_13")?.identifier;

                const bookData = {
                    title: info.title || "No title found",
                    authors: info.authors?.join(", ") || "No authors found",
                    publish_date: info.publishedDate || "No Date found",
                    isbn_10: isbn10 || "No ISBN_10 found",
                    isbn_13: isbn13 || "No ISBN_13 found",
                    thumbnail: info.imageLinks?.thumbnail || null,
                    description: info.description || "No description available"
                };

                setBook(bookData);
                localStorage.setItem(isbn, JSON.stringify(bookData));

            } catch (err) {
                console.log(err);
            }
        }, 300); // debounce

        return () => clearTimeout(timer);
    }, [isbn]);

    if (!isbn || !book) return null;

    return (
        <div className="book-info_GA">
            <div className="book-details_GA">

                {/* COVER IMAGE */}
                {book.thumbnail && (
                    <img
                        className="book-cover_GA"
                        src={book.thumbnail}
                        alt={book.title}
                    />
                )}

                {/* TITLE + AUTHORS */}
                <div className="book-info_avtor_title_GA">{book.authors}</div>
                <div className="book-info_avtor_title_GA">{book.title}</div>

                {/* DESCRIPTION */}
                <p className="book-description_GA">{book.description}</p>

                {/* FACTS */}
                <div className="book-fakts_GA">
                    <p>Leto: {book.publish_date}</p>
                    <p>ISBN_10: {book.isbn_10}</p>
                    <p>ISBN_13: {book.isbn_13}</p>
                </div>
            </div>
        </div>
    );
};

export default BookInfo_GoogleAPI;

