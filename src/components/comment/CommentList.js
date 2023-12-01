// CommentList.jsx
import React from 'react';
import Comment from './Comment';
import './styles.css'

function CommentList({ comments }) {
  return (
    <div className="comment-list">
      <h3>Comments:</h3>
      <ul>
        {comments.map((comment, index) => (
          <Comment key={index} user={comment.user} text={comment.text} />
        ))}
      </ul>
    </div>
  );
}

export default CommentList;
