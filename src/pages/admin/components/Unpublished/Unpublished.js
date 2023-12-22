import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import '../AllPost/AllPost.css'
import MyEditor from '../../../../components/MyEditor';
import axios from 'axios';
import Topic from '../Topic/Topic';

function Unpublished() {
    const [showEditor, setShowEditor] = useState(false);
    const [posts,setPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);
    const [selectPosts, setSelectPosts] = useState(null);
    const [page, setPage] = useState(1); // Trang hiện tại
    const pageSize = 5 // kích thước trang
    const [searchTerm, setSearchTerm] = useState('');
    const [showSearchOptions, setShowSearchOptions] = useState(false);
    const [authorId, setAuthorId] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [searchResults, setSearchResults] = useState(null);
    const [resetEditor, setResetEditor] = useState(false);
    const [ispublished,setIspublished] = useState(false);
    const navigate = useNavigate();
    
    const handlePublish = async (postId) => {
        const currentDateTime = new Date();
        try {
            const token = localStorage.getItem('accessToken');
            const headers = {
                "Authorization": `Bearer ${token}`,
            };
    
            // Gọi API để publish bài viết
            await axios.post(`http://localhost:8080/api/blog/posts/admin/publish/${postId}`, {}, { headers });
    
            // Cập nhật trạng thái của bài viết trong danh sách state của bạn
            const updatedPosts = posts.map(post => {
                if (post.id === postId) {
                    return { 
                        ...post,
                        published: true ,
                        publishedAt: currentDateTime.toISOString(),    
                    };
                }
                return post;
            });
            setPosts(updatedPosts);
            console.log(posts)

    
            alert(`Đã publish bài viết id ${postId}`);
            handlePostSubmitted()
        } catch (error) {
            console.error('Lỗi khi publish bài viết:', error.message);
        }
    };

    const handleTitleClick=(id)=>{
        navigate(`/posts/${id}`);
    }

    const handleAddClick = () =>{
        setShowEditor(true);
        setResetEditor(true);
    }
    const handleCloseEditor = () => {
        setShowEditor(false);
    };
    const handlePostSubmitted = async () => {
        // Lấy danh sách bài viết đã cập nhật
        try {
          const response = await axios.get('http://localhost:8080/api/blog/posts/notpublised');
          // Cập nhật trạng thái với dữ liệu mới
          setPosts(response.data);
        } catch (error) {
          console.error('Lỗi khi lấy danh sách bài viết đã cập nhật:', error.message);
        }
    };

    const handleEditClick = (post) => {
        // Lưu bài viết được chọn vào trạng thái và hiển thị trình soạn thảo
        setSelectedPost(post);
        setSelectPosts(post.categories)
        setShowEditor(true);
        console.log(post);
      };

    const handleDeleteClick = async (postId) => {
        const confirmed = window.confirm("Bạn có chắc chắn muốn xóa bài viết này?");
        if (!confirmed) {
            return;
        }
    
        try {
            const token = localStorage.getItem('accessToken');
            const headers = {
                "Authorization": `Bearer ${token}`,
            };
    
            await axios.delete(`http://localhost:8080/api/blog/posts?postid=${postId}`, { headers });
            alert(`Đã xóa bài viết id ${postId}`);
            // Refresh danh sách bài viết sau khi xóa
            const response = await axios.get('http://localhost:8080/api/blog/posts');
            setPosts(response.data);
        } catch (error) {
            console.error('Lỗi khi xóa bài viết:', error.message);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/blog/posts/notpublised');
                setPosts(response.data);
            } catch (error) {
                console.error('Error fetching data:', error.message);
            }
        };
    
        fetchData();
    }, []);
    

    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    // Lấy các người dùng cho trang hiện tại từ toàn bộ danh sách
    const postsForCurrentPage = posts.slice(startIndex, endIndex);
    const totalPageCount = Math.ceil(posts.length / pageSize);

    const click = ()=>{
        console.log(posts);
    }
    const handleSearchButtonClick = () => {
        setShowSearchOptions(!showSearchOptions);
      };

    const handleSearch = () => {

        axios.get(`http://localhost:8080/api/blog/posts/keyword/${searchTerm}`)
      .then(response => {
        setSearchResults(response.data);
      })
      .catch(error => {
        console.error('Error fetching user by ID:', error.message);
        setSearchResults(null);
      });
    //   console.log('Selected Post:', selectPosts);
    };


    return ( 
        <>
        <div hidden={true}>
            <Topic categoryIds={categoryId} />
        </div>
            <div className='post-container'>
                <div className='post-content'>
                    <h3>Unpublished</h3>
                    <hr></hr>
                    <div className='btn-func'>
                        <div className='table-action'>
                            <input type="text" name="search-term" id="search-post-input" placeholder="Search..." value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} />
                            <button
                                style={{margin:'0', width:'7%',backgroundColor:'transparent', color:'black',opacity:'1'}}
                                onClick={handleSearch}
                                onMouseOver={(e) => e.target.style.opacity = '0.7'} // Hover effect
                                onMouseOut={(e) => e.target.style.opacity = '1'}
                                >Search</button>
                        </div>
                        <div className='btn-content'>
                            <div class="table-buttons">
                                {/* <a href="#" class="btn warning-btn small-btn" onClick={click}>
                                    <FontAwesomeIcon icon={faTrashAlt}/>
                                    Trash
                                </a> */}
                                <a href="#" class="btn primary-btn small-btn" onClick={handleAddClick}>
                                    <FontAwesomeIcon icon={faPlus}/>
                                    Add Post
                                </a>
                            </div>
                        </div>
                                {showEditor && (
                                <div className='popup'>
                                    <div style={{textAlign:'left', marginLeft:'2%', marginBottom:'1%'}}>
                                        <button className="close-button" onClick={() => setShowEditor(false)}>
                                            <FontAwesomeIcon icon={faTimes} />
                                        </button>
                                    </div>
                                    <MyEditor handleCloseEditor={handleCloseEditor} onPostSubmitted={handlePostSubmitted} selectedPost={selectedPost} initialCategoryIds={selectPosts} resetEditor={resetEditor} isPublished={ispublished}/>
                                </div>)}

                    </div>
                    {/* search by keyword */}
                    {searchResults ? (
                        <div className="table-post">
                            <table style={{ border: '1px solid', width: '75%' }}>
                                <thead>
                                    <tr>
                                        <th>PostId</th>
                                        <th>AuthorName</th>
                                        <th>Title</th>
                                        <th>Summary</th>
                                        <th>View</th>
                                        <th>Publish</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {searchResults.map((post, index) => (
                                    <tr key={index}>
                                        <td>{post.id}</td>
                                        <td>{post.author && post.author.firstName}</td>
                                        <td  href={post.link} target="_blank" onClick={()=>handleTitleClick(post.id)} style={{cursor:'pointer'}}>{post.title}</td>
                                        <td>{post.summary}</td>
                                        <td>{post.views}</td>
                                        <td>
                                        <div>
                                            <a style={{color:'red', cursor:'pointer', opacity:'1'}}
                                                onClick={()=>handlePublish(post.id)}
                                                onMouseOver={(e) => e.target.style.opacity = '0.7'}
                                                onMouseOut={(e) => e.target.style.opacity = '1'} 
                                            >publish</a>
                                        </div>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                        </table>
                        </div>
                    ): (
                    <div className='table-post'>
                        <table style={{border:'1px solid', width:'75%'}}>
                            <thead style={{border:'1px solid'}}>
                                <th>PostId</th>
                                <th>AuthorName</th>
                                <th>Title</th>
                                <th>Summary</th>
                                <th>View</th>
                                <th>Publish</th>
                            </thead>
                            <tbody>
                            {postsForCurrentPage.map((post, index) => (
                                <tr key={startIndex+index} className='border-tr'>
                                    <td>{post.id}</td>
                                    {/* <td>{post.author && post.author.firstName}</td> */}
                                    <td>{post.author && post.author.firstName}</td>
                                    <td>
                                    <a href={post.link} target="_blank" onClick={()=>handleTitleClick(post.id)} style={{cursor:'pointer'}}>
                                        {post.title}
                                    </a>
                                    <div className="td-action-links">
                                        {/* <a className="trash" onClick={()=>handleDeleteClick(post.id)}>Trash</a>
                                        <span className="inline-divider">|</span> */}
                                        <a className="edit" onClick={()=>handleEditClick(post)}>Edit</a>
                                    </div>
                                    </td>
                                    
                                    <td>{post.summary}</td> 
                                    <td>{post.views}</td>
                                    <td>
                                        {/* <a href={post.publishLink}>
                                            {post.published ? 'Publish' : 'Unpublish'}
                                        </a> */}
                                        <div>
                                            <a style={{color:'red', cursor:'pointer', opacity:'1'}}
                                                onClick={()=>handlePublish(post.id)}
                                                onMouseOver={(e) => e.target.style.opacity = '0.7'}
                                                onMouseOut={(e) => e.target.style.opacity = '1'} 
                                            >publish</a>
                                        </div>
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
                    )}
                </div>
            </div>
        </>
     );
}

export default Unpublished