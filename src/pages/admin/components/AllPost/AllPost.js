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
    const handleCloseEditor = () => {
        setShowEditor(false);
    };

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
    const click =() =>{
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
                                    <MyEditor handleCloseEditor={handleCloseEditor}/>
                                </div>)}

                    </div>
                    <div className='table-post'>
                        <table style={{border:'1px solid', width:'75%'}}>
                            <thead style={{border:'1px solid'}}>
                                <th>STT</th>
                                <th>AuthorID</th>
                                <th>Title</th>
                                <th>Summary</th>
                                <th>Publish</th>
                            </thead>
                            <tbody>
                            {posts.map((post, index) => (
                                <tr key={index} className='border-tr'>
                                    <td>{index + 1}</td>
                                    <td>{post.author && post.author.firstName}</td>
                                    <td>
                                    <a href={post.link} target="_blank">
                                        {post.title}
                                    </a>
                                    <div className="td-action-links">
                                        <a href="#" className="trash">Trash</a>
                                        <span className="inline-divider">|</span>
                                        <a href="#" className="edit">Edit</a>
                                        <span className="inline-divider">|</span>
                                        <a href="#" className="edit">Related Posts</a>
                                    </div>
                                    </td>
                                    
                                    <td>{post.summary}</td> 
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
                                <div class="pagination-links">
                                    <a href="#" class="link active">1</a>
                                    <a href="#" class="link">2</a>
                                    <a href="#" class="link">3</a>
                                    <a href="#" class="link">4</a>
                                    <a href="#" class="link">5</a>
                                    <a href="#" class="link">6</a>
                                    <a href="#" class="link">7</a>
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