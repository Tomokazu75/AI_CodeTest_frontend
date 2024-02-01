import { Link } from "react-router-dom";
import { langs } from "../data/languages";

const Languages = () => {
  return (
    <div className="w-1/2 text-center bg-gray-300">
      <h1 className="text-2xl font-bold">プログラミング言語</h1>
      <ul className="grid grid-cols-2 gap-2">
        {langs.map((lang) => (
          <li key={lang} className={`text-gray-200 rounded-full p-3 mx-2 ${lang}`}>
            <Link to={`/${lang}`}>{lang}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Languages;
