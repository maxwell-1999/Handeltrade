import * as React from 'react';

function MoreDropdownIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M6.2803 1L3.99167 3.47233L1.70304 1L1 1.76113L3.99167 5L5.4875 3.38057L6.98334 1.76113L6.2803 1Z" fill="#8F95A4" stroke="#8F95A4" stroke-width="0.2" />
    </svg>
  );
}

const MemoMoreDropdownIcon = React.memo(MoreDropdownIcon);
export default MemoMoreDropdownIcon;
