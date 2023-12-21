const ErrorPage: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return <div className="bg-red">{children}</div>;
};

export { ErrorPage };
