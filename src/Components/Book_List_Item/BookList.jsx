import {useEffect, useState} from "react";
import BookItem from "./BookItem.jsx";

const BookList = () => {
    const [Books, setBooks] = useState([]);
    const [avtorFilter, setAvtorFilter] = useState("");
    const url = "/Data/sikkr.json";

    const handleRemove = (id) => {
        setBooks(prev => prev.filter(book => book["COBISS.ID"] !== id));
    };


    useEffect(() => {

        const fetchBooks = async () => {
            const r = await fetch(url, { method: "GET" });
            const books = await r.json();
            setBooks(books);
        }
        fetchBooks();

    },[])

    console.log(Books);
    console.log(Books[0]?.avtor);


    // Apply filter AFTER loading books
    const filteredBooks = avtorFilter ? Books.filter(book => book.avtor === avtorFilter) : Books;
    //

    return (
        <div className="book-list">
            {/* Input to filter by author */}
            <input
                type="text"
                placeholder="Filter by author"
                value={avtorFilter}
                onChange={(e) => setAvtorFilter(e.target.value)}
            />

            {Books.map((Book, index) => (     //index namesto COBISS.ID, ker se COBISS.ID ponavlja
                <BookItem
                    Book={Book}
                    key={index}
                    id={Book.id}                      //{Book["COBISS.ID"]}
                    onRemove={handleRemove}
                />
            ))}
        </div>
    )
}
export default BookList;

