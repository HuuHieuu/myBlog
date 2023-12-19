import React, { useState, useEffect } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from 'axios';
import './MyEditor.css';

const API_URL = "http://127.0.0.1:8080/api/blog/image/upload";

export default function MyEditor({ handleCloseEditor,onPostSubmitted,selectedPost, ...props }) {
  const [editorData, setEditorData] = useState("");
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [published, setPublished] = useState(false);
  const [thumbnail, setThumbnail] = useState("");
  const [authorId, setAuthorId] = useState(null);
  const [parentId, setParentId] = useState(null);
  const [categoryIds, setCategoryIds] = useState([]);
  const [body, setBody] = useState("");
  const [authorName,setAuthorName]=useState();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get('http://localhost:8080/api/blog/users/info', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        const userData = response.data;
        console.log(userData.firstName);
        setAuthorId(userData.id);
        setAuthorName(userData.firstName);
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    fetchUserInfo();
  }, []);

  

  const handleEditorChange = (data) => {
    const imgRegex = /<img.*?src="(.*?)"/g;
    const prevImages = [...editorData.matchAll(imgRegex)].map((match) => match[1]);
    const currImages = [...data.matchAll(imgRegex)].map((match) => match[1]);

    const deletedImages = prevImages.filter((img) => !currImages.includes(img));

    deletedImages.forEach((imgUrl) => {
      const imageName = imgUrl.split("/").pop();
      fetch(`http://localhost:8080/api/blog/image/${imageName}`, {
        method: "DELETE",
      })
        .then((res) => console.log(res))
        .catch((err) => console.error(err));
    });

    setEditorData(data);
    setBody(data)
  };

  useEffect(() => {
    // Nếu có bài viết được chọn, sử dụng nó để cập nhật trạng thái của trình soạn thảo
    if (selectedPost) {
      console.log("MyEditor - Selected Post:", selectedPost);
      setBody(selectedPost.content);
      setTitle(selectedPost.title);
      setSummary(selectedPost.summary);
      setMetaTitle(selectedPost.metaTitle);
      setSlug(selectedPost.slug);
      setPublished(selectedPost.published);
      setThumbnail(selectedPost.thumbnail);
      setAuthorId(selectedPost.authorId);
      setParentId(selectedPost.parentId);
      setCategoryIds(selectedPost.categoryIds);
    }
  }, [selectedPost]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('accessToken');
    const headers = {
      "Content-Type": "application/json",
      "Authorization" : `Bearer ${token}`,
    };

    const blogPost = {
      title,
      summary,
      metaTitle,
      slug,
      published,
      content: editorData,
      thumbnail,
      authorId,
      parentId,
      categoryIds,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      publishedAt: published ? new Date().toISOString() : null,
    };
    
    try {
      if (selectedPost) {
        // Nếu có bài viết được chọn, thực hiện logic chỉnh sửa
        await axios.put(`http://localhost:8080/api/blog/posts/${selectedPost.id}`, blogPost, { headers });
      } else {
        // Nếu không có bài viết được chọn, thực hiện logic tạo mới
        await axios.post('http://localhost:8080/api/blog/posts', blogPost, { headers });
      }
      alert('Blog post submitted successfully!');

      //hàm callback từ allpost
      onPostSubmitted();

      // close editor
      handleCloseEditor();
    } catch (error) {
      console.error('Error submitting blog post:', error);
    }
  };


  function uploadAdapter(loader) {
    return {
        upload: () => {
            return new Promise((resolve, reject) => {
                const body = new FormData();
                loader.file.then((file) => {
                    body.append("image", file);

                    //token
                    const token = localStorage.getItem('accessToken');
                    fetch(`${API_URL}`, {
                        method: "post",
                        body: body,
                        headers: {
                          'Authorization': `Bearer ${token}`,  // Thêm token vào header
                        },
                    })
                    .then((res) => res.text())
                    .then((res) => {
                        console.log(res);
                        resolve({
                            default: `http://localhost:8080/api/blog/image/display/${res}`
                        });
                    })
                    .catch((err) => {
                        reject(err);
                    });
                });
            });
        }
    };
  }

  function uploadPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
        return uploadAdapter(loader);
    };
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit} className="blog-form">
        <div className="form-css">
            <label style={{height:'30px'}}>
              Title:
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required className="blog-input" />
            </label>
            <label style={{height:'30px'}}>
              Meta Title:
              <input type="text" value={metaTitle} onChange={(e) => setMetaTitle(e.target.value)} required className="blog-input" />
            </label>
            <label style={{height:'30px'}}>
              Slug:
              <input type="text" value={slug} onChange={(e) => setSlug(e.target.value)} required className="blog-input" />
            </label>
            <label style={{height:'60px'}}>
              Summary:
              <textarea value={summary} onChange={(e) => setSummary(e.target.value)} required className="blog-input" />
            </label>
            <label>
              Published:
              <input type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} className="blog-input" />
            </label>
            <label>
              Thumbnail URL:
              <input type="text" value={thumbnail} onChange={(e) => setThumbnail(e.target.value)} className="blog-input" />
            </label>
            <label>
              Parent Post ID:
              <input type="text" value={parentId} onChange={(e) => setParentId(e.target.value)} className="blog-input" />
            </label>
            <label>
              Category IDs (comma-separated):
              <input type="text" value={categoryIds} onChange={(e) => setCategoryIds(e.target.value.split(','))} className="blog-input" />
            </label>
        </div>
        <CKEditor
            config={{
                extraPlugins: [uploadPlugin],
            }}
            editor={ClassicEditor}
            onReady={(editor) => {}}
            onBlur={(event, editor) => {}}
            onFocus={(event, editor) => {}}
            onChange={(event, editor) => {
                handleEditorChange(editor.getData());
            }}
            data={body}
            {...props}
        />
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
}
