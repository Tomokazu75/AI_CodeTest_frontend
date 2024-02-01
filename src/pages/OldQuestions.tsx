import { useParams } from "react-router-dom";
import Questions from "../components/Questions";
import { Post } from "../types/post";

type OldQuestionsProps = {
  posts: Post[];
};
const OldQuestions = ({ posts }: OldQuestionsProps) => {
  const { postId } = useParams();
  const findQuestions = posts.find((post) => {
    return String(post.id) === postId;
  });
  if (!findQuestions) {
    return (
      <>
        {" "}
        <div>該当する質問が見つかりませんでした。</div>{" "}
      </>
    );
  }
  const oldQuestions = findQuestions.data.split("$$");
  const questions = [
    { question: oldQuestions[2], answer: oldQuestions[4] },
    { question: oldQuestions[6], answer: oldQuestions[8] },
    {question: oldQuestions[10], answer: oldQuestions[12]}
  ];
  return (
    <>
      <Questions questions={questions} />
    </>
  );
};

export default OldQuestions;
