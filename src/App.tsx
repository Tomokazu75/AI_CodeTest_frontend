import "./App.css";
import Home from "./pages/Home";
import Header from "./pages/Header";

function App() {
  return (
    <>
      <Header />
      <div className="bg-gray-200 h-screen">
        <div className="flex">
          <Home />
        </div>
      </div>
    </>
  );
}

export default App;
