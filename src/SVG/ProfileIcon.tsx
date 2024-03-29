import * as React from 'react';

function ProfileIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={30} height={30} fill="none" {...props}>
      <rect
        width={29.994}
        height={29.994}
        rx={5}
        fill={props.active ? '#DBE7FF' : 'transperent'}
      />
      <path
        d="M18.13 10.41c0-.73-.28-1.432-.78-1.949a2.622 2.622 0 00-1.886-.807c-.707 0-1.385.29-1.885.807-.5.517-.78 1.219-.78 1.95 0 .73.28 1.432.78 1.949.5.517 1.178.807 1.885.807.707 0 1.385-.29 1.885-.807.5-.517.781-1.218.781-1.95zm-6.931 0c0-1.17.45-2.291 1.25-3.118A4.195 4.195 0 0115.463 6c1.132 0 2.216.465 3.016 1.292.8.827 1.25 1.949 1.25 3.119 0 1.17-.45 2.291-1.25 3.119a4.195 4.195 0 01-3.016 1.291 4.195 4.195 0 01-3.016-1.291 4.488 4.488 0 01-1.249-3.12zM9.643 21.99h11.643c-.297-2.181-2.11-3.86-4.299-3.86h-3.046c-2.189 0-4.002 1.679-4.298 3.86zM8 22.619c0-3.394 2.66-6.144 5.941-6.144h3.046c3.282 0 5.942 2.75 5.942 6.144 0 .566-.444 1.024-.99 1.024H8.989c-.546 0-.989-.458-.989-1.024z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={0.4}
      />
    </svg>
  );
}

const MemoProfileIcon = React.memo(ProfileIcon);
export default MemoProfileIcon;
