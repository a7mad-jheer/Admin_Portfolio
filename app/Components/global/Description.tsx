export const Description = ({
  text,
  style,
}: {
  text: string;
  style?: string;
}) => {
  return (
    <div className="mb-16 flex items-center justify-center">
      <h1
        className={`
          relative inline-block
          text-2xl md:text-3xl text-center
          font-semibold
          text-purple-100
          tracking-wide
          ${style}
        `}
      >
        {text}

        <span className="absolute left-0 -bottom-3 h-1 w-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500" />
      </h1>
    </div>
  );
};

export default Description;
