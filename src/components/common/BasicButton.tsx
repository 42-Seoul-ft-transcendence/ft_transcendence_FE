import React from 'react';

type Props = {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string; // 추가 스타일도 받을 수 있게
};

function BasicButton({ onClick, children, className = '' }: Props) {
  return (
    <button
      onClick={onClick}
      className={`bg-[#444242] text-white px-4 py-2 rounded ${className}`}
    >
      {children}
    </button>
  );
}

export default BasicButton;
