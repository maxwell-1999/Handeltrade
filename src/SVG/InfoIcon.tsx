function InfoIcon(props) {
  return (
    <svg
      width={13}
      height={13}
      fill="none"
      xmlns="http://www.w3.org/2000/svg" // {...props}
    >
      <circle cx={6.901} cy={6.36} r={6} fill="#c0c1ca" />
      <path
        d="M6.352 9.595V4.968h1.09v4.627h-1.09ZM6.9 4.311a.636.636 0 0 1-.446-.172.554.554 0 0 1-.186-.418c0-.165.062-.305.186-.42a.63.63 0 0 1 .446-.174c.175 0 .324.058.446.175a.547.547 0 0 1 .187.419.554.554 0 0 1-.187.418.63.63 0 0 1-.446.172Z"
        fill="white"
      />
    </svg>
  );
}

export default InfoIcon;
