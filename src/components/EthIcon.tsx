import * as React from 'react';

function EthIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={7} height={5} fill="none" {...props}>
      <path
        d="M6.04.297L3.623 2.903 1.202.297.46 1.1l3.163 3.414 1.58-1.707L6.785 1.1 6.04.297z"
        fill="#8F95A4"
      />
    </svg>
  );
}

const MemoEthIcon = React.memo(EthIcon);
export default MemoEthIcon;
