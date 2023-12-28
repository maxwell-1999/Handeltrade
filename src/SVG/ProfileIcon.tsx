import * as React from 'react';

function ProfileIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={26} height={26} fill="none" {...props}>
      <path
        d="M23.552 21.531a12.258 12.258 0 00-6.814-5.504A7.314 7.314 0 0013 2.429a7.313 7.313 0 00-3.737 13.598 12.258 12.258 0 00-6.815 5.504.813.813 0 101.401.813 10.573 10.573 0 0118.302 0 .81.81 0 001.14.351.811.811 0 00.261-1.164zM7.312 9.751a5.687 5.687 0 1111.376 0 5.687 5.687 0 01-11.375 0z"
        fill="#8F95A4"
      />
    </svg>
  );
}

const MemoProfileIcon = React.memo(ProfileIcon);
export default MemoProfileIcon;
