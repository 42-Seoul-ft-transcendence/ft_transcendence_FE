import { useEffect, useState } from 'react';
import fetchWithAuth from '../utils/fetchWithAuth';
import ProfilePlaceholder from '../../assets/black_profile.svg';
import SettingIcon from '../../assets/icon/setting.svg';
import { mockMatches } from '../../mocks/matches';

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

export type MatchesResponse = {
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
  const [currentPage, setCurrentPage] = useState(1);
  const matchesPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 실제 요청은 주석처리, mock 사용
        // const userResponse = await fetchWithAuth(`${import.meta.env.VITE_API_BASE}/ft/api/users/me`, { method: 'GET' });
        // const userData = await userResponse.json();
        setUserInfo({ id: 1, name: 'chaoh', imgURL: '', wins: 3, losses: 2 });

        // const matchesResponse = await fetchWithAuth(`${import.meta.env.VITE_API_BASE}/ft/api/users/me/matches/history`, { method: 'GET' });
        // const matchesData: MatchesResponse = await matchesResponse.json();
        setMatches(mockMatches.matches);
      } catch (err: unknown) {
        console.error('데이터 가져오기 실패', err);
        setError(err instanceof Error ? err.message : '알 수 없는 에러');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러 발생: {error}</div>;
  if (!userInfo) return <div>유저 정보를 찾을 수 없습니다.</div>;

  // Pagination
  const totalPages = Math.ceil(matches.length / matchesPerPage);
  const startIndex = (currentPage - 1) * matchesPerPage;
  const currentMatches = matches.slice(startIndex, startIndex + matchesPerPage);

  return (
    <div className="flex flex-col items-center gap-4 p-6">
      {/* 유저 프로필 */}
      <div className="flex flex-row items-center gap-8">
        <img src={ProfilePlaceholder} className="w-[120px] h-[120px]" />
        <div className="text-6xl text-white">{userInfo.name}</div>
        <img src={SettingIcon} />
      </div>

      {/* 매치 기록 */}
      <div className="mt-8 w-full max-w-2xl">
        <h2 className="text-center text-yellow-200 text-3xl font-bold mb-6">Match History</h2>

        <div className="grid grid-cols-4 text-gray-400 text-lg font-semibold border-b border-gray-600 pb-2 mb-4">
          <div className="text-left">Result</div>
          <div className="text-center">Count</div>
          <div className="text-center">vs</div>
          <div className="text-right">Date</div>
        </div>

        <div className="space-y-4">
          {currentMatches.map((match) => (
            <div
              key={match.id}
              className="grid grid-cols-4 items-center border-b border-gray-600 pb-2"
            >
              <div
                className={`text-left font-bold ${match.isWinner ? 'text-green-400' : 'text-red-400'}`}
              >
                {match.isWinner ? 'win' : 'lose'}
              </div>
              <div className="text-center text-white font-mono text-lg">
                {match.myScore}:{match.opponentScore}
              </div>
              <div className="text-center text-white">{match.opponentName}</div>
              <div className="text-right text-white font-mono">
                {new Date(match.playedAt).toLocaleDateString('en-US', {
                  month: '2-digit',
                  day: '2-digit',
                })}
              </div>
            </div>
          ))}
        </div>

        {/* 페이지네이션 */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-6 gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              className="px-3 py-1 rounded bg-gray-600 text-white disabled:opacity-50"
            >
              이전
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 rounded ${
                  currentPage === page
                    ? 'bg-yellow-300 text-black font-bold'
                    : 'bg-gray-700 text-white'
                }`}
              >
                {page}
              </button>
            ))}
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              className="px-3 py-1 rounded bg-gray-600 text-white disabled:opacity-50"
            >
              다음
            </button>
          </div>
        )}
      </div>

      {/* 승패 */}
      <div className="flex flex-col justify-center items-center mt-8">
        <h1 className="text-[#FFFBAA] text-3xl">Win/Lose Stats</h1>
        <div className="text-lg text-white">win: {userInfo.wins}</div>
        <div className="text-lg text-white">lose: {userInfo.losses}</div>
      </div>
    </div>
  );
};

export default MypageContent;
