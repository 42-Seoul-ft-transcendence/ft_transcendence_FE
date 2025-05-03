import { participants } from '../../../types/Tournament'
import BlackProfile from '../../../assets/black_profile.svg'

type Props = {
	player1: participants
	player2: participants
}

const UserProfile = ({ player1, player2 }: Props) => {
	return (
		<div className="fixed flex justify-between w-full h-auto bottom-8">
			<div className="relative flex items-center justify-center gap-[1vh]">
				<div className="relative flex h-2/3">
					<img
						className="size-full"
						src={BlackProfile} />
					<img
						className="absolute inset-0 size-full rounded-full object-cover overflow-hidden"
						src={player1.image} />
				</div>
				<p className="text-white text-center text-5xl">{player1.name}</p>
			</div>
			<div className="relative flex items-center justify-center gap-[1vh]">
				<p className="text-white text-center text-5xl">{player2.name}</p>
				<div className="relative flex h-2/3">
					<img
						className="size-full"
						src={BlackProfile} />
					<img
						className="absolute inset-0 size-full rounded-full object-cover overflow-hidden"
						src={player2.image} />
					</div>
			</div>
		</div>
	)
}

export default UserProfile