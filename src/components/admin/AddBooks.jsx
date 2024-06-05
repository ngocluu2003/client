import { useState } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useRecoilValue } from "recoil";
import { adminToken } from "../../store/atom";
import { ADMIN_COURSES_URL } from "../../utils/constant";

function AddBooks() {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [summary, setSummary] = useState("");
    const [image, setImage] = useState("");
    const [link, setLink] = useState("");
    const [message, setMessage] = useState("");
    const token = useRecoilValue(adminToken);
    const id = useParams().id;
    const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { title, author, summary, image, link};
    try {
        const response = await axios.post(`${ADMIN_COURSES_URL}/${id}/add-book`, data, {
            headers: {
              authorization: token,
            },
        });

      setMessage(response.data.message);
      setTitle("");
      setAuthor("");
      setSummary("");
      setImage("");
      setLink("");
    } catch (error) {
      setMessage("An error occurred while adding the book. Please try again.");
      console.log(`${ADMIN_COURSES_URL}/${id}`);
    }
  };

  return (
    <section className="py-14 bg-fade-pink h-screen px-6">
      {token && jwt_decode(token).role === "admin" ? (
        <>
          <h1 className="text-center text-royal-green-900 font-bold text-xl">
            Add Book
          </h1>
          {message ? (
            <div className="text-center mt-4">
              <span className="text-lg text-gold-900">{message}</span>
              <br />
              <Link className="text-lg text-gold-900" to="/admin/dashboard">
                Go to your dashboard
              </Link>
            </div>
          ) : (
            ""
          )}
          <form
            onSubmit={handleSubmit}
            className="mt-12 max-w-md mx-auto w-full" 
            action=""
          >
            <input
              className="block w-full border border-royal-green-600 py-3 px-6 rounded my-4 text-royal-green-600 text-md"
              type="text"
              placeholder="Enter Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              className="block w-full border border-royal-green-600 py-3 px-6 rounded my-4 text-royal-green-600 text-md"
              type="text"
              placeholder="Enter Author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
            <input
              className="block w-full border border-royal-green-600 py-3 px-6 rounded my-4 text-royal-green-600 text-md"
              type="text"
              placeholder="Enter Summary"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
            />
            <input
              className="block w-full border border-royal-green-600 py-3 px-6 rounded my-4 text-royal-green-600 text-md"
              type="text"
              placeholder="Enter Image Link"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
            <input
              className="block w-full border border-royal-green-600 py-3 px-6 rounded my-4 text-royal-green-600 text-md"
              type="text"
              placeholder="Enter Book Link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
            <div className="text-center mt-4">
              <button
                onClick={handleSubmit}
                className="px-6 py-3 text-md bg-royal-green-900 text-white rounded w-full"
              >
                Add Book
              </button>
            </div>
          </form>
        </>
      ) : (
        <div>
          <h1 className="text-xl font-bold text-royal-green-900 text-center py-12">
            You are not authenticated. <br /> To add a book, please{" "}
            <Link className="text-gold-900" to={"/admin/login"}>
              login
            </Link>{" "}
          </h1>
        </div>
      )}
    </section>
  );
}

export default AddBooks;
