import { useState } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useRecoilValue } from "recoil";
import { adminToken } from "../../store/atom";
import { ADMIN_COURSES_URL } from "../../utils/constant";

function EditCourse() {
  const [message, setMessage] = useState("");
  const course = useLocation().state.course;
  const [title, setTitle] = useState(course.title);
  const [tag, setTag] = useState(course.tag);
  const [price, setPrice] = useState(course.price);
  const [imgLink, setImgLink] = useState(course.imgLink);
  const [description, setDescription] = useState(course.description);
  const [published, setPublished] = useState(course.published);
  const id = useParams().id;
  const token = useRecoilValue(adminToken);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { title, tag, price, imgLink, description, published };
    const response = await axios.put(`${ADMIN_COURSES_URL}/${id}`, data, {
      headers: {
        authorization: token,
      },
    });

    setMessage(response.data.message);
    setTitle("");
    setTag("");
    setPrice(0);
    setDescription("");
    setImgLink("");
    setPublished(false);
  };

  return (
    <section className="py-14 bg-fade-pink h-screen px-6">
      {token && jwt_decode(token).role ? (
        <>
          <h1 className="text-center text-royal-green-900 font-bold text-xl">
            Cập nhật khóa học
          </h1>
          {message ? (
            <div className="text-center mt-4">
              <span className="text-lg text-gold-900">{message}</span>
              <br />
              <Link className="text-lg text-royal-green-900" to="/admin/dashboard">
                Đi tới trang chủ
              </Link>
            </div>
          ) : (
            ""
          )}
          <form
            onSubmit={(e) => handleSubmit(e)}
            className="mt-12 max-w-md mx-auto w-full"
            action=""
          >
            <input
              className="block w-full border border-royal-green-600 py-3 px-6 rounded my-4 text-royal-green-600 text-md"
              type="text"
              placeholder="Nhập tiêu đề khóa học"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              className="block w-full border border-royal-green-600 py-3 px-6 rounded my-4 text-royal-green-600 text-md"
              type="text"
              placeholder="Nhập thể loại khóa học"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
            />
            <input
              className="block w-full border border-royal-green-600 py-3 px-6 rounded my-4 text-royal-green-600 text-md"
              type="number"
              placeholder="Nhập giá khóa học"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <input
              className="block w-full border border-royal-green-600 py-3 px-6 rounded my-4 text-royal-green-600 text-md"
              type="text"
              placeholder="Nhập link hình ảnh khóa học"
              value={imgLink}
              onChange={(e) => setImgLink(e.target.value)}
            />
            <textarea
              className="block w-full border border-royal-green-600 py-3 px-6 rounded my-4 text-royal-green-600 text-md"
              rows="4"
              placeholder="Nhập mô tả"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <label className="text-royal-green-600" htmlFor="publish">
              <input
                id="publish"
                checked={published}
                onChange={(e) => setPublished(!published)}
                type="checkbox"
              />
              <span className="ml-2">Published</span>
            </label>
            <div className="text-center mt-4">
              <button
                onClick={(e) => handleSubmit(e)}
                className="px-6 py-3 text-md bg-royal-green-900 text-white rounded w-full"
              >
                Cập nhật
              </button>
            </div>
          </form>
        </>
      ) : (
        <div>
          <h1 className="text-xl font-bold text-royal-green-900 text-center py-12">
            Bạn chưa đăng nhập. <br /> Để cập nhật khóa học vui lòng{" "}
            <Link className="text-gold-900" to={"/admin/login"}>
              đăng nhập
            </Link>{" "}
          </h1>
        </div>
      )}
    </section>
  );
}

export default EditCourse;
