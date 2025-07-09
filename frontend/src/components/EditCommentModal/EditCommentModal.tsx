import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateCommentThunk } from '../../redux/comments';
import { useModal } from '../../context/Modal';
import { IComment } from '../../redux/types/comments';
import './EditCommentModal.css'

interface EditCommentModalProps {
  comment: IComment;
}

function EditCommentModal({ comment }: EditCommentModalProps) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [text, setText] = useState(comment.comment);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) {
      setError('Comment cannot be empty');
      return;
    }
    try {
      await dispatch(updateCommentThunk(comment.id, text.trim()));
      closeModal();
    } catch (err) {
      setError('Failed to update comment');
    }
  };

  return (
    <div className='edit-comment-container'>
      <h2 className='edit-comment-title'>Edit Comment</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          className='edit-textarea'
          value={text}
          onChange={e => setText(e.target.value)}
          maxLength={1000}
          rows={4}
        />
        {error && <div className='error'>{error}</div>}
        <div>
          <button type="submit" className='edit-confirm-button'>Update</button>
          <button type="button" onClick={closeModal} className='edit-cancel-button'>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default EditCommentModal;
