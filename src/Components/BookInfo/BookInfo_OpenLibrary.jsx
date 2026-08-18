import React, { useState, useEffect } from "react";
import "./BookInfo_OpenLibrary.scss";

const BookInfo_OpenLibrary = ({ isbn }) => {
    const [book, setBook] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!isbn) return;

        const url = `https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&jscmd=details&format=json`;

        fetch(url)
            .then(res => res.json())
            .then(data => {
                const entry = data[`ISBN:${isbn}`];

                //if (!entry || !entry.details) {
                //    setError("OpenLibrary nima podatkov za ta ISBN.");
                //    setBook(null);
                //    return;
                //}

                if (!entry || !entry.details) {                         //retry za branje po timeoutu
                    if (!retry) {
                        // retry once after 1 second
                        setTimeout(() => fetchData(true), 2000);
                    } else {
                        setBook(null);
                    }
                    return;
                }

                const details = entry.details;

                // Avtorji – lahko so objekti ali stringi, lahko jih je tudi več
                 let authorNames = "No authors found";
                if (Array.isArray(details.authors)) {
                    authorNames = details.authors
                        .map(a => a.name || a)
                        .join(", ");
                }

                const isbn10 = Array.isArray(details.isbn_10)
                    ? details.isbn_10.join(", ")
                    : details.isbn_10 || "No ISBN 10 found";

                const isbn13 = Array.isArray(details.isbn_13)
                    ? details.isbn_13.join(", ")
                    : details.isbn_13 || "No ISBN 13 found";

                setBook({
                    title: details.title || "No title found",
                    subtitle: details.subtitle || "",
                    authors: authorNames,
                    isbn_10: isbn10,
                    isbn_13: isbn13,
                    publish_date: details.publish_date || "No Date found",
                    number_of_pages: details.number_of_pages || "No Pages found",
                });
            })
            .catch(err => {
                console.error(err);
                setError("Napaka pri branju OpenLibrary API.");
            });
    }, [isbn]);                                 //ponovno ber, če se spremeni isbn

    if (!isbn) return null;

    if (error) {
        return (
            <div className="book-info_OL">
                <div>OpenLibrary: {isbn}</div>
                <div className="book-details_OL error">{error}</div>
            </div>
        );
    }

    if (!book) return null;

    const coverUrl = `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`;

    return (
        <div className="book-info_OL">
            <div>OpenLibrary: {isbn}</div>

            <div className="book-details_OL">
                <div className="book-info_avtor_title_OL">{book.authors}</div>
                <div className="book-info_avtor_title_OL">{book.title}</div>

                <div className="book-fakts_OL">
                    <p>Leto: {book.publish_date}</p>
                    <p>ISBN_10: {book.isbn_10}</p>
                    <p>ISBN_13: {book.isbn_13}</p>
                    <p>Pages: {book.number_of_pages}</p>
                </div>
            </div>

            <img
                className="book-cover_OL"
                src={coverUrl}
                alt={book.title}
                onError={(e) => (e.target.style.display = "none")}
            />
        </div>
    );
};

export default BookInfo_OpenLibrary;
