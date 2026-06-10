 import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function CreateBlog() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: "",
    author: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/", formData);

      alert("Blog Created Successfully");

      setFormData({
        title: "",
        content: "",
        image: "",
        author: "",
      });

      navigate("/");
    } catch (error) {
      console.log(error);
      alert("Error Creating Blog");
    }
  };

  return (
    <div className="container">
      <h1>Create Blog</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Blog Title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
        />

        <input
          type="text"
          name="author"
          placeholder="Author"
          value={formData.author}
          onChange={handleChange}
          required
        />

        <textarea
          name="content"
          placeholder="Blog Content"
          value={formData.content}
          onChange={handleChange}
          required
        />

        <button className="submit-btn" type="submit">
          Create Blog
        </button>
      </form>
    </div>
  );
}

export default CreateBlog;