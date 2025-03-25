import { useParams } from 'react-router-dom'

const data: Record<string, { userid: string; description: string }> = {
	velopert: {
		userid: '김민준',
		description: '리액트를 좋아하는 개발자',
	},
	gildong: {
		userid: '홍길동',
		description: '고전 소설 홍길동전의 주인공',
	},
}

const MypagePage = () => {
	const { userid } = useParams()
	const profile = userid ? data[userid] : undefined //[API]: userid 로 유저 정보 받아오기

	return (
		<>
			{profile ? (
				<>
					<h2>{profile.userid}</h2>
					<p>{profile.description}</p>
				</>
			) : (
				<p>존재하지 않는 프로필입니다.</p>
			)}
		</>
	)
}
export default MypagePage