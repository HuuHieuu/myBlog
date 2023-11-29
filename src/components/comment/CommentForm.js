import { useUserContext } from '../Context/UserContext';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css'
function CommentForm({ onAddComment }) {
  const { isLoggedIn } = useUserContext();
  const navigate = useNavigate();
  const [comment, setComment] = useState('');

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  }

  const handleAddComment = () => {
    if (comment.trim() !== '') {
      onAddComment(comment);
      setComment('');
    }
  }

  const handleLoginClick = () => {
    navigate('/login')
  };

  return (
    <div className="comment-form">
      <h3>Add a Comment:</h3>
      {isLoggedIn ? (
        <>
          <textarea
            rows="4"
            cols="50"
            placeholder="Write your comment here..."
            value={comment}
            onChange={handleCommentChange}
          />
          <button onClick={handleAddComment}>Add Comment</button>
        </>
      ) : (
        <div className="login-placeholder" onClick={handleLoginClick}>
          Đăng nhập để bình luận
        </div>
      )}
    </div>
  );
}

export default CommentForm;
