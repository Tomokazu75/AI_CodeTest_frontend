type QuestionProps = {
  title: string;
  question: string;
}

const Question = ({title, question}: QuestionProps) => {
  return (
    <>
      <div className="bg-blue-200 text-xl">{title}</div>
      <div className="text-lg">{question}</div>
    </>
  );
};

export default Question;
