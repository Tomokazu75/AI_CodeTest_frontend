import { Link, Outlet, useParams } from "react-router-dom";
import { Post } from "../types/post";
import { useState } from "react";
import { format } from "date-fns";
import Pagination from "../components/Pagination";
import { ageSelection } from "../components/SelectBox";

type ShowProps = {
  posts: Post[];
  setPosts: (posts: Post[]) => void;
};

const Show = ({ posts }: ShowProps) => {
  const { name } = useParams();
  const { postId } = useParams();

  const [age, setAge] = useState(ageSelection[0].value);

  const level = (age: string) => {
    if (age === ageSelection[0].value) {
      return "初級";
    } else if (age === ageSelection[1].value) {
      return "中級";
    } else {
      return "上級";
    }
  };

  // const lists = posts
  //   .filter((p) => p.lang === name && p.age === age)
  //   .map((post) => (
  //     <li key={post.id}>
  //       <Link
  //         to={`/${name}/${post.id}`}
  //         className={`text-gray-500 flex gap-2 px-2 py-1 border border-gray-200 border-solid rounded-lg mx-4 ${
  //           String(post.id) === postId && "bg-gray-200"
  //         }`}
  //       >
  //         作成日: <span className="font-bold">{format(post.createdAt, "yyyy-MM-dd")}</span>
  //         option: <span className="text-blue-400 font-bold">{post.option}</span>
  //       </Link>
  //     </li>
  //   ));
  
  const [page, setPage] = useState(1);
  
  const handlePageChange = (pageNumber: number) => {
    (pageNumber > 0 && pageNumber <= totalPages) && setPage(pageNumber)
  };

  const perPage = 5;
  // const page = 1; 
  const lists = posts.filter((p) => p.lang === name && p.age === age);
  const totalPages = Math.ceil(lists.length / perPage)
  const paginatedLists = lists.slice((page - 1) * perPage, page * perPage);
  const renderedLists = paginatedLists.map((post) => (
    <li key={post.id}>
        <Link
          to={`/${name}/${post.id}`}
          className={`text-gray-500 flex gap-2 px-2 py-1 border border-gray-200 border-solid hover:bg-gray-100 mx-4 ${
            String(post.id) === postId && "bg-gray-200"
          }`}
        >
          作成日: <span className="font-bold">{format(post.createdAt, "MM-dd HH:mm")}</span>
          option: <span className="text-blue-400 font-bold">{post.option}</span>
        </Link>
      </li>
  ));

  return (
    <>
      <div className="w-1/2">
        <div className="relative">
        <h1 className="text-3xl font-bold mt-4 text-center text-gray-800">{name}</h1>
        <Link
          to="/"
          className="text-blue-300 text-lg inline-block absolute top-1 left-4 border border-blue-300 px-2 rounded-full"
        >
          ←back
          </Link>
          </div>
        <div className="text-center text-gray-400">
          {[ageSelection[0].value, ageSelection[1].value, ageSelection[2].value].map((idx) => (
            <button
              key={idx}
              onClick={() => { setAge(idx), setPage(1) }}
              className={`text-2xl font-bold border-b-4 border-white mb-4 p-2 ${
                idx === age && "text-gray-800 border-blue-300"
              }`}
            >
              {level(idx)}
            </button>
          ))}
        </div>
        <ul className="mb-4 -space-y-px">{renderedLists}</ul>
        {totalPages >= 2 && <Pagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />}
        <Outlet />
      </div>
    </>
  );
};

export default Show;
