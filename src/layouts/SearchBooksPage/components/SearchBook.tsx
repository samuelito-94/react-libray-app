import React from "react"
import { BookModel } from "../../../models/BookModel"

interface Props {
    book: BookModel
}

export const SearchBook: React.FC<Props> = ({ book }) => {

    return (
        <div className="card mt-3 shadow p-3 mb-3 bg-body rounded">
            <div className="row g-0">
                <div className="col-md-2">
                    <div className="d-none d-lg-block">
                        <img
                            src={book.img ?? require('../../../Images/BooksImages/book-luv2code-1000.png')}
                            alt="Book"
                            width={123}
                            height={196} />
                    </div>
                    <div className="d-lg-none d-flex justify-content-center
                    align-items-center">
                        <img
                            src={book.img ?? require('../../../Images/BooksImages/book-luv2code-1000.png')}
                            alt="Book"
                            width={123}
                            height={196} />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card-body">
                        <h5 className="card-title">
                            {book.author}
                        </h5>
                        <h4>{book.title}</h4>
                        <p className="card-text">
                            {book.description}
                        </p>
                    </div>
                </div>
                <div className="col-md-4 d-flex justify-content-center align-items-center">
                    <a className="btn btn-md main-color text-white" href="#">
                        View details
                    </a>
                </div>
            </div>
        </div>
    );

}