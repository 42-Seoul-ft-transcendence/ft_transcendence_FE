type ButtonProps = {
	text: string;
	onClick: () => void; // 클릭 시 실행할 함수
	className?: string; // 스타일을 동적으로 적용할 수 있도록 설정
  };
  
  const Button = ({ text, onClick, className = "" }: ButtonProps) => {
	return (
	  <button
		onClick={onClick} // 클릭 이벤트 핸들러 적용
		className={`px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition ${className}`}
	  >
		{text}
	  </button>
	);
  };
  
  export default Button