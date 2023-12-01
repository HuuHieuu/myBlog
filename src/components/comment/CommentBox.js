// CommentBox.jsx
import React, { useState } from 'react';
import { useUserContext } from '../Context/UserContext';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import './styles.css'

function CommentBox() {
  const [comments, setComments] = useState([]);
  const { user: currentUser } = useUserContext();


  function handleAddComment(newComment) {
    setComments([...comments, {user:currentUser ,text: newComment }]);
  }

  return (
    <div className="comment-box">
      <CommentForm onAddComment={handleAddComment} />
      <CommentList comments={comments} />
    </div>
  );
}

export default CommentBox;
