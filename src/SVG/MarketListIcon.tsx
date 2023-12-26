import * as React from 'react';

function MarketListIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={26} height={26} fill="none" {...props}>
      <path
        d="M11.375 4.063h-6.5a.812.812 0 00-.813.812v8.233a.813.813 0 00.813.813h6.5a.813.813 0 00.813-.813V4.875a.812.812 0 00-.813-.813zm-.813 8.233H5.689V5.688h4.875v6.608zm10.563-8.233h-6.5a.812.812 0 00-.813.812v4.767a.812.812 0 00.813.812h6.5a.812.812 0 00.813-.812V4.875a.812.812 0 00-.813-.813zm-.813 4.766h-4.875V5.687h4.876V8.83zm-8.937 6.717h-6.5a.812.812 0 00-.813.812v4.767a.812.812 0 00.813.813h6.5a.812.812 0 00.813-.813v-4.767a.812.812 0 00-.813-.812zm-.813 4.767H5.689V17.17h4.875v3.142zm10.563-8.234h-6.5a.813.813 0 00-.813.813v8.233a.812.812 0 00.813.813h6.5a.812.812 0 00.813-.813v-8.233a.813.813 0 00-.813-.813zm-.813 8.233h-4.875v-6.608h4.876v6.608z"
        fill="currentColor"
      />
    </svg>
  );
}

const MemoMarketListIcon = React.memo(MarketListIcon);
export default MemoMarketListIcon;
