import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";

function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: "",
    author: "",
  });

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await API.get(`/${id}`);

        setFormData(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBlog();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.put(`/${id}`, formData);

      alert("Blog Updated Successfully");
 navigate("/");
      
    } catch (error) {
      console.log(error);
      alert("Update Failed");
    }
  };

  return (
    <div className="container">
      <h1>Edit Blog</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />

        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
        />

        <input
          type="text"
          name="author"
          value={formData.author}
          onChange={handleChange}
        />

        <textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
        />

       <button className="submit-btn" type="submit">
  Update Blog
</button>
      </form>
    </div>
  );
}

export default EditBlog;