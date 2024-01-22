type AnswerProps = {
  title: string;
  answer: string;
}

const Answer = ({ title, answer }:AnswerProps) => {
  return (
    <>
      <div className="bg-red-200 text-xl">{title}</div>
      <div className="text-lg">{answer}</div>
    </>
  );
};

export default Answer;
