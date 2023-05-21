export interface User {
    userName : string;
    displayName : string;
    token : string;  
    image? : string;
}

export interface UserFormValue {
    email : string;
    password : string;
    Displayname? : string;
    username? : string;
}