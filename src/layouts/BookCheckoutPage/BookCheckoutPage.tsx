import { useEffect, useState } from "react";
import { BookModel } from "../../models/BookModel";
import { useParams } from "react-router-dom";
import { SpinnerLoading } from "../Utils/SpinnerLoading";
import { StarReview } from "../Utils/StarReview";
import { CheckoutAndReviewBox } from "./CheckoutAndReviewBox";
import { ReviewModel } from "../../models/ReviewModel";
import { LatestReviews } from "./LatestReviews";

export const BookCheckoutPage = () => {

    const [book, setBook] = useState<BookModel>();
    const [isLoadingBook, setIsLoadingBook] = useState(true);
    const [httpError, setHttpError] = useState(null);
    const { bookId } = useParams<any>();
    //Review state
    const [reviews, setReviews] = useState<ReviewModel[]>([]);
    const [totalStars, setTotalStars] = useState(0);
    const [isLoadingReview, setIsLoadingReview] = useState(true);

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

    useEffect(() => {
        const fetchBookReviews = async () => {
            const reviewUrl = `http://localhost:8080/api/reviews/search/findByBookId?bookId=${bookId}`;
            const responseReviews = await fetch(reviewUrl);
            if (!responseReviews.ok) {
                throw new Error('Something went wrong');
            }
            const responseJson = await responseReviews.json();
            const data = responseJson._embedded.reviews;

            const loadedReviews: ReviewModel[] = data.map((item: any) => ({
                id: item.id,
                userEmail: item.userEmail,
                date: item.date,
                rating: item.rating,
                bookId: item.bookId,
                reviewDescription: item.reviewDescription
            }))

            const weightedStarReviews = data.reduce((acc: number, curr: any) => curr.rating + acc, 0)
            
            if (loadedReviews.length > 0) {
                const round = (Math.round((weightedStarReviews / loadedReviews.length) * 2) / 2).toFixed(1);
                setTotalStars(Number(round));
            }
            setReviews(loadedReviews);
            setIsLoadingReview(false);
        }

        fetchBookReviews().catch((error: any) => {
            setIsLoadingReview(false);
            setHttpError(error.message);
        })
    }, []);

    if (isLoadingBook || isLoadingReview) {
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

    return (
        <div>
            <div className="container d-none d-lg-block">
                <div className="row mt-5">
                    <div className="col-sm-2 col-md-2">
                        {book?.img ?
                            <img src={book?.img} width='226' height={349} alt='book' />
                            :
                            <img src={require('./../../Images/BooksImages/book-luv2code-1000.png')} width='226' height={349} alt='book' />
                        }
                    </div>
                    <div className="col-4 col-md-4 container">
                        <div className="ml-2">
                            <h2>{book?.title}</h2>
                            <h5 className="text-primary">{book?.author}</h5>
                            <p className="lead">{book?.description}</p>
                            <StarReview rating={totalStars} size={32} />
                        </div>
                    </div>
                    <CheckoutAndReviewBox book={book} mobile={false} />
                </div>
                <hr />
                <LatestReviews reviews={reviews} bookId={book?.id} mobile={false} />
            </div>

            <div className="container d-lg-none mt-5">
                <div className="d-flex justify-content-center align-items-center">
                    {book?.img ?
                        <img src={book?.img} width='226' height={349} alt='book' />
                        :
                        <img src={require('./../../Images/BooksImages/book-luv2code-1000.png')} width='226' height={349} alt='book' />
                    }
                </div>
                <div className="mt-4">
                    <div className="ml-2">
                        <h2>{book?.title}</h2>
                        <h5 className="text-primary">{book?.author}</h5>
                        <p className="lead">{book?.description}</p>
                        <StarReview rating={totalStars} size={32} />
                    </div>
                </div>
                <CheckoutAndReviewBox book={book} mobile={true} />
                <hr />
                <LatestReviews reviews={reviews} bookId={book?.id} mobile={true} />
            </div>
        </div>
    );
}