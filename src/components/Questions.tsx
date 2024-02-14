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
    <div className="border border-gray-300 m-4 rounded-xl shadow-lg">
      <nav className="flex flex-col sm:flex-row text-gray-400">
        {[0, 1, 2].map((idx) => (
          <button
            key={idx}
            onClick={() => {
              setTabIndex(idx);
              setVisible(false);
            }}
            className={`rounded-t-xl py-4 px-6 font-bold block border-b-4 border-white hover:text-blue-500 focus:outline-none ${
              tabIndex === idx && "text-gray-800 border-blue-400"
            }`}
          >
            問題 {idx + 1}
          </button>
        ))}
      </nav>
      <p className="p-2 whitespace-pre-wrap">{questions[tabIndex].question}</p>
      <button
        className={`${!visible && "text-red-400 border-red-400"} m-4 p-2 rounded-xl border border-solid hover:bg-gray-100`}
        onClick={() => setVisible(!visible)}
      >
        {visible ? "解答を閉じる" : "解答を見る"}
      </button>
      {visible && <p className="text-red-400 p-2 whitespace-pre-wrap">{questions[tabIndex].answer}</p>}
    </div>
  );
};

export default Questions;
