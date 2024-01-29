import { Link, Outlet, useParams } from "react-router-dom";
import { Post } from "../types/post";
import { useState } from "react";

type ShowProps = {
  posts: Post[];
  setPosts: (posts: Post[]) => void;
};

const Show = ({ posts }: ShowProps) => {
  const { name } = useParams();

  const [age, setAge] = useState("未経験");

  const handleChangeAge = (age: string) => {
    setAge(age);
  };

  const lists = posts
    .filter((p) => p.lang === name && p.age === age)
    .map((post) => (
      <li
        key={post.id}
        className="bg-white flex gap-2 p-2 border border-gray-400 border-solid rounded-lg"
      >
        <Link to={`/${name}/${post.id}`}>
          <div>id: {post.id}</div>
          <div>作成日: {post.createdAt}</div>
          <div>option: {post.option}</div>
        </Link>
      </li>
    ));

  return (
    <>
      <div className="w-1/2">
        <h1 className="text-2xl font-bold text-center">{name}</h1>
        <div className="text-center">
          <button onClick={() => handleChangeAge("未経験")}>初級</button>
          <button onClick={() => handleChangeAge("経験年数3年")}>中級</button>
          <button onClick={() => handleChangeAge("経験年数10年")}>上級</button>
        </div>
        <ul>{lists}</ul>
        <Outlet />
      </div>
    </>
  );
};

export default Show;
