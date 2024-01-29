import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <header>
        <nav>
          <Link to="/">
            <h1 className="text-4xl font-bold">AI Coding Test</h1>
          </Link>
        </nav>
      </header>
    </>
  );
};

export default Header;
