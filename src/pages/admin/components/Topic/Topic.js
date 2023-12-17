import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import '../AllPost/AllPost.css'
function Topic() {
    const [categories,setCategories] = useState([]);
    
    return (
        <>
             <div className='post-container'>
                <div className='post-content'>
                    <h3>Topics</h3>
                    <hr></hr>
                    <div className='btn-func'>
                        <div className='btn-content'>
                            <div class="table-buttons">
                                <a href="#" class="btn primary-btn small-btn">
                                    <FontAwesomeIcon icon={faPlus}/>
                                    Add Topic
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className='table-post'>
                        <table style={{border:'1px solid', width:'75%'}}>
                            <thead style={{border:'1px solid'}}>
                                <th>STT</th>
                                <th>Topic</th>
                                <th># of posts</th>
                            </thead>
                            <tbody>
                                <tr className='border-tr'>
                                    <td>1</td>
                                    <td>
                                        Self-Help
                                        <div class="td-action-links">
                                        <a href="#" class="trash">Trash</a>
                                        <span class="inline-divider">|</span>
                                        <a href="#" class="edit">Edit</a>
                                        </div>
                                    </td>
                                    <td>5</td>
                                </tr>
                                <tr className='border-tr'>
                                    <td>2</td>
                                    <td>
                                        Journaling
                                        <div class="td-action-links">
                                        <a href="#" class="trash">Trash</a>
                                        <span class="inline-divider">|</span>
                                        <a href="#" class="edit">Edit</a>
                                        </div>
                                    </td>
                                    <td>19</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Topic;