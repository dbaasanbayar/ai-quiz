type ButtonProps = {
  variant: boolean;
  text: string;
  ready: boolean;
  clickHandler: any;
};

export const Button = ({ ready, variant, text, clickHandler }: ButtonProps) => {
  const colorClass = ready ? "bg-[#18181B]" : "bg-gray-500 cursor-not-allowed";
  if (variant) {
    return (
      <button
        onClick={clickHandler}
        className={`w-40 h-10 text-white ${colorClass} rounded-md`}
        disabled={!ready}
      >
        {text}
      </button>
    );
  }
  return (
    <button className="w-40 h-10 text-white rounded-md bg-[#18181B]">
      {text}
    </button>
  );
};
