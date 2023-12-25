import * as React from 'react';

function TImerIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={12} height={12} fill="none" {...props}>
      <path
        d="M6 1a5 5 0 105 5 5.01 5.01 0 00-5-5zm0 9.23a4.23 4.23 0 110-8.46 4.23 4.23 0 010 8.46zM9.077 6a.385.385 0 01-.385.385H6A.385.385 0 015.615 6V3.308a.385.385 0 01.77 0v2.307h2.307A.385.385 0 019.077 6z"
        fill="#8F95A4"
        stroke="#8F95A4"
        strokeWidth={0.5}
      />
    </svg>
  );
}

const MemoTImerIcon = React.memo(TImerIcon);
export default MemoTImerIcon;
