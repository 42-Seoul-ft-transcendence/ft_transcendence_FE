import React, { useEffect, useState } from 'react';
import fetchWithAuth from '../utils/fetchWithAuth';
import { useNavigate } from 'react-router-dom';
import AcceptButton from '../../assets/button/accept_button.svg';
import RejectButton from '../../assets/button/reject_button.svg';
import { FriendRequest, FriendRequestListResponse } from '../../types/BuddyRequest';

function BuddyRequestContent() {
  const [requests, setRequests] = useState<FriendRequest[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await fetchWithAuth(
          `${import.meta.env.VITE_API_BASE}/ft/api/friends/requests/pending`,
          navigate,
          { method: 'GET' },
        );
        const data: FriendRequestListResponse = await res.json();
        setRequests(data.requests || []);
      } catch (error) {
        console.error('❌ 친구 요청 목록 가져오기 실패:', error);
      }
    };

    fetchRequests();
  }, []);

  return (
    <div>
      <div className="flex flex-col items-center justify-center">
        <div className="text-[#FFFBAA] text-6xl mt-6 font-bold">Buddy Requests</div>
      </div>

      <div className="mt-10 flex flex-col items-center gap-6">
        {requests.map((req) => (
          <div
            key={req.id}
            className="flex items-center justify-between bg-[#1f1f1f] w-[450px] p-4 mt-4 rounded-lg"
          >
            <div className="flex items-center gap-4">
              <img
                src={req.sender.image}
                alt={req.sender.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <span className="text-white text-3xl font-bold">{req.sender.name}</span>
            </div>

            <div className="flex items-center gap-3">
              <img src={AcceptButton} />
              <img src={RejectButton} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BuddyRequestContent;
