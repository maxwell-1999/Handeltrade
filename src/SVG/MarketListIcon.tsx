import * as React from 'react';

function MarketListIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={30} height={30} fill="none" {...props}>
      <rect
        width={29.994}
        height={29.994}
        rx={5}
        transform="matrix(1 0 0 1 .003 .003)"
        fill={props.active ? '#DBE7FF' : 'transperent'}
      />
      <path
        d="M13.313 6h-6.5A.812.812 0 006 6.813v8.233a.813.813 0 00.813.812h6.5a.813.813 0 00.812-.812V6.813A.812.812 0 0013.312 6zm-.813 8.233H7.625V7.625H12.5v6.608zM23.063 6h-6.5a.812.812 0 00-.813.813v4.766a.812.812 0 00.813.813h6.5a.812.812 0 00.812-.813V6.812A.812.812 0 0023.062 6zm-.813 4.767h-4.875V7.625h4.875v3.142zm-8.938 6.716h-6.5a.812.812 0 00-.812.813v4.767a.812.812 0 00.813.812h6.5a.812.812 0 00.812-.813v-4.766a.812.812 0 00-.813-.813zM12.5 22.25H7.625v-3.142H12.5v3.142zm10.563-8.233h-6.5a.813.813 0 00-.813.812v8.233a.812.812 0 00.813.813h6.5a.812.812 0 00.812-.813V14.83a.813.813 0 00-.813-.812zm-.813 8.233h-4.875v-6.608h4.875v6.608z"
        fill="currentColor"
      />
    </svg>
  );
}

const MemoMarketListIcon = React.memo(MarketListIcon);
export default MemoMarketListIcon;
