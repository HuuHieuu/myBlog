import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import '../AllPost/AllPost.css'
function User() {
    return ( 
        <>
            <div className='post-container'>
                <div className='post-content'>
                    <h3>Users</h3>
                    <hr></hr>
                    <div className='btn-func'>
                        <div className='table-action'>
                            <input type="text" name="search-term" id="search-post-input" placeholder="Search..."/>
                        </div>
                        <div className='btn-content'>
                            <div class="table-buttons">
                                <a href="#" class="btn primary-btn small-btn">
                                    <FontAwesomeIcon icon={faPlus}/>
                                    Add User
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className='table-post'>
                        <table style={{border:'1px solid', width:'75%'}}>
                            <thead style={{border:'1px solid'}}>
                                <th>STT</th>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Role</th>
                            </thead>
                            <tbody>
                            <tr className='border-tr'>
                                <td>1</td>
                                <td>Awa Melvine</td>
                                <td>
                                    melvine@example.com
                                    <div class="td-action-links">
                                    <a href="#" class="trash">Delete</a>
                                    <span class="inline-divider">|</span>
                                    <a href="#" class="edit">Edit</a>
                                    </div>
                                </td>
                                <td>Admin</td>
                            </tr>
                            <tr className='border-tr'>
                                <td>1</td>
                                <td>Awa</td>
                                <td>
                                    awa@example.com
                                    <div class="td-action-links">
                                    <a href="#" class="trash">Delete</a>
                                    <span class="inline-divider">|</span>
                                    <a href="#" class="edit">Edit</a>
                                    </div>
                                </td>
                                <td>Admin</td>
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

export default User;