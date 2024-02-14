import "./App.css";
import Home from "./pages/Home";
import Header from "./pages/Header";

function App() {
  return (
    <>
      <Header />
      <div className="h-screen">
        <div className="flex text-gray-800">
          <Home />
        </div>
      </div>
    </>
  );
}

export default App;
