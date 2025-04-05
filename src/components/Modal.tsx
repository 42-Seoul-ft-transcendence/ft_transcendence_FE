type ModalProps = {
	isOpen: boolean
	onClose: () => void
	className?: string
	children: React.ReactNode
}
  
export function Modal({ isOpen, onClose, className="", children }: ModalProps) {
	if (!isOpen) return null // 모달이 닫혀 있으면 렌더링 안 함
  
	return (
		<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
			{/* 모달 박스 */}
			<div className={`bg-white p-6 rounded-lg shadow-lg w-96 ${className}`}>
		  	{children}
		  	<button
					onClick={onClose} 
					className="px-4 py-2 text-white bg-gray-300 hover:bg-gray-500 transition mt-4 rounded"
				>
					닫기
				</button>
			</div>
	  	</div>
	)
}

export default Modal