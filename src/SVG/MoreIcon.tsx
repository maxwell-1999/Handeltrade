import * as React from 'react';

function MoreIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={16} height={20} fill="none" {...props}>
      <rect width={16} height={20} rx={5} fill="#7D38ED" fillOpacity={0.1} />
      <g clipPath="url(#prefix__clip0_8_1014)">
        <path
          d="M6.86 12.588a.343.343 0 01-.313-.209.337.337 0 01.074-.368L8.63 10l-2.01-2.011a.338.338 0 11.478-.478l2.25 2.25a.338.338 0 010 .478l-2.25 2.25a.343.343 0 01-.24.098z"
          fill="#0D0D0D"
          stroke="#7D38ED"
        />
      </g>
      <defs>
        <clipPath id="prefix__clip0_8_1014">
          <path
            fill="#fff"
            transform="translate(4.4 6.4)"
            d="M0 0h7.2v7.2H0z"
          />
        </clipPath>
      </defs>
    </svg>
  );
}

const MemoMoreIcon = React.memo(MoreIcon);
export default MemoMoreIcon;
