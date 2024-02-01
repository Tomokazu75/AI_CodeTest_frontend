import { Dispatch, SetStateAction } from "react";
import Select from "react-select";
import { langs } from "../data/languages";
import { frameworks } from "../data/framworks";

interface OptionType {
  value: string;
  label: string;
}

const langList = langs.map((lang) => ({ value: lang, label: lang }));
const frameworkList = frameworks.map((framework) => ({ value: framework, label: framework }));
const langOrFrameSelection:OptionType[] = langList.concat(frameworkList)

const ageSelection: OptionType[] = [
  { value: "未経験", label: "初級" },
  { value: "経験年数3年", label: "中級" },
  { value: "経験年数10年", label: "上級" },
];

type SelectBoxProps = {
  user: { age: string, lang: string, option: string };
  setUser: Dispatch<SetStateAction<{ age: string; lang: string; option: string; }>>
}

const SelectBox = ({ user, setUser }: SelectBoxProps) => {
  const handleSelect1 = (selectedOption: any) => {
    setUser({ ...user, lang: selectedOption.value });
  };

  const handleSelect2 = (selectedOption: any) => {
    setUser({ ...user, age: selectedOption.value });
  };
  
  return (
    <>
      <Select
        options={langOrFrameSelection}
        onChange={handleSelect1}
        placeholder="プログラミング言語/フレームワーク"
        className="w-1/2 mx-auto mb-4"
      />
      <Select
        options={ageSelection}
        onChange={handleSelect2}
        placeholder="テストレベル"
        className="w-1/2 mx-auto mb-4"
      />
    </>
  );
};

export default SelectBox;
