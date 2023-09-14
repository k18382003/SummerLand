import { Photos } from "./photos";

export interface Profile {
    displayName: string,
    userName: string,
    image?: string,
    bio?: string,
    photos?: Photos[]
}