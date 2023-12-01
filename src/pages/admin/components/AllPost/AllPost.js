import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import './AllPost.css'
function AllPost() {
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
                                <a href="#" class="btn warning-btn small-btn">
                                    <FontAwesomeIcon icon={faTrashAlt}/>
                                    Trash
                                </a>
                                <a href="#" class="btn primary-btn small-btn">
                                    <FontAwesomeIcon icon={faPlus}/>
                                    Add Post
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className='table-post'>
                        <table style={{border:'1px solid', width:'75%'}}>
                            <thead style={{border:'1px solid'}}>
                                <th>STT</th>
                                <th>Author</th>
                                <th>Title</th>
                                <th>Topic</th>
                                <th>Views</th>
                                <th>Publish</th>
                            </thead>
                            <tbody>
                                <tr className='border-tr'>
                                    <td>1</td>
                                    <td>Awa Melvine</td>
                                    <td>
                                        <a href="#" target="_blank">
                                        This is the first post
                                        </a>
                                        <div class="td-action-links">
                                        <a href="#" class="trash">Trash</a>
                                        <span class="inline-divider">|</span>
                                        <a href="#" class="edit">Edit</a>
                                        <span class="inline-divider">|</span>
                                        <a href="#" class="edit">Related Posts</a>
                                        </div>
                                    </td>
                                    <td>Self-Help</td>
                                    <td>1,000</td>
                                    <td>
                                        <a href="#">
                                        Publish
                                        </a>
                                    </td>
                                </tr>
                                <tr className='border-tr'>
                                    <td>2</td>
                                    <td>Awa</td>
                                    <td>
                                        <a href="#" target="_blank">
                                        This is the second post
                                        </a>
                                        <div class="td-action-links">
                                        <a href="#" class="trash">Trash</a>
                                        <span class="inline-divider">|</span>
                                        <a href="#" class="edit">Edit</a>
                                        <span class="inline-divider">|</span>
                                        <a href="#" class="edit">Related Posts</a>
                                        </div>
                                    </td>
                                    <td>Self-Help</td>
                                    <td>3,000</td>
                                    <td>
                                        <a href="#">
                                        Unpublish
                                        </a>
                                    </td>
                                </tr>
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