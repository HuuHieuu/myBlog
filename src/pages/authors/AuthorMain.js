import React,{useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import TopButton from "../../components/TopButton"; 
import PostCardList from "../../components/PostCardList";
function AuthorMain(){
    const [userPosts, setUserPosts] = useState([]);
    const navigate = useNavigate();
    const displayMode = 'authorProfile'

    // useEffect(() => {
    //     const fetchUserPosts = async () => {
    //         try {
    //           // Gọi API để lấy thông tin người dùng
    //           const userInfoResponse = await axios.get("http://localhost:8080/api/blog/users/info");
    //           const authorId = userInfoResponse.data.id;
    //           console.log(authorId)
      
    //           // Gọi API để lấy danh sách bài viết của người dùng
    //           const userPostsResponse = await axios.get(`http://localhost:8080/api/blog/posts/author/${authorId}`);
    //           setUserPosts(userPostsResponse.data);
    //           console.log(userPosts)
    //         } catch (error) {
    //           console.error('Error fetching user posts:', error.message);
    //           setUserPosts([]);
    //         }
    //       };
    //     fetchUserPosts();
    //   }, []);
    useEffect(() => {
        const fetchUserPosts = async () => {
          try {
            // Gọi API để lấy thông tin người dùng
            const userInfoResponse = await axios.get("http://localhost:8080/api/blog/users/info");
            const authorId = userInfoResponse.data.id;
      
            // Gọi API để lấy danh sách bài viết của người dùng
            const userPostsResponse = await axios.get(`http://localhost:8080/api/blog/posts/author/${authorId}`);
            
            // Lọc những bài viết đã xuất bản
            const publishedUserPosts = userPostsResponse.data.filter(post => post.published);
      
            // Set state chỉ với những bài viết đã xuất bản
            setUserPosts(publishedUserPosts);
          } catch (error) {
            console.error('Error fetching user posts:', error.message);
            setUserPosts([]);
          }
        };
      
        fetchUserPosts();
      }, []);
      

    return(
        <div className="container px-4 px-lg-5">
            <div className="row gx-4 gx-lg-5 justify-content-center">
                <h1>Các Bài Viết</h1>
                <div className="col-md-9">
                    <PostCardList displayMode={displayMode} postsByAuthorprofile={userPosts}/>
                </div>
            </div>
            <TopButton/>
        </div>
    );
}

export default AuthorMain;