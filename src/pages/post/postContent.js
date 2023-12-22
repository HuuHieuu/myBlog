// // Trong file PostContent.js
// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import Navbar from '../../components/Navbar';
// import CardMedia from '@mui/material/CardMedia';
// import styles from './postContent.module.scss'
// import { format } from 'date-fns';

// const PostContent = () => {
//   const { postId } = useParams();
//   const [post, setPost] = useState(null);

//   useEffect(() => {
//     const fetchPost = async () => {
//       try {
//         const response = await axios.get(`http://localhost:8080/api/blog/posts/${postId}`);
//         setPost(response.data);
//       } catch (error) {
//         console.error('Error fetching post:', error.message);
//       }
//     };

//     fetchPost();
//   }, [postId]);

//   if (!post) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <Navbar/>
//       {/* <div className={styles.masthead} style={{position:'relative'}}>
//         <CardMedia
//           sx={{height: 600}}
//           image={post.thumbnail}
//         />
//         <div className={styles.ckDivHeader}>
//           <h3 className={styles.ckH1}>{post.title}</h3>
//           <h1 className={styles.ckH1}>{post.metaTitle}</h1>
//           <span className={styles.ckH1}>
//             Posted by: 
//             <a> {post.author.firstName} </a>
//             on {format(new Date(post.publishedAt), 'dd/MM/yyyy HH:mm')}
//           </span>
//         </div>
//         <div className={styles.ckDiv}
//           style={{margin:'20px 10%', textAlign:'justify'}}
//           dangerouslySetInnerHTML={{ __html: post.content }} />
//       </div> */}

//     <header className="masthead" >
//       <div className="container position-relative px-4 px-lg-5">        
//         <div className="row gx-4 gx-lg-5 justify-content-center">
//           <div className="col-md-10 col-lg-8 col-xl-7">
//             <div className="post-heading">
//               <h3>{post.title}</h3>
//               <h1>Man must explore, and this is exploration at its greatest</h1>
//               <h2 className="subheading">Problems look mighty small from 150 miles up</h2>
//               <span className="meta">
//                 Posted by
//                 <a href="#!">Start Bootstrap</a>
//                 on August 24, 2023
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </header>
//     </div>
//   );
// };

// export default PostContent;

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import { format } from 'date-fns';

const PostContent = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/blog/posts/${postId}`);
        setPost(response.data);
        console.log('Post:', response.data);
      } catch (error) {
        console.error('Error fetching post:', error.message);
      }
    };

    fetchPost();
  }, [postId]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      <header className="masthead" style={{ backgroundImage: `url(${encodeURI(post.thumbnail)})` }}>
        <div className="container position-relative px-4 px-lg-5">
          <div className="row gx-4 gx-lg-5 justify-content-center">
            <div className="col-md-10 col-lg-8 col-xl-7">
              <div className="post-heading">
                <h3>{post.categoryList.map(category => category.title).join(', ')}</h3>
                <h1>{post.title}</h1>
                <h2 className="subheading">{post.subtitle}</h2>
                <span className="meta">
                  Posted by <a href="#!">{post.author && post.author.firstName}</a> on {format(new Date(post.createdAt), 'dd/MM/yyyy HH:mm')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>
      <article className="mb-4">
        <div className="container px-4 px-lg-5">
          <div className="row gx-4 gx-lg-5 justify-content-center">
            <div className="col-md-10 col-lg-8 col-xl-7">
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default PostContent;
