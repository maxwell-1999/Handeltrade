import * as React from 'react';

function NodataImage(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={29} height={21} fill="none" {...props}>
      <rect width={29} height={5} rx={2.5} fill="#ECF2FE" />
      <rect y={8} width={29} height={5} rx={2.5} fill="#ECF2FE" />
      <rect y={16} width={29} height={5} rx={2.5} fill="#ECF2FE" />
    </svg>
  );
}

const MemoNodataImage = React.memo(NodataImage);
export default MemoNodataImage;
