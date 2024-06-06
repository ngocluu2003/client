import { useEffect, useState } from "react";
import { HiDesktopComputer } from "react-icons/hi";
import {
  FaFacebookSquare,
  FaLinkedin,
  FaInstagramSquare,
} from "react-icons/fa";
import { PiSuitcaseSimpleFill, PiCertificateBold } from "react-icons/pi";
import axios from "axios";
import Course from "../common/CourseCard";
import { Link } from "react-router-dom";
import { USER_COURSE_URL } from "../utils/constant";
function Home() {
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
        setLoading( false)
      }
    }
    fetchCourses();
  }, [filter]);
  return (
    <>
      <section className="py-20 md:py-0 md:pt-32 md:overflow-hidden bg-fade-pink relative">
        <div className="bg-gold-900 h-64 w-64 rounded-full absolute -left-44 top-0 z-10"></div>
        <article className="container ml-auto md:h-[calc(100vh-133px)] md:grid grid-cols-2 gap-64 overflow-hidden px-8 relative z-20">
          <div>
            <h1 className="text-4xl md:text-5xl text-royal-green-900 font-extrabold leading-normal">
              Grow Your Skills, <br />
              Define Your Future
            </h1>
            <p className="text-lg text-royal-green-600 mt-6">
            Khám phá thế giới cơ hội và khám phá cách phát triển cá nhân và nghề nghiệp liên tục có thể mở đường cho một hành trình thành công và trọn vẹn phía trước.
            </p>
            <Link
              to="/courses"
              className="bg-gold-900 text-white px-6 mt-14 py-3 text-lg inline-block rounded-full"
            >
              Xem khóa học  
            </Link>
            <footer className="mt-16 md:mt-28 flex justify-between">
              <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-semibold text-royal-green-900">
                  40k+
                </h2>
                <p className="text-lg md:text-xl text-royal-green-600 mt-3">
                  Học sinh
                </p>
              </div>
              <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-semibold text-royal-green-900">
                  12k+
                </h2>
                <p className="text-lg md:text-xl text-royal-green-600 mt-3">
                  Người dùng
                </p>
              </div>
              <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-semibold text-royal-green-900">
                  2k+
                </h2>
                <p className="text-lg md:text-xl text-royal-green-600 mt-3">
                  Khóa học
                </p>
              </div>
            </footer>
          </div>
          <div className="hidden md:block bg-royal-green-900 h-full rounded-tl-3xl relative">
            <img
              src="/cover.jpg"
              className="relative top-16 -left-16 z-10 rounded-tl-3xl"
              alt=""
            />
            <div className="bg-gold-900 h-64 w-64 rounded-full absolute -right-8 -bottom-28"></div>
          </div>
        </article>
      </section>
      <section>
        <div className="container mx-auto py-32 px-8">
          <header>
            <h2 className="text-center text-4xl font-bold text-royal-green-900">
            Đạt được mục tiêu của bạn với chúng tôi
            </h2>
            <p className="text-xl text-royal-green-600 text-center max-w-3xl mx-auto mt-8">
            Khai phá toàn bộ tiềm năng của bạn thông qua các khóa học đa dạng và hướng dẫn của các chuyên gia.
            </p>
          </header>
          <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto mt-12">
            <article className="bg-white border-2 border-royal-green-300 p-8 rounded-xl">
              <div className="p-3 bg-royal-green-300 inline-block rounded">
                <HiDesktopComputer className="text-xl text-royal-green-700" />
              </div>

              <h3 className="text-2xl font-semibold text-royal-green-900 mt-4">
                Học những thứ mới mẻ
              </h3>
              <p className="text-base mt-4 text-royal-green-600">
                Luôn đón đầu xu hướng: Học và nắm vững các kỹ năng theo yêu cầu mới nhất để có một tương lai đầy hứa hẹn.
              </p>
            </article>
            <article className="bg-[#F6FBF9] shadow-lg border-2 border-royal-green-300 p-8 rounded-xl">
              <div className="p-3 bg-gold-300 inline-block rounded">
                <PiSuitcaseSimpleFill className="text-xl text-gold-900" />
              </div>
              <h3 className="text-2xl font-semibold text-royal-green-900 mt-4">
                Sẵn sàng cho sự nghiệp của bạn
              </h3>
              <p className="text-base mt-4 text-royal-green-600">
                Đào sâu vào nghành nghề của bạn bằng những kiến thức của các chuyên gia đi trước ! 
              </p>
            </article>
            <article className="bg-white border-2 border-royal-green-300 p-8 rounded-xl">
              <div className="p-3 bg-royal-green-300 inline-block rounded">
                <PiCertificateBold className="text-xl text-royal-green-700" />
              </div>
              <h3 className="text-2xl font-semibold text-royal-green-900 mt-4">
                Đạt được chứng chỉ
              </h3>
              <p className="text-base mt-4 text-royal-green-600">
              Đạt được chứng nhận khi hoàn thành các khóa học để có cơ hội nghề nghiệp tốt hơn !
              </p>
            </article>
          </div>
        </div>
      </section>
      <section>
        <div className="container mx-auto px-8">
          <header>
            <h2 className="text-center text-4xl font-bold text-royal-green-900">
              Các khóa học nổi tiếng
            </h2>
          </header>
          {courses !== undefined && courses.length !== 0 ? (
            <div className="mt-8 grid md:grid-cols-3 gap-8">
              {courses.map((course) => (
                <Course key={course._id} course={course} type={"user"} />
              ))}
            </div>
          ) : (
            <h2 className="text-xl font-bold text-gold-900 text-center mt-8">
              Chưa có khóa học nào
            </h2>
          )}
          <div className="text-center">
            <Link
              to="/courses"
              className="bg-gold-900 text-white px-6 mt-14 py-3 text-lg inline-block rounded-full"
            >
              Khám phá thêm
            </Link>
          </div>
        </div>
      </section>
      <section className="py-32 px-8">
        <div className="container bg-[#323232] mx-auto max-w-4xl px-6 md:px-24 py-16 text-center rounded-2xl">
          <h2 className="text-white text-4xl font-semibold">
            Bạn đã sẵn sàng ?
          </h2>
          <p className="text-white text-lg mt-6">
          Hãy sẵn sàng bắt tay vào một hành trình học tập phong phú. Khóa học hôm nay đang chờ đợi, nâng cao kiến thức và kỹ năng của bạn.
          </p>
          <input
            className="border-b bg-transparent w-full max-w-sm mt-8 text-white py-2 outline-0"
            type="email"
            placeholder="Địa chỉ email của bạn"
          />
          <br />
          <input
            className="bg-gold-900 rounded-full cursor-pointer w-full max-w-sm mt-8 text-white py-3 outline-0"
            type="submit"
            placeholder="Địa chỉ email của bạn"
          />
        </div>
      </section>
      <footer className="pb-12">
        <div className="container mx-auto">
          <div className="md:flex items-center">
            <div className="text-2xl text-center md:text-left" to="/">
              <strong className="text-gold-900">Wisdom</strong>
              <strong className="text-royal-green-900"> Emporium</strong>
            </div>
            <nav className="md:ml-20 mt-6 md:mt-0">
              <ul className="flex justify-center items-center">
                <li>
                  <Link
                    className="text-md text-royal-green-900 hover:text-gold-900"
                    to="/"
                  >
                    Home
                  </Link>
                </li>
                <li className="ml-6">
                  <Link
                    className="text-md text-royal-green-900  hover:text-gold-900"
                    to="/course"
                  >
                    Khóa học
                  </Link>
                </li>
                <li className="ml-6">
                  <Link
                    className="text-md text-royal-green-900  hover:text-gold-900"
                    to="/course"
                  >
                    Dịch vụ
                  </Link>
                </li>
                <li className="ml-6">
                  <Link
                    className="text-md text-royal-green-900  hover:text-gold-900"
                    to="/course"
                  >
                    Liên hệ
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          <div className="mt-8">
            <nav className="text-center md:text-right">
              <ul className="inline-flex items-center justify-center md:justify-end md:border-b-2 pb-4 md:pr-24 border-gold-900">
                <li>
                  <Link
                    className="text-md text-royal-green-900 hover:text-gold-900"
                    to="/"
                  >
                    <FaFacebookSquare className="text-4xl text-gold-900" />
                  </Link>
                </li>
                <li className="ml-6">
                  <Link
                    className="text-md text-royal-green-900  hover:text-gold-900"
                    to="/course"
                  >
                    <FaLinkedin className="text-4xl text-gold-900" />
                  </Link>
                </li>
                <li className="ml-6">
                  <Link
                    className="text-md text-royal-green-900  hover:text-gold-900"
                    to="/course"
                  >
                    <FaInstagramSquare className="text-4xl text-gold-900" />
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </footer>
      
    </>
  );
}

export default Home;
