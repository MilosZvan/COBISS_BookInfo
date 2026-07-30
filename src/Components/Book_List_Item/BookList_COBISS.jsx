import {useEffect, useState} from "react";

const BookList_COBISS = ({ cobiss }) => {
    const [books, setBooks] = useState([]);
    const [cobissFilter, setCobissFilter] = useState("");
    const [avtorFilter, setAvtorFilter] = useState("");
    const url = "../Data/sikkr.json";


    useEffect(() => {

        const fetchBooks = async () => {
            const r = await fetch(url, { method: "GET" });
            const books = await r.json();
            setBooks(books);
        }
        fetchBooks();

    },[])

    //console.log(Books);
    //console.log(Books[0]?.avtor);


    // Apply filter AFTER loading books
    const filteredBooks = cobiss
        ? books.filter(book => book["COBISS.ID"] === cobiss)
        : books;
    //

    return (
        <div>

            {filteredBooks.map((book, index) => (     //index namesto COBISS.ID, ker se COBISS.ID ponavlja
                <div key={index} className="book-info">
                    <div className="book-details">
                        <h1>{book["COBISS.ID"]}                 </h1>
                        <h1>{book["Datum izposoje"]}            </h1>
                    </div>
                    <h1>{book["Avtor"]}: {book["Naslov"]}   </h1>
                    <div>{book["Opis gradiva"]}             </div>
                </div>
            ))}
        </div>
    )
}
export default BookList_COBISS;

