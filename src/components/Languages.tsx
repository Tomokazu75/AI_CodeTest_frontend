import { Link } from "react-router-dom";
import { langs } from "../data/languages";
import { Post } from "../types/post";

type LanguagesProps = {
  posts: Post[];
}

const Languages = ({ posts }: LanguagesProps) => {
  const countQ = (lang: string) => posts.filter((post) => post.lang === lang).length

  return (
    <div className="w-1/2 text-center">
      <h1 className="text-2xl font-bold p-4 text-indigo-400">プログラミング言語</h1>
      <ul className="grid grid-cols-2 gap-2">
        {langs.map((lang) => (
          <li key={lang}>
            <Link to={`/${lang}`} className="bg-gray-200 block rounded-full p-3 mx-2 border border-white hover:bg-indigo-400 hover:text-white">{lang} ({countQ(lang)})</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Languages;
