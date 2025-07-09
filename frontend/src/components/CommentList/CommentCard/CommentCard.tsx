import React from 'react';
import { IComment } from '../../../redux/types/comments';
import OpenModalButton from '../../OpenModalButton';
import EditCommentModal from '../../EditCommentModal';
import DeleteCommentModal from '../../DeleteCommentModal';
import './CommentCard.css';

interface CommentCardProps {
  comment: IComment;
  songId: number;
  currentUser: any;
}

function CommentCard({ comment, currentUser }: CommentCardProps) {
  const formatDate = (dateString: string | undefined) => {
    if (!dateString) {
      return 'date not available';
    }
    const date = new Date(dateString);
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${month} ${year}`;
  };

  const isOwner = currentUser && currentUser.id === comment.userId;

  return (
    <div className="comment-card">
      <div className="comment-header">
        <div className="comment-author-info">
          <span className="comment-author">{comment.User?.username}</span>
          <span> • </span>
          <span className="comment-date">{formatDate(comment.createdAt)}</span>
        </div>
        {isOwner && (
          <div className="comment-actions">
            <OpenModalButton
              buttonText="Edit"
              modalComponent={<EditCommentModal comment={comment} />}
            />
            <OpenModalButton
              buttonText="Delete"
              modalComponent={<DeleteCommentModal commentId={comment.id} />}
            />
          </div>
        )}
      </div>
      <div className="comment-content">
        <p>{comment.comment}</p>
      </div>
    </div>
  );
}

export default CommentCard; 