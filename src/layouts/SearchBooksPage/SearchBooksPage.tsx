import { useState, useEffect } from "react";
import { BookModel } from "../../models/BookModel";
import { SpinnerLoading } from "../Utils/SpinnerLoading";
import { SearchBook } from "./components/SearchBook";
import { Pagination } from "../Utils/Pagination";

export const SearchBooksPage = () => {

    const [books, setBooks] = useState<BookModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [booksPerPage] = useState(5);
    const [totalAmountOfBooks, setTotalAmountOfBooks] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const fetchBooks = async () => {
            const baseUrl = 'http://localhost:8080/api/books';

            const url = `${baseUrl}?page=${currentPage - 1}&size=${booksPerPage}`;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Something went wrong');
            }
            const responseJson = await response.json();
            const data = responseJson._embedded.books;
            setTotalAmountOfBooks(responseJson.page.totalElements);
            setTotalPages(responseJson.page.totalPages);

            const loadedBooks: BookModel[] = data.map((item: any) => ({
                id: item.id,
                title: item.title,
                author: item.author,
                description: item.description,
                copies: item.copies,
                copiesAvailable: item.copiesAvailable,
                img: item.img,
                category: item.category
            }));
            setBooks(loadedBooks);
            setIsLoading(false);
        };
        fetchBooks().catch((error: any) => {
            setIsLoading(false);
            setHttpError(error.message);
        })
        window.scroll(0,0);
    }, [currentPage]);

    if (isLoading) {
        return (
            <SpinnerLoading />
        )
    }

    if (httpError) {
        return (
            <div className='container m-5'>
                <p>{httpError}</p>
            </div>
        )
    }

    const indexOfLastBook : number = currentPage * booksPerPage;
    const intdexOfFirstBook: number = indexOfLastBook - booksPerPage;
    let lastItem = booksPerPage * currentPage <= totalAmountOfBooks 
    ? booksPerPage: totalAmountOfBooks;
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
    return (
        <>
            <div className="container">
                <div>
                    <div className="row mt-5">
                        <div className="col-6">
                            <div className="d-flex">
                                <input className="form-control me-2" type="search"
                                placeholder="Search" aria-label="Search" />
                                <button className="btn btn-outline-success">
                                    Search
                                </button>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="dropdown">
                                <button className="btn btn-secondary dropdown-toggle"
                                type="button" id="dropdownMenuButton1"
                                data-bs-toggle="dropdown"
                                aria-expanded="false">
                                    Category
                                </button>
                                <ul className="dropdown-menu"
                                aria-labelledby="dropdownMenuButton1">
                                    <li>
                                        <a className="dropdown-item" href="#">All</a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#">Frontend</a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#">Backend</a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#">Data</a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#">Devops</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="mt-3">
                            <h5>Number of results: ({totalAmountOfBooks})</h5>
                        </div>
                        <p>{intdexOfFirstBook + 1} to {lastItem} of {totalAmountOfBooks} items</p>
                        {books.map(book => <SearchBook book={book} key={book.id} />)}
                        {totalPages > 1 && 
                        <Pagination currentPage={currentPage} totalPages={totalPages} 
                        paginate={paginate}/>}
                    </div>
                </div>
            </div>
        </>
    );
}