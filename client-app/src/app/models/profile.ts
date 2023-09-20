import { Photos } from "./photos";

export interface Profile {
    displayName: string,
    userName: string,
    image?: string,
    bio?: string,
    photos?: Photos[],
    followers?: number,
    followings?: number,
    articles?: number,
    following?: boolean
}

export interface BioValue {
    displayName: string,
    bio: string
}