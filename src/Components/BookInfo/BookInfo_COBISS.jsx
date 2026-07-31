import { useEffect, useState } from "react";
import "./BookInfo_COBISS.scss";

const BookInfo_COBISS = ({ cobiss }) => {
    const [books, setBooks] = useState([]);
    const url = "../Data/sikkr.json";

    useEffect(() => {
        const fetchBooks = async () => {
            const r = await fetch(url);
            const data = await r.json();
            setBooks(data);
        };

        fetchBooks();
    }, [cobiss]);


    if (!cobiss) return null;                                       // Če ni iskanega COBISS ID → ne prikaži nič

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
                    <div className="book-details_COBISS">
                        <h1>{book["COBISS.ID"]}</h1>
                        <h1>{book["Datum izposoje"]}</h1>
                    </div>

                    <h1>{book["Avtor"]}: {book["Naslov"]}</h1>
                    <div>{book["Opis gradiva"]}</div>
                </div>
            ))}
        </div>
    );
};

export default BookInfo_COBISS;

