import { Link } from "react-router-dom";
import { frameworks } from "../data/framworks";
import { Post } from "../types/post";

type FrameworksProps = {
  posts: Post[];
};

const Frameworks = ({ posts }: FrameworksProps) => {
  const countQ = (lang: string) =>
    posts.filter((post) => post.lang === lang).length;
  return (
    <div className="w-1/2 text-center">
      <h1 className="text-2xl font-bold p-4 text-purple-400">フレームワーク</h1>
      <ul className="grid grid-cols-2 gap-2">
        {frameworks.map((framework) => (
          <li
            key={framework}
            
          >
            <Link to={`/${framework}`} className="bg-gray-200 block rounded-full p-3 mx-2 border border-white hover:bg-purple-400 hover:text-white">
              {framework} ({countQ(framework)})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Frameworks;
