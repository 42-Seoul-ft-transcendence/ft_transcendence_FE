import { useState } from 'react';
import Modal from '../../common/Modal';
import { useNavigate } from 'react-router-dom';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const CreateRoomModal = ({ isOpen, onClose }: Props) => {
  const navigate = useNavigate();
  const [roomTitle, setRoomTitle] = useState("");
  const [isMultiGame, setIsMultiGame] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoomTitle(e.target.value);
  };

  const handleCreateRoom = () => {
    if (loading) return;
    if (!roomTitle.trim()) {
      alert("방 제목을 입력해주세요.");
      return;
    }

    setLoading(true);

    const accessToken = localStorage.getItem("accessToken");
    const userId = localStorage.getItem("userId");

    fetch("/api/room/create", {
      method: "POST",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify({
        userId: userId,
        accessToken: accessToken,
        roomTitle: roomTitle,
        multiGame: isMultiGame,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        onClose();
        navigate(`/room/${data.roomId}`);
      })
      .finally(() => setLoading(false))
      .catch(() => {
        alert("방 생성에 실패하였습니다. 잠시 후 다시 시도해 주세요.");
        onClose();
      });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col gap-[2vh]">
        <h1 className="text-xl text-black opacity-100">방 생성</h1>
        <input
          type="text"
          placeholder="방제"
          maxLength={20}
          onChange={handleChange}
          className="border-2 border-gray-100 rounded-md"
        />
        <div className="flex gap-[2vh]">
          <button
            className={`px-4 py-2 rounded-lg ${!isMultiGame ? "bg-blue-500 text-white" : "bg-gray-300 text-black"}`}
            onClick={() => setIsMultiGame(false)}
          >
            2인 게임
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${isMultiGame ? "bg-blue-500 text-white" : "bg-gray-300 text-black"}`}
            onClick={() => setIsMultiGame(true)}
          >
            4인 게임
          </button>
        </div>
        <button
          onClick={handleCreateRoom}
          disabled={loading}
          className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
        >
          생성
        </button>
      </div>
    </Modal>
  );
};

export default CreateRoomModal;
