import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCommentsThunk, createCommentThunk } from '../../redux/comments';
import { RootState } from '../../redux/store';
import CommentCard from './CommentCard';
import './CommentList.css';

interface CommentListProps {
  songId: number | undefined;
}

function CommentList({ songId }: CommentListProps) {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [comment, setComment] = useState('');
  const comments = useSelector((state: RootState) => state.comments.allComments);
  const user = useSelector((state: RootState) => state.session.user);

  useEffect(() => {
    if (songId) {
      const loadComments = async () => {
        await dispatch(getAllCommentsThunk(songId));
        setIsLoaded(true);
      };
      loadComments();
    }
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
  
  if (!songId) return null;
  if (!isLoaded) {
    return <div>Loading comments...</div>;
  }
  const userComment = comments.find(
    (comment) => user && comment.userId === user.id
  );

  return (
    <div className="comments-container">
      <h3>Comments ({comments.length})</h3>

      {user && (
        <div className="comment-form-section">
          <form onSubmit={handleSubmit} className="comment-form">
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your thoughts about this song"
              maxLength={1000}
              rows={3}
            />
            <div className="form-footer">
              <button 
                type="submit" 
                disabled={!comment.trim() || !!userComment}
                className="post-button"
              >
                Post Comment
              </button>
            </div>
          </form>
        </div>
      )}

      
      <div className="comments-list">
        {comments.length === 0 ? (
          <div>
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

export default CommentList; 