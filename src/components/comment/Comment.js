import { useState } from "react";
import './styles.css'

function Comment({user, text}) {
   return (
   <div>
      <li className="comment-container">
      {user && user.avatar && (
        <div className="avatar">
          <img src={user.avatar} alt="Avatar" />
        </div>
      )}
      <div className="comment">{text}</div>
    </li>
   </div>
   )
}

export default Comment;