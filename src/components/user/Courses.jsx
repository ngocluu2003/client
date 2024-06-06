import axios from "axios";
import Course from "../../common/CourseCard";
import { useEffect, useState } from "react";
import { USER_COURSE_URL } from "../../utils/constant";
import FilterBar from './FilterBar';
function Courses() {
  const [courses, setCourses] = useState([]);
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(USER_COURSE_URL, {
          params: { filter: filter.toLowerCase() }
        })
        if (Array.isArray(response.data)) {
          setCourses(response.data);
          console.log(response.data)
        } else {
          throw new Error('Data is not an array');
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false)
      }
    }
    fetchCourses();
  }, [filter]);
  return (
    <section className="container mx-auto px-6 py-12">
      <header className="">
        <h1 className="text-3xl font-extrabold text-center text-royal-green-900">
          Khóa học  
        </h1>
      </header>
      <FilterBar filter={filter} setFilter={setFilter} />
      {courses.length !== 0 ? (
        <div className="mt-8 grid md:grid-cols-3 gap-8">
          {courses.map((course) => (
            <Course key={course._id} course={course} type={"user"} />
          ))}
        </div>
      ) : (
        <h2 className="text-3xl font-bold text-gold-900 text-center mt-32">
          Không có khóa học
        </h2>
      )}
    </section>
  );
}

export default Courses;
