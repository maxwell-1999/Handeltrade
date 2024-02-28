import * as React from 'react';

function CrossIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={15} height={15} fill="none" {...props}
    >
      <rect width="14.7253" height="14.7253" rx="7.36264" fill="#F6F7FC" />
      <path
        d="M9.48586 5.19505L10.0515 5.68718L5.1933 10.1565L4.62766 9.66442L9.48586 5.19505ZM5.00175 5.15381L10.3077 9.77026L9.72356 10.3077L4.4176 5.69121L5.00175 5.15381Z"
        fill="#999A9D"
      // stroke="#999A9D"
      // stroke-width="0.368132"
      />

    </svg>
  );
}

export const MemoCrossIcon = React.memo(CrossIcon);
