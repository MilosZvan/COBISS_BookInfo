import { useState } from "react";
import 'sass-reset';
import './Main.scss'
import Header from "./Components/Header/Header.jsx";
import BookList from "./Components/Book_List_Item/BookList.jsx";
import BookInfo_COBISS from "./Components/BookInfo/BookInfo_COBISS.jsx";

import BookSearch_ISBNDB from "./Components/BookSearch/BookSearch_ISBNDB.jsx";
import BookSearch_COBISS from "./Components/BookSearch/BookSearch_COBISS.jsx";
import BookInfo_ISBN_DB from "./Components/BookInfo/BookInfo_ISBN_DB.jsx";
import BookInfo_OpenLibrary from "./Components/BookInfo/BookInfo_OpenLibrary.jsx";
//import BookInfo_GoogleAPI from "./Components/BookInfo_COBISS_ONLINE/BookInfo_GoogleAPI.jsx";
//import BookInfo_COBISS_ONLINE from "./Components/BookInfo_COBISS_ONLINE/BookInfo_COBISS_ONLINE.jsx";

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

            <BookSearch_ISBNDB onSearch={setIsbn} />
            <BookInfo_ISBN_DB isbn={isbn} />

            <BookList/>

            <Footer />
        </section>
    );
}

export default App;

//<BookList />
//<BookInfo_COBISS_ONLINE cobiss={cobiss} />
//<BookInfo_ISBN_DB isbn={isbn} />
//<BookSearch_ISBNDB onSearch={setIsbn} />
//<BookInfo_OpenLibrary isbn={isbn} />