import React, { useState, useEffect } from "react";

const BookInfo_GoogleAPI = ({ isbn }) => {
    const [title, setTitle] = useState("");

    fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`)
        .then(res => res.json())
        .then(data => console.log(data.items));

    }


    return <h1>{title}</h1>;
};

export default BookInfo_GoogleAPI;