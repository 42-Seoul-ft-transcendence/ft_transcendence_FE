import { useEffect, useState } from 'react';
import fetchWithAuth from '../utils/fetchWithAuth';
import ProfilePlaceholder from '../../assets/black_profile.svg';
import SettingIcon from '../../assets/icon/setting.svg';

type UserInfo = {
  id: number;
  name: string;
  imgURL: string;
  wins: number;
  losses: number;
};

type MatchInfo = {
  id: number;
  myScore: number;
  opponentScore: number;
  isWinner: boolean;
  opponentName: string;
  playedAt: string; // 날짜 문자열
};

type MatchesResponse = {
  matches: MatchInfo[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

const MypageContent = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [matches, setMatches] = useState<MatchInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 유저 정보 가져오기
        const userResponse = await fetchWithAuth(
          `${import.meta.env.VITE_API_BASE}/ft/api/users/me`,
          { method: 'GET' },
        );

        if (!userResponse.ok) {
          throw new Error('유저 정보 가져오기 실패');
        }

        const userData = await userResponse.json();
        setUserInfo(userData);

        // 매치 기록 가져오기
        const matchesResponse = await fetchWithAuth(
          `${import.meta.env.VITE_API_BASE}/ft/api/users/me/matches/history`,
          { method: 'GET' },
        );

        if (!matchesResponse.ok) {
          throw new Error('매치 기록 가져오기 실패');
        }

        const matchesData: MatchesResponse = await matchesResponse.json();
        setMatches(matchesData.matches); // ✅ matchesData.matches로 저장
      } catch (err: any) {
        console.error('데이터 가져오기 실패', err);
        setError(err.message || '에러가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러 발생: {error}</div>;
  if (!userInfo) return <div>유저 정보를 찾을 수 없습니다.</div>;

  return (
    <div className="flex flex-col items-center gap-4 p-6">
      {/* 유저 프로필 */}
      <div className="flex flex-row items-center gap-8">
        <img src={ProfilePlaceholder} className="w-[120px] h-[120px]" />
        <div className="text-6xl text-white">chaoh</div>
        <img src={SettingIcon} />
      </div>

      {/* 매치 기록 */}
      <div className="mt-8 w-full max-w-2xl">
        <h3 className="text-2xl font-bold text-white mb-4">매치 기록</h3>
        <div className="flex flex-col gap-2">
          {matches.length === 0 ? (
            <div className="text-white">매치 기록이 없습니다.</div>
          ) : (
            matches.map((match) => (
              <div key={match.id} className="bg-gray-700 text-white p-4 rounded-md">
                <div>상대: {match.opponentName}</div>
                <div>
                  스코어: {match.myScore} : {match.opponentScore}
                </div>
                <div>결과: {match.isWinner ? '승리' : '패배'}</div>
                <div>플레이 날짜: {new Date(match.playedAt).toLocaleDateString()}</div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* 승패 */}
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-[#FFFBAA]">Win/Lose Stats</h1>
        <div className="text-lg text-white">win: {userInfo.wins}</div>
        <div className="text-lg text-white">lose: {userInfo.losses}</div>
      </div>
    </div>
  );
};

export default MypageContent;
