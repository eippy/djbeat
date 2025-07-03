import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCommentsBySongThunk, createCommentThunk } from '../../redux/comments';
import { RootState } from '../../redux/store';
import CommentCard from './CommentCard';
import './CommentsList.css';

interface CommentsListProps {
  songId: number;
}

function CommentsList({ songId }: CommentsListProps) {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [comment, setComment] = useState('');
  const comments = useSelector((state: RootState) => state.comments.allComments);
  const user = useSelector((state: RootState) => state.session.user);

  useEffect(() => {
    const loadComments = async () => {
      await dispatch(getCommentsBySongThunk(songId));
      setIsLoaded(true);
    };
    loadComments();
  }, [dispatch, songId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    try {
      await dispatch(createCommentThunk({
        songId,
        comment: comment.trim()
      }));
      setComment('');
    } catch (error) {
      console.error('Failed to create comment:', error);
    }
  };

  if (!isLoaded) {
    return <div className="comments-loading">Loading comments...</div>;
  }

  return (
    <div className="comments-container">
      <h3>Comments ({comments.length})</h3>

      {/* Always Visible Comment Form */}
      {user && (
        <div className="comment-form-section">
          <form onSubmit={handleSubmit} className="comment-form">
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your thoughts about this song..."
              maxLength={1000}
              rows={3}
            />
            <div className="form-footer">
              <button 
                type="submit" 
                disabled={!comment.trim()}
                className="post-button"
              >
                Post Comment
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Comments List */}
      <div className="comments-list">
        {comments.length === 0 ? (
          <div className="no-comments">
            <p>No comments yet. Be the first to share your thoughts!</p>
          </div>
        ) : (
          comments.map(comment => (
            <CommentCard 
              key={comment.id} 
              comment={comment} 
              songId={songId}
              currentUser={user}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default CommentsList; 