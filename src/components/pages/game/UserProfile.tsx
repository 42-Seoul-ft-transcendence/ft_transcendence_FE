import { match } from '../../../types/Tournament'
import BlackProfile from '../../../assets/black_profile.svg'

type Props = {
	match: match | undefined
}

const UserProfile = ({ match }: Props) => {
	return (
		<div className="relative flex justify-between w-full h-auto">
			<div className="relative flex items-center justify-center gap-[1vh]">
				<div className="relative flex h-2/3">
					<img
						className="size-full"
						src={BlackProfile} />
					<img
						className="absolute inset-0 size-full rounded-full object-cover overflow-hidden"
						src={match?.players[0].image} />
				</div>
				<p className="text-white text-center text-5xl">{match?.players[0].name}</p>
			</div>
			<div className="relative flex items-center justify-center gap-[1vh]">
				<p className="text-white text-center text-5xl">{match?.players[1].name}</p>
				<div className="relative flex h-2/3">
					<img
						className="size-full"
						src={BlackProfile} />
					<img
						className="absolute inset-0 size-full rounded-full object-cover overflow-hidden"
						src={match?.players[1].image} />
					</div>
			</div>
		</div>
	)
}

export default UserProfile