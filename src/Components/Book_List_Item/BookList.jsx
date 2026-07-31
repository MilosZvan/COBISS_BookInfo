import { useEffect, useState } from "react";
import BookItem from "./BookItem.jsx";

const BookList = () => {
    const [Books, setBooks] = useState([]);

    const [avtorFilter, setAvtorFilter] = useState("");
    const [naslovFilter, setNaslovFilter] = useState("");

    const url = "/Data/sikkr.json";

    const handleRemove = (id) => {
        setBooks(prev => prev.filter(book => book["COBISS.ID"] !== id));
    };

    useEffect(() => {
        const fetchBooks = async () => {
            const r = await fetch(url);
            const books = await r.json();
            setBooks(books);
        };
        fetchBooks();
    }, []);

    // -----------------------------
    // VARNO FILTRIRANJE
    // -----------------------------
    const filteredBooks = Books.filter(book => {
        const avtor = (book.Avtor || "").toLowerCase();
        const naslov = (book.Naslov || "").toLowerCase();

        return (
            avtor.includes(avtorFilter.toLowerCase()) &&
            naslov.includes(naslovFilter.toLowerCase())
        );
    });

    return (
        <div className="book-list">

            <h2>Filtri po Avtorju in Naslovu, če ni filtra pokaže vse</h2>

            <input
                type="text"
                placeholder="Filter po avtorju"
                value={avtorFilter}
                onChange={(e) => setAvtorFilter(e.target.value)}
            />

            <input
                type="text"
                placeholder="Filter po naslovu"
                value={naslovFilter}
                onChange={(e) => setNaslovFilter(e.target.value)}
            />


            {/* NI REZULTATOV */}
            {filteredBooks.length === 0 && (
                <div style={{ marginTop: "20px", fontStyle: "italic" }}>
                    Ni rezultatov za izbrane filtre.
                </div>
            )}

            {/* PRIKAZ KNJIG */}
            {filteredBooks.map((Book, index) => (
                <BookItem
                    Book={Book}
                    key={index}
                    id={Book["COBISS.ID"]}
                    onRemove={handleRemove}
                />
            ))}
        </div>
    );
};

export default BookList;
