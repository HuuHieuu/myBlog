import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import '../AllPost/AllPost.css'
function Role() {
    return ( 
        <>
            <div className='post-container'>
                <div className='post-content'>
                    <h3>Roles</h3>
                    <hr></hr>
                    <div className='btn-func'>
                        <div className='btn-content'>
                            <div class="table-buttons">
                                <a href="#" class="btn primary-btn small-btn">
                                    <FontAwesomeIcon icon={faPlus}/>
                                    Add Role
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className='table-post'>
                        <table style={{border:'1px solid', width:'75%'}}>
                            <thead style={{border:'1px solid'}}>
                                <th>STT</th>
                                <th>Role</th>
                                <th># of users</th>
                                <th>Update Permissions</th>
                            </thead>
                            <tbody>
                            <tr className='border-tr'>
                                <td>1</td>
                                <td>
                                    Admin
                                    <div class="td-action-links">
                                    <a href="#" class="trash">Trash</a>
                                    <span class="inline-divider">|</span>
                                    <a href="#" class="edit">Edit</a>
                                    </div>
                                </td>
                                <td>5</td>
                                <td class="center">
                                    <a href="#" class="edit" title="Assign permissions to role">Permissions</a>
                                </td>
                            </tr>
                            <tr className='border-tr'>
                            <td>2</td>
                            <td>
                                Author
                                <div class="td-action-links">
                                <a href="#" class="trash">Trash</a>
                                <span class="inline-divider">|</span>
                                <a href="#" class="edit">Edit</a>
                                </div>
                            </td>
                            <td>5</td>
                            <td class="center">
                                <a href="#" class="edit" title="Assign permissions to role">Permissions</a>
                            </td>
                            </tr>
                            <tr className='border-tr'>
                            <td>3</td>
                            <td>
                                Editor
                                <div class="td-action-links">
                                <a href="#" class="trash">Trash</a>
                                <span class="inline-divider">|</span>
                                <a href="#" class="edit">Edit</a>
                                </div>
                            </td>
                            <td>5</td>
                            <td class="center">
                                <a href="#" class="edit" title="Assign permissions to role">Permissions</a>
                            </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Role;