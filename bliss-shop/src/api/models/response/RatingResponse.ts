import UserResponse from "./UserResponse";

interface RatingResponse {
    id: string;
    rate: number;
    comment: string;
    user: UserResponse;
}

export default RatingResponse;