import { Link } from "react-router-dom";
import Course from "../../common/CourseCard";
import { useEffect, useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { adminCourseAtom } from "../../store/atom";
import { ADMIN_COURSES_URL } from "../../utils/constant";
function Dashboard() {
  const token = localStorage.getItem("token");
  const adminCourses = useRecoilValue(adminCourseAtom);
  const setAdminCourses = useSetRecoilState(adminCourseAtom);
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    if (token) {
      if (jwt_decode(token).role === "admin") {
        const fetchCourses = async () => {
          setLoading(true);
          setError(null);
          try {
            axios.get(ADMIN_COURSES_URL, {
              headers: {authorization: token},
              params: { filter: filter.toLowerCase() },
            })
            .then(((res) => setAdminCourses(res.data.courses)))
            .catch((err) => console.log(err))
          } catch (error) {
            setError(error.message);
          } finally {
            setLoading( false)
          }
        }
        fetchCourses();
      }
  }
  }, [filter]);
  return (
    <section className="container mx-auto px-6 py-12">
      {token ? (
        <>
          <header className="flex justify-between items-center">
            <h1 className="text-xl font-bold text-royal-green-900">
              Những khóa học bạn đã tạo
            </h1>
            <Link to="/admin/courses/create" className="btn btn-filled">
              Tạo khóa học
            </Link>
          </header>
          {adminCourses.length !== 0 ? (
            <div className="mt-8 grid md:grid-cols-3 gap-8">
              {adminCourses.map((course) => (
                <Course key={course._id} course={course} />
              ))}
            </div>
          ) : (
            <h2 className="text-3xl font-bold text-gold-900 text-center mt-32">
              Chưa có khóa học nào được tạo
            </h2>
          )}
        </>
      ) : (
        <div>
          <h1 className="text-xl font-bold text-royal-green-900 text-center py-12">
           Bạn chưa đăng nhập. <br /> Vui lòng{" "}
            <Link className="text-gold-900" to={"/admin/login"}>
              đăng nhập
            </Link>{" "}
          </h1>
        </div>
      )}
    </section>
  );
}

export default Dashboard;
