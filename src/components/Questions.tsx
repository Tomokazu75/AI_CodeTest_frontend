import { useState } from "react";

// type QANDA = {
//   question: string;
//   answer: string;
// };

type QuestionsProps = {
  questions: string[];
};

const Questions = ({ questions }: QuestionsProps) => {

  const [index, setIndex] = useState("問題1");
  const qText = () => {
    if (index === "問題1") {
      return questions[2]
    } else if (index === "問題2") {
      return questions[6]
    } else {
      return questions[10]
    }
  }
  
  const aText = () => {
    if (index === "問題1") {
      return questions[2]
    } else if (index === "問題2") {
      return questions[6]
    } else {
      return questions[10]
    }
  }

  const handleChangeQuestion = (index: string) => {
    setIndex(index);
    setVisible(false);
  };

  const [visible, setVisible] = useState(false);

  return (
    <div className="bg-white">
      <nav className="flex flex-col sm:flex-row">
        <button
          onClick={() => handleChangeQuestion("問題1")}
          className="text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none border-b-2 font-medium border-blue-500"
        >
          問題1
        </button>
        <button
          onClick={() => handleChangeQuestion("問題2")}
          className="text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none"
        >
          問題2
        </button>
        <button
          onClick={() => handleChangeQuestion("問題3")}
          className="text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none"
        >
          問題3
        </button>
      </nav>
      <p className="p-2 whitespace-pre-wrap">{qText()}</p>
      <button
        className="text-red-400 border border-solid border-red-400"
        onClick={() => setVisible(!visible)}
      >
        解答を見る
      </button>
      {visible && <p className="p-2  whitespace-pre-wrap">{aText()}</p>}
    </div>
  );
};

export default Questions;
