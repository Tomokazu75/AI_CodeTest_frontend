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
  const [data, setData] = useState("");
  const questions = data.split("$$");
  //questions配列は["", "問題1", "問題1の中身", "回答1", "回答1の中身"...]

  // useEffect(() => handleChangeQuestion(2), [data]);

  const [user, setUser] = useState({ age: "", lang: "", option: "" });

  const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  const role = `あなたは超大手IT企業の採用担当で、優秀なエンジニアを見極めるためのコーディングテストを作成するエキスパートです。今回は${user.age}レベルのWebエンジニアの採用を担当しています。`;

  const order = `
  #お願い
  以下の条件を踏まえて、${
    user.lang
  }に関する3種類のコーディングテストを作成してください。
  ・3種類とも異なる観点から出題し、受験者のコーディングスキルをしっかりと把握できる問題にしてください。
  ・各問題は100文字程度で作成してください。
  ${
    user.option &&
    "・少なくとも1問は" + user.option + "に関する問題を入れてください。"
  }
  
  #出力
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
    setData(completion.choices[0].message.content);
    console.log(completion.choices[0]);
    setDisplay("hidden");
    //postオブジェクトを作成
    setPost({
      id: 0,
      age: user.age,
      lang: user.lang,
      option: user.option,
      data: completion.choices[0].message.content,
      createdAt: "",
    });
  };

  const handleSavePost = async () => {
    try {
      const res = await createPost(post);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const [display, setDisplay] = useState("hidden");

  return (
    <>
      <div className="w-1/2">
        <p>
          (1)プログラミング言語/フレームワーク、(2)テストレベル、(3)オプションを入力してコーディングテストを行いましょう!
        </p>
        <div>
          <SelectBox user={user} setUser={setUser} />
          <input
            type="text"
            value={user.option}
            onChange={(e) => setUser({ ...user, option: e.target.value })}
            className="p-2 border border-gray-400 border-solid w-1/4"
            placeholder="オプション(タグ機能etc...)"
          />
          <button
            className="bg-green-400 p-2 border border-solid border-gray-400 block"
            onClick={handleOpenai}
          >
            ask to AI
          </button>
          <p className={`${display}`}>asking...</p>
        </div>
        <Questions questions={questions} />
        <button className="bg-red-400 p-4" onClick={handleSavePost}>
          保存する
        </button>
      </div>
      <Routes>
        <Route path="/" element={<TopList />} />
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
