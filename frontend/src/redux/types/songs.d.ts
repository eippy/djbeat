export interface ISong {
    id: number;
    ownerId?: number;
    title: string;
    description: string;
    duration: number;
    filepath: string;
    previewImage: string;
    User?: {
        id: number;
        username: string;
    };
    createdAt?: string;
    updatedAt?: string;
}

export interface ICreateSong {
    title: string;
    description: string;
    previewImage: string;
    songUrl: string;
}

export interface IDeleteSong {
    id: number;
}

export interface ISongState {
    byId: {
        [id: number]: ISong
    }
    allSongs: ISong[];
    currentSong: ISong | null;
}

export interface IActionCreator {
    type: string;
    payload: any;
}