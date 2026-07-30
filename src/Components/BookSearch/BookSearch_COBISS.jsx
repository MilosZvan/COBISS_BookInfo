import { useState } from "react";
import "./BookSearch_COBISS.scss";

import Button from "../Button/Button.jsx";

const BookSearch_COBISS = ({ onSearch }) => {
    const [value, setValue] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(value);                                     // send COBISS.ID to App
    };

    return (
        <form className="book-search" onSubmit={handleSubmit}>
            <input
                id="book-search" name="book-search" type="text" placeholder="COBISS.ID"
                value={value}
                onChange={(e) => setValue(e.target.value)} />
            <Button title="Search Book in COBISS" classList="btn btn-primary" />
        </form>
    );
};

export default BookSearch_COBISS;

