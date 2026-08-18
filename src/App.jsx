import { useState } from "react";
import 'sass-reset';
import './Main.scss'
import Header from "./Components/Header/Header.jsx";
import BookList from "./Components/Book_List_Item/BookList.jsx";
import BookInfo_COBISS from "./Components/BookInfo/BookInfo_COBISS.jsx";

import BookSearch_ISBN from "./Components/BookSearch/BookSearch_ISBN.jsx";
import BookSearch_COBISS from "./Components/BookSearch/BookSearch_COBISS.jsx";
import BookInfo_ISBN_DB from "./Components/BookInfo/BookInfo_ISBN_DB.jsx";
import BookInfo_OpenLibrary from "./Components/BookInfo/BookInfo_OpenLibrary.jsx";


import Footer from "./Components/Footer/Footer.jsx";
import BookInfo_COBISS_ONLINE from "./Components/BookInfo/BookInfo_COBISS_ONLINE.jsx";

function App() {
    const [isbn, setIsbn] = useState("");
    const [cobiss, setCobiss] = useState("");

    return (
        <section id="center">
            <Header />

            <BookSearch_COBISS onSearch={setCobiss} />
            <BookInfo_COBISS cobiss={cobiss} />

            <BookSearch_ISBN onSearch={setIsbn} />
            <BookInfo_ISBN_DB isbn={isbn} />
            <BookInfo_OpenLibrary isbn={isbn} />


            <BookList/>

            <Footer />
        </section>
    );
}

export default App;

