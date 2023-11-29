// CommentBox.jsx
import React, { useState } from 'react';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import './styles.css'

function CommentBox() {
  const [comments, setComments] = useState([]);

  function handleAddComment(newComment) {
    setComments([...comments, { text: newComment }]);
  }

  return (
    <div className="comment-box">
      <CommentForm onAddComment={handleAddComment} />
      <CommentList comments={comments} />
    </div>
  );
}

export default CommentBox;
