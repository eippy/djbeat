export interface IComment {
  id: number;
  userId: number;
  songId: number;
  comment: string;
  User?: {
    id: number;
    username: string;
  };
  Song?: {
    id: number;
    title: string;
  };
  createdAt?: string;
  updatedAt?: string;
}

export interface ICreateComment {
  songId: number;
  comment: string;
}

export interface ICommentState {
  byId: {
    [id: number]: IComment;
  };
  allComments: IComment[];
}

export interface IActionCreator {
  type: string;
  payload: any;
}
