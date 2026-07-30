import { useState } from "react";
import "./BookSearch.scss";

import Button from "../Button/Button.jsx";

const BookSearch = ({ onSearch }) => {
    const [value, setValue] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(value);                                     // send ISBN to App
    };

    return (
        <form className="book-search" onSubmit={handleSubmit}>
            <input
                id="book-search" name="book-search" type="text" placeholder="ISBN"
                value={value}
                onChange={(e) => setValue(e.target.value)} />
            <Button title="Search Book on net" classList="btn btn-primary" onClick={e => handleSubmit(e)} />
        </form>
    );
};

export default BookSearch;