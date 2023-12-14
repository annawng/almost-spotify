const H1 = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <h1
      className={`${className} font-semibold lg:font-bold text-3xl md:text-4xl`}
    >
      {children}
    </h1>
  );
};

export default H1;
