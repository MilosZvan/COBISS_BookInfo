import React, { useState, useEffect } from "react";
import "./BookInfo_OpenLibrary.scss";

const BookInfo_OpenLibrary = ({ isbn }) => {
    const [book, setBook] = useState(null);

    const coverUrl = `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`;

    useEffect(() => {
        if (!isbn) return;

        const url = `https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&jscmd=details&format=json`;

        fetch(url)
            .then(res => res.json())
            .then(data => {
                const entry = data[`ISBN:${isbn}`];
                const details = entry?.details;

                if (!details) {
                    setBook({
                        title: "No title found",
                        subtitle: "No subtitle found",
                        authors: "No authors found",
                        isbn_10: "No ISBN 10 found",
                        isbn_13: "No ISBN 13 found",
                        publish_date: "No Date found",
                        number_of_pages: "No Pages found",
                    });
                    return;
                }

                console.log(details);

                // Authors can be objects or strings
                const authorNames = Array.isArray(details.authors)
                    ? details.authors
                        .map(a => (typeof a === "string" ? a : a.name))
                        .join(", ")
                    : "No authors found";

                const isbn10 = Array.isArray(details.isbn_10)
                    ? details.isbn_10.join(", ")
                    : details.isbn_10 || "No ISBN 10 found";

                const isbn13 = Array.isArray(details.isbn_13)
                    ? details.isbn_13.join(", ")
                    : details.isbn_13 || "No ISBN 13 found";

                setBook({
                    title: details.title || "No title found",
                    subtitle: details.subtitle || "No subtitle found",
                    authors: authorNames,
                    isbn_10: isbn10,
                    isbn_13: isbn13,
                    publish_date: details.publish_date || "No Date found",
                    number_of_pages: details.number_of_pages || "No Pages found",
                });
            })
            .catch(err => console.error(err));
    }, [isbn]);

    if (!isbn || !book) return null;

    return (
        <div className="book-info_OL">
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

            <img className="book-cover_OL" src={coverUrl} alt={book.title}
                 onError={(e) => e.target.style.display = "none"} />
        </div>
    );
};

export default BookInfo_OpenLibrary;
