import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteCommentThunk } from '../../redux/comments';
import { useModal } from '../../context/Modal';

interface DeleteCommentModalProps {
  commentId: number;
}

function DeleteCommentModal({ commentId }: DeleteCommentModalProps) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

    const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
    await dispatch(deleteCommentThunk(commentId));
    closeModal();
  };

  return (
    <div>
      <h2>Delete Comment</h2>
      <p>Are you sure you want to delete this comment?</p>
      <div>
        <button onClick={handleDelete} >Delete</button>
        <button onClick={closeModal} >Cancel</button>
      </div>
    </div>
  );
}

export default DeleteCommentModal;
