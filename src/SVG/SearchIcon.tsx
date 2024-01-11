import * as React from 'react';

function SearchIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={22} height={22} fill="none" {...props}>
      <path
        d="M19.74 18.76l-3.721-3.712a7.924 7.924 0 10-.971.97l3.712 3.722a.705.705 0 00.98 0 .696.696 0 000-.98zM3.437 9.97A6.531 6.531 0 119.97 16.5a6.54 6.54 0 01-6.532-6.531z"
        fill="#0D0D0D"
      />
    </svg>
  );
}

const MemoSearchIcon = React.memo(SearchIcon);
export default MemoSearchIcon;
