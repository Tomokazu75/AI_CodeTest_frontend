import { Link } from "react-router-dom";
import { frameworks } from "../data/framworks";

const Frameworks = () => {
  return (
    <div className="w-1/2 text-center">
      <h1 className="text-2xl font-bold">フレームワーク</h1>
      <ul className="grid grid-cols-2">
        {frameworks.map((framework) => (
          <li key={framework}><Link to={`/${framework}`}>{framework}</Link></li>
        ))}
      </ul>
    </div>
  );
};

export default Frameworks;
