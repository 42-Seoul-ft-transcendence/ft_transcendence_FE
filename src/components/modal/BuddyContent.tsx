import { useEffect, useState } from 'react';
import AddBuddyIcon from '../../assets/icon/AddBuddy.svg';
import { BuddyListResponse, Buddy } from '../../types/Buddy';
import fetchWithAuth from '../utils/fetchWithAuth';
import Placeholder from '../../assets/black_profile.svg';
import DeleteButton from '../../assets/button/delete_button.svg';
// import { mockBuddyList } from '../../mocks/buddies';
import DeleteModal from '../common/Modal';
import Button from '../common/BasicButton';

const BuddyContent = () => {
  const [buddies, setBuddies] = useState<Buddy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBuddy, setSelectedBuddy] = useState<Buddy | null>(null);

  const handleDeleteClick = (buddy: Buddy) => {
    setSelectedBuddy(buddy);
    setIsModalOpen(true);
  };

  const deleteBuddy = async (buddyId: number) => {
    try {
      const res = await fetchWithAuth(
        `${import.meta.env.VITE_API_BASE}/ft/api/friends/${buddyId}`,
        {
          method: 'DELETE',
        },
      );

      if (!res.ok) {
        throw new Error(`삭제 실패 (status: ${res.status})`);
      }

      // 삭제 성공 시 리스트 갱신
      setBuddies((prev) => prev.filter((b) => b.id !== buddyId));
      setIsModalOpen(false);
    } catch (err) {
      console.error('❌ 삭제 실패', err);
      alert('삭제에 실패했습니다.');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetchWithAuth(`${import.meta.env.VITE_API_BASE}/ft/api/friends`, {
          method: 'GET',
        });

        console.log('📡 fetch status:', res.status);
        const data: BuddyListResponse = await res.json();
        console.log('📦 받은 데이터:', data);

        // // mock 데이터
        // setBuddies(mockBuddyList.friends);
        setBuddies(data.friends);
      } catch (err: unknown) {
        console.log('❌ 데이터 가져오기 실패', err);
        setError(err instanceof Error ? err.message : '알 수 없는 에러');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러 발생: {error}</div>;
  if (!buddies.length) return <div>친구가 없습니다.</div>;

  return (
    <div>
      {/* 타이틀 영역 */}
      <div className="relative mt-6 flex justify-center items-center">
        <div className="text-[#FFFBAA] text-6xl">Buddy List</div>
        <img
          src={AddBuddyIcon}
          className="absolute right-0 top-1/2 -translate-y-1/2"
          alt="Add buddy"
        />
      </div>

      <hr className="w-full h-[3px] mt-8 bg-[#2c2c2c] border-none" />

      {/* 친구 목록 출력 */}
      <div className="mt-6 space-y-4">
        {buddies.map((buddy) => (
          <div
            key={buddy.id}
            className="flex items-center justify-between text-white bg-[#1f1f1f] px-4 py-2 rounded-lg"
          >
            {/* 왼쪽: 프로필 이미지 + 이름 + 상태 */}
            <div className="flex items-center gap-4">
              <img
                src={buddy.image || Placeholder}
                alt={buddy.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex flex-col">
                <span className="text-2xl font-semibold">{buddy.name}</span>
                <span className={`text-sm ${buddy.isOnline ? 'text-green-400' : 'text-gray-400'}`}>
                  {buddy.isOnline
                    ? 'Online'
                    : `Offline · Last seen: ${new Date(buddy.lastSeen).toLocaleString('en-US', {
                        weekday: 'short',
                        year: 'numeric',
                        month: 'short',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true,
                      })}`}
                </span>
              </div>
            </div>

            {/* 오른쪽: 삭제 버튼 */}
            <img
              src={DeleteButton}
              onClick={() => handleDeleteClick(buddy)}
              className="w-16 h-16 cursor-pointer"
              alt="Delete"
            />
          </div>
        ))}
      </div>

      <DeleteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        className="w-[400px] h-[200px] p-6"
      >
        <div
          className="text-white text-center text-3xl font-semibold mt-8 "
          style={{
            textShadow: '1px 1px 0 #000, -1px 1px 0 #000, 1px -1px 0 #000, -1px -1px 0 #000',
          }}
        >
          Remove "<span className="text-[#FFFBAA]">{selectedBuddy?.name}</span>"
          <br />
          from your buddy list?
        </div>
        <div className="flex justify-center gap-4 mt-4">
          <Button
            onClick={() => {
              if (selectedBuddy) {
                deleteBuddy(selectedBuddy.id);
              }
              setIsModalOpen(false);
            }}
            className="bg-red-500 w-[80px] h-[40px] border-2 text-xl"
          >
            Delete
          </Button>
          <Button
            onClick={() => setIsModalOpen(false)}
            className="w-[80px] h-[40px] border-2 text-xl"
          >
            cancle
          </Button>
        </div>
      </DeleteModal>
    </div>
  );
};

export default BuddyContent;
