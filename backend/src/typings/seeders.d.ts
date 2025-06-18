
export interface OptionsInterface {
    schema?: string;
    tableName?: string;
}


export interface User {
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    hashedPassword: string;
}

export interface Song {
    ownerId: number;
    title: string;
    description?: string;
    previewImage?: string;
    filepath: string;
    duration?: number;
}

export interface Comment {
    userId: number;
    songId: number;
    comment: string;
}