 import { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";

function Home() {
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState("");

  const fetchBlogs = async () => {
    try {
      const res = await API.get("/");
      setBlogs(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteBlog = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this blog?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/${id}`);
      alert("Blog Deleted Successfully");
      fetchBlogs();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const res = await API.get("/");
        setBlogs(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    loadBlogs();
  }, []);

  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(search.toLowerCase()) ||
    blog.content.toLowerCase().includes(search.toLowerCase())
  );

  console.log("Blogs:", blogs);
  console.log("Search:", search);
  console.log("Filtered:", filteredBlogs);

  return (
    <div className="container">
      <nav className="navbar">
        <h2>📝 Blog Admin</h2>

        <Link className="create-btn" to="/create">
          + New Blog
        </Link>
      </nav>

      <div className="search-box">
         <input
  type="text"
  placeholder="Search Blogs..."
  value={search}
  onChange={(e) => {
    console.log("Search:", e.target.value);
    setSearch(e.target.value);
  }}
/>
      </div>

      {filteredBlogs.length === 0 ? (
        <h2
          style={{
            textAlign: "center",
            marginTop: "50px",
          }}
        >
          No Matching Blogs Found 😔
        </h2>
      ) : (
        <div className="blog-grid">
          {filteredBlogs.map((blog) => (
            <div className="blog-card" key={blog._id}>
              <img
                src={
                  blog.image ||
                  "https://via.placeholder.com/400x250"
                }
                alt={blog.title}
              />

              <div className="blog-content">
                <h2>{blog.title}</h2>

                <p>
                  {blog.content.length > 100
                    ? blog.content.substring(0, 100) + "..."
                    : blog.content}
                </p>

                <p className="author">
                  👤 {blog.author}
                </p>

                <p>
                  📅{" "}
                  {new Date(
                    blog.createdAt
                  ).toLocaleDateString()}
                </p>

                <div className="btn-group">
                  <Link to={`/edit/${blog._id}`}>
                    <button className="edit-btn">
                      Edit
                    </button>
                  </Link>

                  <button
                    className="delete-btn"
                    onClick={() =>
                      deleteBlog(blog._id)
                    }
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <footer className="footer">
        <p>
          © 2026 Blog Admin | Developed by
          Mahesh Kolte 🚀
        </p>
      </footer>
    </div>
  );
}

export default Home;