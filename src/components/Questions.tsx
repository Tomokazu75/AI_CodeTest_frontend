import { useState } from "react";

type QandA = {
  question: string;
  answer: string;
};

type QuestionsProps = {
  questions: QandA[];
};

const Questions = ({ questions }: QuestionsProps) => {
  const [tabIndex, setTabIndex] = useState(0);

  const [visible, setVisible] = useState(false);

  return (
    <div className="bg-white mx-4">
      <nav className="flex flex-col sm:flex-row">
        {[0, 1, 2].map((idx) => (
          <button
            key={idx}
            onClick={() => {
              setTabIndex(idx);
              setVisible(false);
            }}
            className={`text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none ${
              tabIndex === idx && "bg-red-400"
            }`}
          >
            問題{idx + 1}
          </button>
        ))}
      </nav>
      <p className="p-2 whitespace-pre-wrap">{questions[tabIndex].question}</p>
      <button
        className="text-red-400 border border-solid border-red-400"
        onClick={() => setVisible(!visible)}
      >
        解答を見る
      </button>
      {visible && <p className="p-2  whitespace-pre-wrap">{questions[tabIndex].answer}</p>}
    </div>
  );
};

export default Questions;
