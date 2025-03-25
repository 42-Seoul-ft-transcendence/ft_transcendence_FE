// 	type: React.HTMLInputTypeAttribute | undefined // text (기본값): 일반 텍스트 입력, password: 비밀번호 입력 (●●● 표시), email: 이메일 주소 입력, number: 숫자만 입력 가능, tel: 전화번호 입력, url: URL 입력
// 	placeholder?: string // 입력 전 표시할 텍스트
// 	value: string | number | readonly string[] | undefined // 입력 값
// 	className?: string // 스타일을 동적으로 적용할 수 있도록 설정
// 	onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined // 값 변경 핸들러
// 	maxLength?: number // 글자 수 제한
// 	required?: boolean // 필수 입력 필드로 설정
type InputProps = React.InputHTMLAttributes<HTMLInputElement>
  
  const Input: React.FC<InputProps> = (props) => {
	return (
	  <input
	  	className="text-black opacity-100 placeholder-gray-400"
		{...props}
	  />
	);
  };
  
  export default Input