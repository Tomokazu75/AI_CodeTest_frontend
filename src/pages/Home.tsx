import { useEffect, useState } from "react";
import { Post } from "../types/post";
import { createPost, getAllPosts } from "../api/post";
import SelectBox from "../components/SelectBox";
import OpenAI from "openai";
import { Route, Routes } from "react-router-dom";
import TopList from "./TopList";
import Show from "./Show";
import Questions from "../components/Questions";
import OldQuestions from "./OldQuestions";
import coding from "../assets/coding.svg";

const Home = () => {
  const [post, setPost] = useState<Post>({
    id: 0,
    age: "",
    lang: "",
    option: "",
    data: "",
    createdAt: "",
  });

  const [posts, setPosts] = useState<Post[]>([]);

  const handleGetAllPosts = async () => {
    try {
      const res = await getAllPosts();
      setPosts(res.data);
      console.log("posts is set to", res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetAllPosts();
  }, []);

  //OpenAI APIとの通信
  // const [data, setData] = useState("");
  let qanda = post.data.split("$$");
  //questions配列は["", "問題1", "問題1の中身", "回答1", "回答1の中身"...]
  const questions = [
    { question: qanda[2], answer: qanda[4] },
    { question: qanda[6], answer: qanda[8] },
    { question: qanda[10], answer: qanda[12] },
  ];

  const [user, setUser] = useState({ age: "", lang: "", option: "" });

  const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  const role = `あなたは超大手IT企業の採用担当で、優秀なエンジニアを見極めるためのコーディングテストを作成するエキスパートです。今回は${user.age}のWebエンジニアの採用を担当しています。`;

  const order = `
  #お願い
  以下の条件と出力形式を必ず踏まえて、${user.lang}に関する3種類のコーディングテストを作成してください。

  #条件
  ・3種類とも異なる観点から出題し、受験者のコーディングスキルをしっかりと把握できる問題にしてください。
  ・各問題は100文字程度で作成してください。
  ${
    user.option &&
    "・少なくとも1問は" + user.option + "に関する問題を入れてください。"
  }
  
  #出力形式
  以下の形式で問題と解答をセットで、必ず3問出力してください。
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
    console.log(completion.choices[0]);
    setDisplay("hidden");
    setImage(false);
    //postオブジェクトを作成
    const newPost = {
      id: 0,
      age: user.age,
      lang: user.lang,
      option: user.option,
      data: completion.choices[0].message.content,
      createdAt: "",
    };
    setPost(newPost);
    try {
      const res = await createPost(newPost);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const [display, setDisplay] = useState("hidden"); //スピナー用
  const [image, setImage] = useState(true); //image用

  return (
    <>
      <div className="w-1/2">
        <div className="bg-gray-200 py-2 m-4 rounded-xl shadow-lg">
          <h1 className="text-2xl font-bold ml-2 mb-2 text-blue-400">How to use</h1>
          <p className="px-2 font-bold text-gray-800 text-lg mb-4">
            プログラミング言語かフレームワーク、テストレベルを選択し、問題に含めたい事柄を自由に入力してコーディングテストを始めましょう！
          </p>
          <SelectBox user={user} setUser={setUser} />
          <input
            type="text"
            value={user.option}
            onChange={(e) => setUser({ ...user, option: e.target.value })}
            className="p-2 rounded-md border border-gray-300 border-solid w-1/2 block mx-auto mb-4"
            placeholder="オプション(タグ機能etc...)"
          />
          <button
            className="text-white font-bold bg-gradient-to-r from-green-400 to-blue-400 hover:from-green-500 hover:to-blue-500 rounded-lg px-8 py-2 border border-solid border-gray-400 block mx-auto mb-4"
            onClick={handleOpenai}
          >
            Create with AI
          </button>
          <p className={`${display}`}>asking...</p>
        </div>
        {image ? (
          <img src={coding} width="50%" height="50%" className="mx-auto p-4" />
        ) : (
          <Questions questions={questions} />
        )}
      </div>
      <Routes>
        <Route path="/" element={<TopList posts={posts} />} />
        <Route
          path=":name"
          element={<Show posts={posts} setPosts={setPosts} />}
        >
          <Route path=":postId" element={<OldQuestions posts={posts} />} />
        </Route>
      </Routes>
    </>
  );
};

export default Home;
