import "./BookItem.scss";
import "./BookItem.scss";
import Button from "../Button/Button.jsx";

//dobi Book, vrne onRemove in onSearch nazaj v klicni objekt

const BookItem = ({Book, onRemove, onSearch}) =>{

    //prikaz posamezne knjige, če je onRemove ali onSearch se vrne v BookList in naredi handle

    return (
        <div className="book-item">
            <div>{Book["COBISS.ID"]}, {Book["Datum izposoje"]}, {Book.Avtor}: {Book.Naslov}</div>
            <div className="book-actions">
                <Button classList="btn btn-search" title="Search by Author" onClick={() => onSearch(Book.Avtor)}/>
                <Button classList="btn btn-remove" title="Remove" onClick={() => onRemove(Book["COBISS.ID"])}/>
            </div>
        </div>
    )}

export default BookItem;
