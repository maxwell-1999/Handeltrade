import * as React from 'react';

function AddMarkets(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={18} height={18} fill="none" {...props}>
      <path
        d="M10.125 7.875V0h-2.25v7.875H0v2.25h7.875V18h2.25v-7.875H18v-2.25h-7.875z"
        fill="currentColor"
      />
    </svg>
  );
}

const MemoAddMarkets = React.memo(AddMarkets);
export default MemoAddMarkets;
