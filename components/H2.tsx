const H2 = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <h2 className={`font-semibold text-2xl mb-5 ${className}`}>{children}</h2>
  );
};

export default H2;
