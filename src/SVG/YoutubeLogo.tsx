import * as React from 'react';

function YoutubeLogo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={29} height={26} fill="none" {...props}>
      <path
        d="M26.1 18.363c-.242 1.137-1.269 2.004-2.538 2.166-1.993.271-5.316.596-9.062.596a71.67 71.67 0 01-9.063-.596C4.17 20.367 3.143 19.5 2.9 18.363c-.242-1.246-.483-3.088-.483-5.363 0-2.275.241-4.117.483-5.362C3.142 6.5 4.169 5.633 5.438 5.47a69.997 69.997 0 019.062-.596c3.746 0 7.008.325 9.063.596 1.268.162 2.295 1.029 2.537 2.167.242 1.245.544 3.087.544 5.362-.06 2.275-.302 4.117-.544 5.363z"
        fill="#FF3D00"
      />
      <path d="M12.083 16.792V9.208L19.333 13l-7.25 3.792z" fill="#fff" />
    </svg>
  );
}

const MemoYoutubeLogo = React.memo(YoutubeLogo);
export default MemoYoutubeLogo;
