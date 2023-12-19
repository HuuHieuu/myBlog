import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import { useState, useEffect } from 'react';
import axios from 'axios';
import '../AllPost/AllPost.css'
import { useFetcher } from 'react-router-dom';
function Topic({categoryIds}) {
    const [categories,setCategories] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [categoryId, setCategoryId] = useState(null);
    const [selectedCategories, setSelectedCategories] = useState(null);
    const [categoryPostCounts, setCategoryPostCounts] = useState({});

    useEffect(() => {
        axios.get('http://localhost:8080/api/blog/categories')
            .then(response => {
                setCategories(response.data);
                // Fetch number of posts for each category
                fetchCategoryPostCounts(response.data.map(category => category.id));
            })
            .catch(error => {
                console.error('Lỗi khi lấy danh sách category:', error.message);
            });
    }, []);

    const fetchCategoryPostCounts = async (categoryIds) => {
        try {
            const counts = {};
            // Fetch the number of posts for each category
            for (const categoryId of categoryIds) {
                const response = await axios.get(`http://localhost:8080/api/blog/posts/category/${categoryId}`);
                counts[categoryId] = response.data.length;
            }
            setCategoryPostCounts(counts);
        } catch (error) {
            console.error('Error fetching category post counts:', error.message);
        }
    };



    const [newCategory, setNewCategory] = useState({
        title: '',
        slug:'',
        content:'',
        numberOfPosts:null
      });

    useEffect(() => {
        // Gửi yêu cầu GET đến API Endpoint /admin khi component được mount
        axios.get('http://localhost:8080/api/blog/categories')
            .then(response => {
            // Nếu yêu cầu thành công, cập nhật state với danh sách người dùng từ server
            setCategories(response.data);
            console.log(categories);
            })
            .catch(error => {
            console.error('Lỗi khi lấy danh sách category:', error.message);
            });    
        }, []); 

    const updateCategoryPostCount = (categoryId, increment) => {
        setCategoryPostCounts(prevCounts => ({
            ...prevCounts,
            [categoryId]: (prevCounts[categoryId] || 0) + increment,
        }));
    };
    const addCategory = async () => {
        try {
          // Gửi yêu cầu POST để thêm mới category
          const response = await axios.post('http://localhost:8080/api/blog/categories', newCategory);
      
          // Kiểm tra xem yêu cầu thành công hay không
          if (response.status === 201 || response.status === 200) {
            // Cập nhật numberOfPosts khi thêm mới
            updateCategoryPostCount(response.data.id, 1);
      
            setCategories(prevCategories => [...prevCategories, response.data]);
            setShowAddForm(false);
            setNewCategory({
              title: '',
              slug: '',
              content: '',
            });
            handleCategorySubmitted();
            window.alert('Category added successfully!');
          } else {
            console.error('Lỗi khi thêm mới category:', response.statusText);
          }
        } catch (error) {
          console.error('Lỗi khi thêm mới category:', error.message);
          if (error.response) {
            console.error('Response data:', error.response.data);
          }
        }
      };
      const editCategory = async () => {
        try {
          // Gửi yêu cầu PUT để cập nhật category
          const response = await axios.put(`http://localhost:8080/api/blog/categories/${selectedCategory.id}`, newCategory);
      
          // Kiểm tra xem yêu cầu thành công hay không
          if (response.status === 201 || response.status === 200) {
            setCategories(prevCategories => [...prevCategories, response.data]);
            setShowAddForm(false);
            setNewCategory({
              title: '',
              slug: '',
              content: '',
            });
            handleCategorySubmitted();
            window.alert('Category updated successfully!');
          } else {
            console.error('Lỗi khi cập nhật category:', response.statusText);
          }
        } catch (error) {
          console.error('Lỗi khi cập nhật category:', error.message);
          if (error.response) {
            console.error('Response data:', error.response.data);
          }
        }
      };
      

    const handleEditClick = (categories) =>{
        setSelectedCategory(categories);
        setShowAddForm(true);
        setNewCategory({
            title: categories.title,
            slug: categories.slug,
            content: categories.content,
          });
    }

    const handleCategorySubmitted = async () => {
        // Lấy danh sách bài viết đã cập nhật
        try {
            const response = await axios.get('http://localhost:8080/api/blog/categories');
            // Cập nhật trạng thái với dữ liệu mới
            setCategories(response.data);
        } catch (error) {
            console.error('Lỗi khi lấy danh sách category:', error.message);
        }
    };

    const handleAddCate = () =>{
        setShowAddForm(true);
        setSelectedCategory(false);
        setNewCategory({
            title: '',
            slug: '',
            content: '',
            numberOfPosts:null
          });
    }
    const handleSubmitCategory = async () => {
        if (selectedCategory) {
            // Nếu có selectedCategory, đang ở chế độ edit
            editCategory();
          } else {
            // Ngược lại, đang ở chế độ thêm mới
            addCategory();
          }
        // try {
        //     let response
        //     if(selectedCategory){
        //         response = await axios.put(`http://localhost:8080/api/blog/categories/${selectedCategory.id}`, newCategory);
        //     }else{
        //         // Gửi yêu cầu POST để thêm mới category
        //         response = await axios.post('http://localhost:8080/api/blog/categories', newCategory);
        //     }
        //     // Kiểm tra xem yêu cầu thành công hay không
        //     if (response.status === 201 || response.status === 200) {
        //         setCategories(prevCategories => [...prevCategories, response.data]);
        //         setShowAddForm(false);
        //         setNewCategory({
        //             title: '',
        //             slug: '',
        //             content: '',
        //         });
        //         handleCategorySubmitted();
        //         const successMessage = selectedCategory ? 'Category updated successfully!' : 'Category added successfully!';
        //         window.alert(successMessage);
        //     } else {
        //         console.error('Lỗi khi thêm mới hoặc cập nhật category:', response.statusText);
        //     }
        // } catch (error) {
        //     console.error('Lỗi khi thêm mới hoặc cập nhật category:', error.message);
        //     if (error.response) {
        //         console.error('Response data:', error.response.data);
        //     }
        // }
    };

    useEffect(() => {
        // Nếu có bài viết được chọn, sử dụng nó để cập nhật trạng thái của trình soạn thảo
        if (selectedCategory) {
            setNewCategory({
                title: selectedCategory.title,
                slug: selectedCategory.slug,
                content: selectedCategory.content,
            });
        }
      }, [selectedCategory]);

      const handleDeleteClick = async (categoryId) => {
        const confirmed = window.confirm("Bạn có chắc chắn muốn xóa danh mục này?");
        if (!confirmed) {
            return;
        }
    
        try {
            // Gửi yêu cầu DELETE để xóa category
            const response = await axios.delete(`http://localhost:8080/api/blog/categories/${categoryId}`);
    
            // Kiểm tra xem yêu cầu thành công hay không
            if (response.status === 200) {
                // Nếu thành công, cập nhật danh sách categories
                setCategories(prevCategories => prevCategories.filter(category => category.id !== categoryId));
                handleCategorySubmitted();
                alert('Category deleted successfully!');
            } else {
                console.error('Lỗi khi xóa category:', response.statusText);
            }
        } catch (error) {
            console.error('Lỗi khi xóa category:', error.message);
            if (error.response) {
                console.error('Response data:', error.response.data);
            }
        }
    };

    const handleSearch = () =>{
        axios.get(`http://localhost:8080/api/blog/categories/${categoryId}`)
        .then(response => {
          setSelectedCategories(response.data);
        })
        .catch(error => {
          console.error('Error fetching Category by ID:', error.message);
          setSelectedCategories(null);
        });
        console.log('Selected Category:', selectedCategories);
    }
    
      
    
    return (
        <>
             <div className='post-container'>
                <div className='post-content'>
                    <h3>Topics</h3>
                    <hr></hr>
                    <div className='btn-func'>
                        <div className='table-action'>
                            <input type="text" name="search-term" id="search-post-input" placeholder="Search by categoryId" value={categoryId} onChange={(e) => setCategoryId(e.target.value)} />
                            <button
                            style={{margin:'0', width:'15%',backgroundColor:'transparent', color:'black',opacity:'1',marginBottom:'1%'}}
                            onClick={handleSearch}
                            onMouseOver={(e) => e.target.style.opacity = '0.7'} // Hover effect
                            onMouseOut={(e) => e.target.style.opacity = '1'}
                            >Search</button>
                        </div>
                    </div>
                    <div className='btn-func'>
                        <div className='btn-content'>
                            <div class="table-buttons">
                                <a href="#" class="btn primary-btn small-btn" onClick={handleAddCate}>
                                    <FontAwesomeIcon icon={faPlus}/>
                                    Add Category
                                </a>
                            </div>
                        </div>
                    </div>
                    {showAddForm && (
                    <div className='popup'>
                        <div style={{textAlign:'left', marginLeft:'2%', marginBottom:'1%'}}>
                            <button className="close-button" onClick={() => setShowAddForm(false)}>
                                <FontAwesomeIcon icon={faTimes} />
                            </button>
                        </div>
                            <label>Title:</label>
                            <input
                                style={{border:'1px solid black', width:'25%', marginLeft:'1.4%',color:'black'}}
                                type="text"
                                value={newCategory.title}
                                onChange={(e) => setNewCategory({ ...newCategory, title: e.target.value })}
                            />
                            <label>Slug:</label>
                            <input
                                style={{border:'1px solid black', width:'25%', marginLeft:'1.4%',color:'black'}}
                                type="text"
                                value={newCategory.slug}
                                onChange={(e) => setNewCategory({ ...newCategory, slug: e.target.value })}
                            />
                            <label>Content:</label>
                            <input
                                style={{border:'1px solid black', width:'25%', marginLeft:'1.4%',color:'black'}}
                                type="text"
                                value={newCategory.content}
                                onChange={(e) => setNewCategory({ ...newCategory, content: e.target.value })}
                            />

                            <button onClick={handleSubmitCategory}
                                style={{margin:'0', width:'21%',backgroundColor:'transparent', color:'black',opacity:'1',marginBottom:'1.2%'}}
                                onMouseOver={(e) => e.target.style.opacity = '0.7'} // Hover effect
                                onMouseOut={(e) => e.target.style.opacity = '1'}
                            >{selectedCategory ? 'Edit Category' : 'Add new Category'}</button>
                    </div>
                    )}
                    {selectedCategories ? (
                        <div className='table-post'>
                            <table style={{border:'1px solid', width:'75%'}}>
                                <thead style={{border:'1px solid'}}>
                                    <th>CategoryID</th>
                                    <th>Title</th>
                                    <th>Slug</th>
                                    <th>Number of posts</th>
                                </thead>
                                <tbody>
                                    {/* {selectedCategories.map((cate,index)=>( */}
                                        {/* <tr key={index}> */}
                                            <td>{selectedCategories.id}</td>
                                            <td>{selectedCategories.title}
                                                <div className="td-action-links">
                                                    <a href="#" className="trash" onClick={()=>handleDeleteClick(selectedCategories.id)}>Trash</a>
                                                    <span className="inline-divider">|</span>
                                                    <a href="#" className="edit" onClick={()=>handleEditClick(selectedCategories)}>Edit</a>
                                                </div>
                                            </td>
                                            <td>{selectedCategories.slug}</td>
                                            <td>{selectedCategories.numberOfPosts}</td>
                                        {/* </tr> */}
                                    {/* ))} */}
                                </tbody>
                            </table>
                        </div>
                    ):(
                    <div className='table-post'>
                        <table style={{border:'1px solid', width:'75%'}}>
                            <thead style={{border:'1px solid'}}>
                                <th>CategoryID</th>
                                <th>Title</th>
                                <th>Slug</th>
                                <th>Number of posts</th>
                            </thead>
                            <tbody>
                                {categories.map((categorie, index)=>(
                                    <tr key={index} className='border-tr'>
                                        <td>{categorie.id}</td>
                                        <td>{categorie.title}
                                            <div className="td-action-links">
                                                <a href="#" className="trash" onClick={()=>handleDeleteClick(categorie.id)}>Trash</a>
                                                <span className="inline-divider">|</span>
                                                <a href="#" className="edit" onClick={()=>handleEditClick(categorie)}>Edit</a>
                                            </div>
                                        </td>
                                        <td>{categorie.slug}</td>
                                        <td>{categoryPostCounts[categorie.id] || 0}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    )}

                </div>
            </div>
        </>
    );
}

export default Topic;