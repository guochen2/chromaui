import { type ValidationError } from "../../interface";

export interface HttpValidationError {
    detail?: ValidationError[];
}
