export interface Photos {
    photoId: string,
    url: string,
    isMain: boolean
}

export interface PhotoUploadResult {
    name: string,
    uri: string,
    contentType: string,
    isMain: boolean
}