import React from "react";
import { ReviewModel } from "../../models/ReviewModel";
import { StarReview } from "./StarReview";

interface Props {
    review: ReviewModel
}

export const Review: React.FC<Props> = ({ review }) => {

    const date = new Date(review.date);

    const longMonth = date.toLocaleString('en-us', { month: 'long' });
    const dateDay = date.getDay();
    const dateYear = date.getFullYear();

    const dateRender = `${longMonth} ${dateDay}, ${dateYear}`;

    return (
        <>
            <div className="col-sm-8 col-md-8">
                <h5>{review.userEmail}</h5>
                <div className="row">
                    <div className="col">
                        {dateRender}
                    </div>
                    <div className="col">
                        <StarReview rating={review.rating} size={16} />
                    </div>
                </div>
                <div className="mt-2">
                    <p>
                        {review.reviewDescription}
                    </p>
                </div>
            </div>
            <hr />
        </>
    );
}