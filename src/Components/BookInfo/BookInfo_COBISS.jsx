import React, { useEffect, useState } from "react";
import "./BookInfo_COBISS.scss";

const BookInfo_COBISS = ({ cobiss }) => {
    const [books, setBooks] = useState([]);
    const url = "../Data/sikkr.json";                        // kje so podatki (public jemlje kot root)

    const coverUrl = `https://d.cobiss.net/repository/si/thumbnails/cobib/${cobiss}`;

    console.log(coverUrl);

    useEffect(() => {
        const fetchBooks = async () => {
            const r = await fetch(url);
            const data = await r.json();
            setBooks(data);
        };

        fetchBooks();
    }, [cobiss]);


    if (!cobiss) return null;                                       // Če ni iskanega COBISS ID → ne prikaži nič

    console.log(books);

    const filteredBooks = cobiss
        ? books.filter(book => String(book["COBISS.ID"]) === String(cobiss))
        : books;


    if (filteredBooks.length === 0 ) {                               // Če ni najdenih knjig → prikaži sporočilo
        return (
            <div className="book-info">
                <h1>Knjige še nisem bral</h1>
            </div>
        );
    }

    return (
        <div>
            {filteredBooks.map((book, index) => (         //index namesto COBISS.ID, ker se COBISS.ID ponavlja
                <div key={index} className="book-info_COBISS">
                    <div className="book-info_avtor_title_COBISS">
                        <div>{book["Avtor"]}</div>
                        <div>{book["Naslov"]}</div>
                    </div>

                    <div className="book-details_COBISS">
                        <div>COBISS.ID: {book["COBISS.ID"]}</div>
                        <div>Datum izposoje: {book["Datum izposoje"]}</div>
                        <div>{book["Opis gradiva"]}</div>
                    </div>

                    <img className="book-cover_COBISS" src={coverUrl} alt={book.title}
                         onError={(e) => e.target.style.display = "none"} />
                </div>
            ))}
        </div>
    );
};

export default BookInfo_COBISS;

