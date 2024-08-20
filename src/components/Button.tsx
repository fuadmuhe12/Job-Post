import React from "react";

type Props = {
  buttonName: string;
};

const Button = (props: Props) => {
  return (
    <button
      type="submit"
      value={props.buttonName}
      className="py-3 px-6 bg-[#4640DE] text-white rounded-[80px] w-full"
    >
      Continue
    </button>
  );
};

export default Button;
