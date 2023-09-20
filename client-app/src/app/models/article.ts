import { Profile } from "./profile"

export interface Article {
    artID: string
    title: string
    content: string
    createDate: string
    category: string
    authorName: string
    authorPhoto?: string
    myFav?: Boolean
    isauthor?: Boolean
    favoriteBy?: Profile[]
}
