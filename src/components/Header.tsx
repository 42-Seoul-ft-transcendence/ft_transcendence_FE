import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import HeaderLogo from '../assets/header_logo.svg';
import InvitationIcon from '../assets/icon/invitation.svg';
import BuddyIcon from '../assets/icon/buddy.svg';
import MenuIcon from '../assets/icon/menu.svg';

type SideModalProps = {
  isOpen: boolean
  onClose: () => void
  children?: React.ReactNode
}

const Header = () => {
	const navigate = useNavigate()
  const [isMypageModal, setIsMypageModal] = useState<boolean>(false)
  const [isFriendModal, setIsFriendModal] = useState<boolean>(false)

	const handleMainButton = () => {
		navigate("/lobby")
	}

	return (
		<header className="fixed top-0 w-full flex items-center justify-between bg-black/70  h-24">
			<img src={HeaderLogo} alt="Header Logo" onClick={handleMainButton} className="cursor-pointer w-80 ml-0" />
			<nav className="space-x-4 flex flex-row mr-3">
				<img src={InvitationIcon} className='w-10 mr-3'/>
        <img src={BuddyIcon} onClick={() => setIsFriendModal(true)} className='w-10'/>
        <img src={MenuIcon} onClick={() => setIsMypageModal(true)} className='w-10'/>
			</nav>
      <MypageModal isOpen={isMypageModal} onClose={() => setIsMypageModal(false)} />
      <FriendModal isOpen={isFriendModal} onClose={() => setIsFriendModal(false)} />
		</header>
	)
}

const MypageModal = ({ isOpen, onClose }: SideModalProps) => {
  return (
    <SideModal isOpen={isOpen} onClose={onClose}>
        <h1>MyPage</h1>
    </SideModal>
  )
}

const FriendModal = ({ isOpen, onClose }: SideModalProps) => {
  return (
    <SideModal isOpen={isOpen} onClose={onClose}>
        <h1>Friend</h1>
    </SideModal>
  )
}

const SideModal = ({ isOpen, onClose, children }: SideModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null)

	const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose()
    }
  }
	
  return (
    <>
      {/* 백드롭 */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ease-in-out
          ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={handleBackdropClick}
      >
        {/* 오른쪽 모달 */}
        <div
          ref={modalRef}
          className={`absolute right-0 top-0 h-full w-80 bg-black/90 shadow-xl z-50 transform transition-transform duration-300 ease-in-out
            ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-black"
          >
            닫기
          </button>
          <div className="p-6">
            {children}
          </div>
        </div>
      </div>
    </>
  )
}

export default Header