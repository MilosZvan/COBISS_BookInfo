import { useState } from "react";
import "./BookSearch_ISBNDB.scss";

import Button from "../Button/Button.jsx";

const BookSearch_ISBNDB = ({ onSearch }) => {
    const [value, setValue] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(value);                                     // send ISBN to App
    };

    return (
        <div className="book-search-ISBNDB" >
            <div className="book-search-row-ISBNDB" >
                <form onSubmit={handleSubmit}>
                    <input
                        className="book-search-input-ISBNDB" name="book-search" type="text" placeholder="ISBN"
                        value={value}
                        onChange={(e) => setValue(e.target.value)} />
                    <Button title="Search Book on net" classList="btn btn-primary" />
                </form>
            </div>
        </div>
    );
};

export default BookSearch_ISBNDB;

