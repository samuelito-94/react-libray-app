export class ReviewModel {

    constructor(
        private _id: number,
        private _userEmail: string,
        private _date: string,
        private _rating: number,
        private _bookId: number,
        private _reviewDescription: string
    ) {

    }

    public get reviewDescription(): string {
        return this._reviewDescription;
    }
    public set reviewDescription(value: string) {
        this._reviewDescription = value;
    }
    public get bookId(): number {
        return this._bookId;
    }
    public set bookId(value: number) {
        this._bookId = value;
    }
    public get rating(): number {
        return this._rating;
    }
    public set rating(value: number) {
        this._rating = value;
    }
    public get date(): string {
        return this._date;
    }
    public set date(value: string) {
        this._date = value;
    }
    public get userEmail(): string {
        return this._userEmail;
    }
    public set userEmail(value: string) {
        this._userEmail = value;
    }
    public get id(): number {
        return this._id;
    }
    public set id(value: number) {
        this._id = value;
    }
}