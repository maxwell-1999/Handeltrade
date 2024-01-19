import * as React from 'react';

function AddMarkets(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={30} height={30} fill="none" {...props}>
      <rect
        width={29.994}
        height={29.994}
        rx={5}
        fill={props.active ? '#DBE7FF' : 'transperent'}
      />
      <path
        d="M16 14V7h-2v7H7v2h7v7h2v-7h7v-2h-7z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={0.6}
      />
    </svg>
  );
}

const MemoAddMarkets = React.memo(AddMarkets);
export default MemoAddMarkets;
