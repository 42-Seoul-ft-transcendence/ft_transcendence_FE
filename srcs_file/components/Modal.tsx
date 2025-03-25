import Button from "./Button"

type ModalProps = {
	isOpen: boolean
	onClose: () => void
	children: React.ReactNode
}
  
export function Modal({ isOpen, onClose, children }: ModalProps) {
	if (!isOpen) return null // 모달이 닫혀 있으면 렌더링 안 함
  
	return (
		<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
			{/* 모달 박스 */}
			<div className="bg-white p-6 rounded-lg shadow-lg w-96">
		  		{children}
		  		<Button 
					text="닫기"
					onClick={onClose} 
					className="mt-4 px-4 py-2 bg-gray-300 rounded"
				/>
			</div>
	  	</div>
	)
}