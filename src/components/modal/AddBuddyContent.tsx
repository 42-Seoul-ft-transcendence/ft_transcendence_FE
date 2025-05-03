import React, { useEffect, useState } from 'react';
import fetchWithAuth from '../utils/fetchWithAuth';
import { useNavigate } from 'react-router-dom';
import { User, UserListResponse } from '../../types/User';
import AddBuddyIcon from '../../assets/icon/AddBuddy.svg';

function AddBuddyContent() {
  const [users, setUsers] = useState<User[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [matchedUser, setMatchedUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetchWithAuth(
          `${import.meta.env.VITE_API_BASE}/ft/api/admin/users`,
          navigate,
          { method: 'GET' },
        );
        const data: UserListResponse = await res.json();
        setUsers(data.users ?? []);
      } catch (error) {
        console.error('유저 목록 가져오기 실패:', error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    if (!inputValue) {
      setMatchedUser(null);
      return;
    }

    const matched = users.find((user) => user.name.toLowerCase() === inputValue.toLowerCase());
    setMatchedUser(matched || null);
  }, [inputValue, users]);

  return (
    <div className="flex flex-col items-center justify-center text-center">
      <div className="text-[#FFFBAA] text-6xl mt-6">Buddy Invitation</div>
      <input
        className="border border-[#9FE1FC] w-[400px] mt-6 h-12 p-2 text-xl rounded-md"
        placeholder="Enter buddy name"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      {matchedUser ? (
        <div className="flex items-center justify-between bg-[#1f1f1f] w-[400px] p-4 mt-6 rounded-lg">
          {/* 프로필 이미지 + 닉네임 묶기 */}
          <div className="flex items-center gap-4">
            <img
              src={matchedUser.image}
              alt={matchedUser.name}
              className="w-14 h-14 rounded-full object-cover"
            />
            <div className="text-2xl font-bold text-white">{matchedUser.name}</div>
          </div>

          {/* 오른쪽 끝 친구 추가 아이콘 */}
          <img src={AddBuddyIcon} alt="Add buddy" className="w-8 h-8 cursor-pointer" />
        </div>
      ) : inputValue ? (
        <div className="mt-6 text-gray-400 text-lg">No matching user found</div>
      ) : null}
    </div>
  );
}

export default AddBuddyContent;
