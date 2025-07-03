import React from 'react';
import { IComment } from '../../../redux/types/comments';
import './CommentCard.css';

interface CommentCardProps {
  comment: IComment;
  songId: number;
  currentUser: any;
}

function CommentCard({ comment, songId, currentUser }: CommentCardProps) {
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

  return (
    <div className="comment-card">
      <div className="comment-header">
        <div className="comments">
          <span className="comment-author">{comment.User?.username}</span>
          <span> • </span>
          <span className="comment-date">{formatDate(comment.createdAt)}</span>
        </div>
      </div>

      <div className="comment-content">
        <p>{comment.comment}</p>
      </div>
    </div>
  );
}

export default CommentCard; 