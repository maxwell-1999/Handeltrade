import * as React from 'react';

function RedirectIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={8} height={8} fill="none" {...props}>
      <path
        d="M5.142 0a.573.573 0 00-.406.977l.74.737-2.452 2.454a.572.572 0 00.81.809l2.45-2.454.74.74A.572.572 0 008 2.857V.57A.57.57 0 007.428 0H5.142zM1.428.571C.64.571 0 1.211 0 2v4.571C0 7.361.64 8 1.428 8h4.57c.79 0 1.429-.64 1.429-1.429V5.143a.57.57 0 10-1.143 0V6.57A.287.287 0 016 6.857h-4.57a.287.287 0 01-.286-.286V2c0-.157.128-.286.285-.286h1.429a.57.57 0 100-1.143H1.428z"
        fill="currentColor"
      />
    </svg>
  );
}

const MemoRedirectIcon = React.memo(RedirectIcon);
export default MemoRedirectIcon;
