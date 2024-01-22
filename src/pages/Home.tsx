import { useState } from "react";
import OpenAI from "openai";
import Select from "react-select";
import Question from "../components/Question";
import Answer from "../components/Answer";

interface OptionType {
  value: string;
  label: string;
}

const options1: OptionType[] = [
  { value: "未経験", label: "初級" },
  { value: "経験年数3年", label: "中級" },
  { value: "経験年数10年", label: "上級" },
];

const options2: OptionType[] = [
  { value: "Ruby", label: "Ruby" },
  { value: "Rails", label: "Rails" },
  { value: "TypeScript", label: "TypeScript" },
  { value: "React", label: "React" },
  { value: "Golang", label: "Go言語" },
];

//ここから
const Home = () => {
  //SelectBox
  const [user, setUser] = useState({ age: "", lang: "", option: "" });
  const handleSelect1 = (selectedOption: any) => {
    setUser({ ...user, age: selectedOption.value });
  };
  const handleSelect2 = (selectedOption: any) => {
    setUser({ ...user, lang: selectedOption.value });
  };

  //OpenAI APIとの通信
  const [data, setData] = useState("");
  const questions = data.split("$$");
  //questions配列は["", "問題1", "問題1の中身", "回答1", "回答1の中身"...]

  const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  const role =
    `あなたは超大手IT企業の採用担当で、優秀なエンジニアを見極めるためのコーディングテストを作成するエキスパートです。今回は${user.age}レベルのWebエンジニアの採用を担当しています。`;
  const order = `
    #お願い
    以下の条件を踏まえて、${user.lang}に関する3種類のコーディングテストを作成してください。
    ・3種類とも異なる観点から出題し、受験者のコーディングスキルをしっかりと把握できる問題にしてください。
    ・各問題は100文字程度で作成してください。
    ${
      user.option &&
      "・少なくとも1問は" + user.option + "に関する問題を入れてください。"
    }
    
    #出力
    以下の形式で問題と解答を併せて出力してください。
    以下に指定した通り必ず問題と解答の前後に半角で$$をつけてください。
    $$問題1$$
    $$解答1$$
    
    $$問題2$$
    $$解答2$$
    
    $$問題3$$
    $$解答3$$
    `;

  const handleOpenai = async () => {
    setDisplay("block");
    const completion: any = await openai.chat.completions.create({
      messages: [
        { role: "system", content: role },
        { role: "user", content: order },
      ],
      model: "gpt-3.5-turbo-16k",
    });
    setData(completion.choices[0].message.content);
    setDisplay("hidden");
  };

  const [display, setDisplay] = useState("hidden");

  return (
    <>
      <div>
        <Select
          options={options2}
          onChange={handleSelect2}
          placeholder="プログラミング言語/フレームワーク"
        />
        <Select
          options={options1}
          onChange={handleSelect1}
          placeholder="テストレベル"
        />
        <input
          type="text"
          value={user.option}
          onChange={(e) => setUser({ ...user, option: e.target.value })}
          className="p-2 border border-gray-400 border-solid"
          placeholder="タグ機能etc..."
        />
        <button
          className="bg-green-400 p-2 border border-solid border-gray-400"
          onClick={handleOpenai}
        >
          ask to AI
        </button>
        <p className={`${display}`}>asking...</p>
      </div>
      <Question title={questions[1]} question={questions[2]} />
      <Answer title={questions[3]} answer={questions[4]} />
      <Question title={questions[5]} question={questions[6]} />
      <Answer title={questions[7]} answer={questions[8]} />
      <Question title={questions[9]} question={questions[10]} />
      <Answer title={questions[11]} answer={questions[12]} />
    </>
  );
};

export default Home;
