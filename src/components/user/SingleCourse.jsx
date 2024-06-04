import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { userAtom } from "../../store/atom";
import jwt_decode from "jwt-decode";
import { USER_COURSE_URL } from "../../utils/constant";

function SingleCourse() {
  const [course, setCourse] = useState({});
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const id = useParams().id;
  const token = localStorage.getItem("token");
  const [message, setMessage] = useState("");
  const [reviews, setReviews] = useState([]);
  const [books, setBooks] = useState([]);
  const user = useRecoilValue(userAtom);
    useEffect(() => {
      axios
        .get(USER_COURSE_URL, {
          params: { filter: filter.toLowerCase() },
        })
        .then((res) =>
          setCourse(res.data.find((course) => course._id === id)),
        )
        .catch((err) => console.error(err));
    }, []);

  const handleClick = () => {
    if (token) {
      if (jwt_decode(token).role === "user") {
        axios
          .post(`${USER_COURSE_URL}/${id}`, null, {
            headers: {
              authorization: token,
            },
          })
          .then((res) => setMessage(res.data.message))
          .catch((err) => console.error(err));
      } else {
        setMessage("You are not authenticated to buy any course");
      }
    } else {
      setMessage("You are not authenticated to buy any course");
    }
  };

  return (
    <section>
      <header
        className="py-24 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${course.imgLink})`,
        }}
      >
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold text-white text-royal-green-900s">
            {course.title}
          </h1>
          <div className="text-center">
            <strong className="text-royal-green-600 font-normal text-sm inline-block my-3">
              {course.tag}
            </strong>
            <br />
            <strong className="text-gold-900 font-semibold text-2xl inline-block">
              ${course.price}
            </strong>
          </div>
          {message ? (
            <h2 className="text-xl font-bold text-gold-900 mt-4 text-center">
              {message}
              <br />
              {token ? (
                <>
                  {jwt_decode(token).role === "user" ? (
                    <Link to={`/${user}/dashboard`}>Go to your dashbaord</Link>
                  ) : (
                    <Link to={`/login`}>Please login to buy course</Link>
                  )}
                </>
              ) : (
                ""
              )}
            </h2>
          ) : (
            ""
          )}
          <footer className="mt-4">
            <button
              onClick={handleClick}
              className="btn mt-4 !border-white !text-white inline-block"
            >
              Buy Course
            </button>
          </footer>
        </div>
      </header>
      <div className="max-w-3xl mx-auto px-6 mt-12">
        <p className=" text-royal-green-900 text-xl">{course.description}</p>
      </div>
      <div className="max-w-3xl mx-auto px-6 mt-12">
        <h2 className="text-2xl font-bold text-royal-green-900">User Reviews</h2>
        {course.reviews && course.reviews.length ? (
          course.reviews.map((review) => (
            <div key={review._id} className="my-4 p-4 border border-gray-300 rounded-md flex items-start space-x-4">
              <img src={review.avatar} alt={`${review.username}'s avatar`} className="w-12 h-12 rounded-full"/>
              <div>
                <h3 className="text-xl font-semibold">{review.username}</h3>
                <p className="text-sm text-gray-600">Rating: {review.rating}/5</p>
                <p className="mt-2">{review.comment}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="mt-2 text-gray-600">No reviews yet.</p>
        )}
      </div>
      <div className="max-w-3xl mx-auto px-6 mt-12">
        <h2 className="text-2xl font-bold text-royal-green-900">Recommended Books</h2>
        {course.books && course.books.length > 0 ? (
          course.books.map((book) => (
            <a href={book.link} target="_" className="block my-4 p-4 border border-gray-300 rounded-md flex items-start space-x-4">
  <img src={book.image} alt={book.title} className="w-16 h-24 object-cover" />
  <div>
    <h3 className="text-xl font-semibold">{book.title}</h3>
    <i className="text-sm text-gray-600">by {book.author}</i>
    <p className="text-sm text-gray-600">{book.summary}</p>
  </div>
</a>

          ))
        ) : (
          <p className="mt-2 text-gray-600">No recommended books yet.</p>
        )}
      </div>
    </section>
  );
}

export default SingleCourse;
