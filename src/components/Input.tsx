import React from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";

type Props = {
  labelName: string;
  inputType: string;
  placeholder?: string;
  Id: string;
  register: UseFormRegister<FieldValues>
  
};

export default function Input(prop: Props) {
  
  return (
    <div className="flex flex-col">
      <label className="font-semibold  text-[#515B6F] pb-2" htmlFor={prop.Id}> {prop.labelName}</label>
      <input
      className=" caret-gray-300 caret py-4 px-3  rounded-lg w-[408px]  outline-none border border-gray-300  focus:border "
        type={prop.inputType}
        id={prop.Id}
        name={prop.labelName}
        placeholder={prop.placeholder}
      />
    </div>
  );
}
