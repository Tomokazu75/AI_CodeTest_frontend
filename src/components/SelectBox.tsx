import { Dispatch, SetStateAction } from "react";
import Select from "react-select";

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

type SelectBoxProps = {
  user: { age: string, lang: string, option: string };
  setUser: Dispatch<SetStateAction<{ age: string; lang: string; option: string; }>>
}

const SelectBox = ({user, setUser}: SelectBoxProps) => {
  const handleSelect1 = (selectedOption: any) => {
    setUser({ ...user, age: selectedOption.value });
  };

  const handleSelect2 = (selectedOption: any) => {
    setUser({ ...user, lang: selectedOption.value });
  };
  return (
    <>
      <Select
        options={options2}
        onChange={handleSelect2}
        placeholder="プログラミング言語/フレームワーク"
        className="w-1/4"
      />
      <Select
        options={options1}
        onChange={handleSelect1}
        placeholder="テストレベル"
        className="w-1/4"
      />
    </>
  );
};

export default SelectBox;
