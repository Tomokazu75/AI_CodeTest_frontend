import Frameworks from "../components/Frameworks";
import Languages from "../components/Languages";
import { Post } from "../types/post";

type TopListProps = {
  posts: Post[];
}
const TopList = ({posts}: TopListProps) => {
  return (
    <div className="w-1/2 flex divide-gray-200 divide-x-2 divide-dashed">
      <Languages posts={posts} />
      <Frameworks posts={posts}/>
    </div>
  );
};

export default TopList;
