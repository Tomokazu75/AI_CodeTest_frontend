import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <header className="bg-gray-800">
        <Link to="/">
          <h1 className="title">AI Coding Test</h1>
        </Link>
      </header>
    </>
  );
};

export default Header;
