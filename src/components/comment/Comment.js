import { useState } from "react";
import './styles.css'

function Comment({text}) {
   return <li className="comment">{text}</li>
}

export default Comment;