import { useState } from 'react';
import Modal from '../../common/Modal';
import { useNavigate } from 'react-router-dom';
import Button2pDefault from '../../../assets/button/2p_yellow.svg';
import Button4pDefault from '../../../assets/button/4p_yellow.svg';
import Button2pActive from '../../../assets/button/2p_orange.svg';
import Button4pActive from '../../../assets/button/4p_orange.svg';
import BasicButton from '../../common/BasicButton';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const CreateRoomModal = ({ isOpen, onClose }: Props) => {
  const navigate = useNavigate();
  const [roomTitle, setRoomTitle] = useState('');
  const [isMultiGame, setIsMultiGame] = useState(false);
  const [selectedMode, setSelectedMode] = useState<'2P' | '4P' | null>(null); // ✅ 추가

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoomTitle(e.target.value);
  };

  const handleCreateRoom = () => {
    if (!roomTitle.trim()) {
      alert('방 제목을 입력해주세요.');
      return;
    }

    setLoading(true);

    const accessToken = localStorage.getItem('accessToken');
    const userId = localStorage.getItem('userId');

    fetch('/api/room/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId,
        accessToken,
        roomTitle,
        multiGame: isMultiGame,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        onClose();
        navigate(`/room/${data.roomId}`);
      })
      .catch(() => {
        alert('방 생성에 실패하였습니다. 잠시 후 다시 시도해 주세요.');
      })
      .finally(() => setLoading(false));
  };

  const [loading, setLoading] = useState(false);

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="w-[600px] h-[350px]">
      <div className="flex flex-col items-start gap-6 mt-10">
        {/* Room Name 입력줄 */}
        <div className="flex flex-row items-center gap-4 w-full">
          <p
            className="whitespace-nowrap text-white text-4xl w-[150px]"
            style={{
              WebkitTextStroke: '1px black',
            }}
          >
            Room Name
          </p>
          <input
            type="text"
            value={roomTitle}
            maxLength={20}
            onChange={handleChange}
            className="flex-1 h-10 border-black px-2 text-2xl w-[150px]"
            placeholder="Room Name"
          />
        </div>

        {/* Mode 선택줄 */}
        <div className="flex flex-row items-center gap-4 w-full">
          <p
            className="whitespace-nowrap text-white text-4xl w-[150px] text-center"
            style={{
              WebkitTextStroke: '1px black',
            }}
          >
            Mode
          </p>
          <div className="flex gap-2">
            <img
              className="w-24 cursor-pointer transition-transform hover:scale-105"
              src={selectedMode === '2P' ? Button2pActive : Button2pDefault}
              onClick={() => {
                setSelectedMode('2P');
                setIsMultiGame(false);
              }}
              alt="2P"
            />
            <img
              className="w-24 cursor-pointer transition-transform hover:scale-105"
              src={selectedMode === '4P' ? Button4pActive : Button4pDefault}
              onClick={() => {
                setSelectedMode('4P');
                setIsMultiGame(true);
              }}
              alt="4P"
            />
          </div>
        </div>

        {/* 생성 버튼 */}
        <div className="flex justify-center w-full mt-4 mb-6">
          <BasicButton>Create Room</BasicButton>
        </div>
      </div>
    </Modal>
  );
};

export default CreateRoomModal;
