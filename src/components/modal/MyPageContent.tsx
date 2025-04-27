import { useEffect, useState } from 'react';
import fetchWithAuth from '../utils/fetchWithAuth'; // fetchWithAuth 경로 확인!
import ProfilePlaceholder from '../../assets/black_profile.svg';

type UserInfo = {
  id: number;
  name: string;
  imgURL: string;
  wins: number;
  losses: number;
};

const MypageContent = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetchWithAuth(`${import.meta.env.VITE_API_BASE}/ft/api/users/me`, {
          method: 'GET',
        });

        console.log(response);

        if (!response.ok) {
          throw new Error('서버 오류');
        }

        const data = await response.json(); // ✅ 꼭 .json()으로 변환
        console.log(data);
        setUserInfo(data);
      } catch (err: any) {
        console.error('유저 정보 가져오기 실패', err);
        setError(err.message || '에러가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러 발생: {error}</div>;
  if (!userInfo) return <div>유저 정보를 찾을 수 없습니다.</div>;

  return (
    <div className="flex flex-col items-center gap-4 p-6">
      <h1 className="text-white">MyPage</h1>
      <h2 className="text-2xl text-white font-bold mb-4">마이페이지</h2>
      <div className="text-lg text-white">아이디: {userInfo.id}</div>
      <div className="text-lg text-white">이름: {userInfo.name}</div>
      <div className="text-lg text-white">win: {userInfo.wins}</div>
      <div className="text-lg text-white">lose: {userInfo.losses}</div>
      <img src={ProfilePlaceholder} />
    </div>
  );
};

export default MypageContent;
