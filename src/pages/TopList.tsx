import Frameworks from "../components/Frameworks";
import Languages from "../components/Languages";

const TopList = () => {
  return (
    <div className="w-1/2 flex">
      <Languages />
      <Frameworks />
    </div>
  );
};

export default TopList;
