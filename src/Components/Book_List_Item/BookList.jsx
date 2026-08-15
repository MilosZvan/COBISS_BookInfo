import { useEffect, useState } from "react";
import "./BookList.scss";
import BookItem from "./BookItem.jsx";

const BookList = () => {
    const [Books, setBooks] = useState([]);

    const [avtorFilter, setAvtorFilter] = useState("");          //string za filtracijo po avtorju
    const [naslovFilter, setNaslovFilter] = useState("");        //string za filtracijo po naslovu

    const url = "/Data/sikkr.json";                                       //kje so podatki (public jemlje kot root)



    const handleRemove = (id) => {                                         //handle za brisanje
        setBooks(prev => prev.filter(book => book["COBISS.ID"] !== id));
    };

    const handleSearch = (author) => {                                     //handle za search
        setAvtorFilter(author);
    };



    useEffect(() => {                                               //pridobi vse podatke v sikkr.json
        const fetchBooks = async () => {
            const r = await fetch(url);
            const books = await r.json();
            setBooks(books);
        };
        fetchBooks();
    }, []);

    // -----------------------------
    // FILTRIRANJE
    // -----------------------------
    const filteredBooks = Books.filter(book => {                //filter na avtorju in/ali naslovu
        const avtor = (book.Avtor || "").toLowerCase();         //tolowerCase, da išče ne glede na to
        const naslov = (book.Naslov || "").toLowerCase();       // kako je napisan avtor in/ali naslov

        return (
            avtor.includes(avtorFilter.toLowerCase()) &&              //includes pomeni, da vsebuje string
            naslov.includes(naslovFilter.toLowerCase())
        );
    });

    return (
        <div className="book-list">
            <h1>Books I have read </h1>
            <h2>Filter books by <strong> Author </strong> and/or <strong> Title </strong> </h2>

            <div className="book-input">
                <input className="book-input-form"
                    type="text"
                    placeholder="Filtered by Author"
                    value={avtorFilter}
                    onChange={(e) => setAvtorFilter(e.target.value)}
                />

                <input className="book-input-form"
                    type="text"
                    placeholder="Filtered by Title"
                    value={naslovFilter}
                    onChange={(e) => setNaslovFilter(e.target.value)}
                />
            </div>


            {/* NI REZULTATOV */}
            {filteredBooks.length === 0 && (                                //če ni rezultatov, pokaže prazno
                <div style={{ marginTop: "20px", fontStyle: "italic" }}>
                    Ni rezultatov za izbrane filtre.
                </div>
            )}

            {/* PRIKAZ KNJIG */}
            {filteredBooks.map((Book, index) => (                   //pokaže filtrirane podatke
                <BookItem                                                   //kliče BookItem
                    Book={Book}
                    key={index}
                    id={Book["COBISS.ID"]}
                    onRemove={handleRemove}                               //če daš je začasno ugasnjeno, sicer deluje
                    onSearch={handleSearch}
                />
            ))}
        </div>
    );
};

export default BookList;
