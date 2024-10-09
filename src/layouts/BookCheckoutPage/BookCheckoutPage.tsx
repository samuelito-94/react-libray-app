import { useEffect, useState } from "react";
import { BookModel } from "../../models/BookModel";
import { useParams } from "react-router-dom";

export const BookCheckoutPage = () => {

    const [book, setBook] = useState<BookModel>();
    const [isLoadingBook, setIsLoadingBook] = useState(true);
    const [httpError, setHttpError] = useState(null);
    const {bookId} = useParams<any>();

    console.log(bookId);

    useEffect(() => {
        const fetchBook = async () => {
            const baseUrl = `http://localhost:8080/api/books/${bookId}`;
            const response = await fetch(baseUrl);
            if (!response.ok) {
                throw new Error('Something went wrong');
            }
            const responseJson = await response.json();

            const loadedBook: BookModel = {
                id: responseJson.id,
                title: responseJson.title,
                author: responseJson.author,
                description: responseJson.description,
                copies: responseJson.copies,
                copiesAvailable: responseJson.copiesAvailable,
                img: responseJson.img,
                category: responseJson.category
            };
            setBook(loadedBook);
            setIsLoadingBook(false);
        };
        fetchBook().catch((error: any) => {
            setIsLoadingBook(false);
            setHttpError(error.message);
        })
    }, []);

    return (
        <div>
            <h3>Hi World!</h3>
            {book && <p>{book.author}</p>}
        </div>
    );
}