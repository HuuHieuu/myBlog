import React, {useState, useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import './AllPost.css'
import MyEditor from '../../../../components/MyEditor';
import axios from 'axios';
import Topic from '../Topic/Topic';

function AllPost() {
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
                const response = await axios.get('http://localhost:8080/api/blog/posts');
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
      console.log('Selected Post:', selectPosts);
    };

    const handleSearchByCategory = () => {
        axios.get(`http://localhost:8080/api/blog/posts/category/${categoryId}`)
          .then(response => {
            setSearchResults(response.data);
          })
          .catch(error => {
            console.error('Error fetching posts by category:', error.message);
            setSearchResults([]);
          });
      };
    
      const handleSearchByAuthor = () => {
        axios.get(`http://localhost:8080/api/blog/posts/author/${authorId}`)
          .then(response => {
            setSearchResults(response.data);
          })
          .catch(error => {
            console.error('Error fetching posts by author:', error.message);
            setSearchResults([]);
          });
      };

    return ( 
        <>
        <div hidden={true}>
            <Topic categoryIds={categoryId} />
        </div>
            <div className='post-container'>
                <div className='post-content'>
                    <h3>Posts</h3>
                    <hr></hr>
                    <div className='btn-func'>
                        <div className='table-action'>
                        <button onClick={handleSearchButtonClick}
                            className='search-css-btn'
                        >
                            Search
                        </button>
                        {showSearchOptions && (
                            <div>
                                {/* keyword */}
                            <input type="text" name="search-term" id="search-post-input" placeholder="Search..." value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} />
                            <button
                                style={{margin:'0', width:'7%',backgroundColor:'transparent', color:'black',opacity:'1'}}
                                onClick={handleSearch}
                                onMouseOver={(e) => e.target.style.opacity = '0.7'} // Hover effect
                                onMouseOut={(e) => e.target.style.opacity = '1'}
                                >Search</button>
                            {/* author */}
                            <input type="text" name="search-by-author" id="search-post-input" placeholder="Search by authorId..." value={authorId} onChange={(e)=>setAuthorId(e.target.value)} />
                            <button
                                style={{margin:'0', width:'7%',backgroundColor:'transparent', color:'black',opacity:'1'}}
                                onClick={handleSearchByAuthor}
                                onMouseOver={(e) => e.target.style.opacity = '0.7'} // Hover effect
                                onMouseOut={(e) => e.target.style.opacity = '1'}
                                >Search</button>
                            {/* category */}
                            <input type="text" name="search-by-category" id="search-post-input" placeholder="Search by categoryId..." value={categoryId} onChange={(e)=>setCategoryId(e.target.value)} />
                            <button
                                style={{margin:'0', width:'7%',backgroundColor:'transparent', color:'black',opacity:'1'}}
                                onClick={handleSearchByCategory}
                                onMouseOver={(e) => e.target.style.opacity = '0.7'} // Hover effect
                                onMouseOut={(e) => e.target.style.opacity = '1'}
                                >Search</button>
                            </div>
                        )}
                            
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
                                {showEditor && (
                                <div className='popup'>
                                    <div style={{textAlign:'left', marginLeft:'2%', marginBottom:'1%'}}>
                                        <button className="close-button" onClick={() => setShowEditor(false)}>
                                            <FontAwesomeIcon icon={faTimes} />
                                        </button>
                                    </div>
                                    <MyEditor handleCloseEditor={handleCloseEditor} onPostSubmitted={handlePostSubmitted} selectedPost={selectedPost}/>
                                </div>)}

                    </div>
                    {/* search by keyword */}
                    {searchResults ? (
                        <div className="table-post">
                            <table style={{ border: '1px solid', width: '75%' }}>
                                <thead>
                                    <tr>
                                        <th>PostId</th>
                                        <th>AuthorID</th>
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
                                        <td>{post.author && post.author.firstName ? post.author.id : post.author}</td>
                                        <td>{post.title}</td>
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
                        </table>
                        </div>
                    ): (
                    <div className='table-post'>
                        <table style={{border:'1px solid', width:'75%'}}>
                            <thead style={{border:'1px solid'}}>
                                <th>PostId</th>
                                <th>AuthorID</th>
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
                                    <td>{post.author && post.author.firstName ? post.author.id : post.author}</td>
                                    <td>
                                    <a href={post.link} target="_blank">
                                        {post.title}
                                    </a>
                                    <div className="td-action-links">
                                        <a href="#" className="trash" onClick={()=>handleDeleteClick(post.id)}>Trash</a>
                                        <span className="inline-divider">|</span>
                                        <a href="#" className="edit" onClick={()=>handleEditClick(post)}>Edit</a>
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
                    )}
                </div>
            </div>
        </>
     );
}

export default AllPost