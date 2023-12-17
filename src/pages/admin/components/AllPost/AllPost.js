import React, {useState, useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import './AllPost.css'
import MyEditor from '../../../../components/MyEditor';
import axios from 'axios';

function AllPost() {
    const [showEditor, setShowEditor] = useState(false);
    const [posts,setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedPost, setSelectedPost] = useState(null);
    const [page, setPage] = useState(1); // Trang hiện tại
    const pageSize = 5 // kích thước trang
    
    const handleCloseEditor = () => {
        setShowEditor(false);
    };
    const handlePostSubmitted = async () => {
        // Lấy danh sách bài viết đã cập nhật
        try {
          const response = await axios.get('http://localhost:8080/api/blog/posts');
          // Cập nhật trạng thái với dữ liệu mới
          setPosts(response.data);
        } catch (error) {
          console.error('Lỗi khi lấy danh sách bài viết đã cập nhật:', error.message);
        }
    };

    const handleEditClick = (post) => {
        // Lưu bài viết được chọn vào trạng thái và hiển thị trình soạn thảo
        setSelectedPost(post);
        setShowEditor(true);
        console.log(post);
      };

    const handleDeletePost = async (postId) =>{
        try {
            const response = await axios.delete(`http://localhost:8080/api/blog/posts/${postId}`);
            console.log(response.data); // Hiển thị thông báo xóa thành công hoặc lỗi
            // Cập nhật danh sách bài viết sau khi xóa
            handlePostSubmitted();
        } catch (error) {
            console.error('Lỗi khi xóa bài viết:', error.message);
        }
    }
    

    useEffect(() => {
    // Gửi yêu cầu GET đến API Endpoint /admin khi component được mount
    axios.get('http://localhost:8080/api/blog/posts')
        .then(response => {
        // Nếu yêu cầu thành công, cập nhật state với danh sách người dùng từ server
        setPosts(response.data);
        setLoading(false);
        })
        .catch(error => {
        console.error('Lỗi khi lấy danh sách người dùng:', error.message);
        setLoading(false);
        });    
    }, []); 

    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    // Lấy các người dùng cho trang hiện tại từ toàn bộ danh sách
    const postsForCurrentPage = posts.slice(startIndex, endIndex);
    const totalPageCount = Math.ceil(posts.length / pageSize);

    const click = ()=>{
        console.log(posts);
    }


    return ( 
        <>
            <div className='post-container'>
                <div className='post-content'>
                    <h3>Posts</h3>
                    <hr></hr>
                    <div className='btn-func'>
                        <div className='table-action'>
                            <input type="text" name="search-term" id="search-post-input" placeholder="Search..."/>
                        </div>
                        <div className='btn-content'>
                            <div class="table-buttons">
                                <a href="#" class="btn warning-btn small-btn" onClick={click}>
                                    <FontAwesomeIcon icon={faTrashAlt}/>
                                    Trash
                                </a>
                                <a href="#" class="btn primary-btn small-btn" onClick={() => setShowEditor(true)}>
                                    <FontAwesomeIcon icon={faPlus}/>
                                    Add Post
                                </a>
                            </div>
                        </div>
                                {showEditor && (<div className='popup'>
                                    <div style={{textAlign:'left', marginLeft:'2%', marginBottom:'1%'}}>
                                        <button className="close-button" onClick={() => setShowEditor(false)}>
                                            <FontAwesomeIcon icon={faTimes} />
                                        </button>
                                    </div>
                                    <MyEditor handleCloseEditor={handleCloseEditor} onPostSubmitted={handlePostSubmitted} selectedPost={selectedPost}/>
                                </div>)}

                    </div>
                    <div className='table-post'>
                        <table style={{border:'1px solid', width:'75%'}}>
                            <thead style={{border:'1px solid'}}>
                                <th>STT</th>
                                <th>AuthorID</th>
                                <th>Title</th>
                                <th>Summary</th>
                                <th>View</th>
                                <th>Publish</th>
                            </thead>
                            <tbody>
                            {postsForCurrentPage.map((post, index) => (
                                <tr key={startIndex+index} className='border-tr'>
                                    <td>{startIndex+index + 1}</td>
                                    <td>{post.author && post.author.firstName}</td>
                                    <td>
                                    <a href={post.link} target="_blank">
                                        {post.title}
                                    </a>
                                    <div className="td-action-links">
                                        <a href="#" className="trash">Trash</a>
                                        <span className="inline-divider">|</span>
                                        <a href="#" className="edit" onClick={()=>handleEditClick(post)}>Edit</a>
                                        <span className="inline-divider">|</span>
                                        <a href="#" className="edit">Related Posts</a>
                                    </div>
                                    </td>
                                    
                                    <td>{post.summary}</td> 
                                    <td>{post.views}</td>
                                    <td>
                                        <a href={post.publishLink}>
                                            {post.published ? 'Publish' : 'Unpublish'}
                                        </a>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                            <tfoot>
                                <td colspan="6">
                                    <div className="pagination-links">
                                        {[...Array(totalPageCount).keys()].map(num => (
                                        <a
                                            key={num + 1}
                                            href={`#${num + 1}`}
                                            className={num + 1 === page ? "link active" : "link"}
                                            onClick={() => setPage(num + 1)}
                                        >
                                            {num + 1}
                                        </a>
                                        ))}
                                    </div>
                                </td>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </div>
        </>
     );
}

export default AllPost