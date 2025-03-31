import { ReactNode } from 'react';
import BackGround from '../assets/background.png';

type Props= {
	className?: string;
	children?: ReactNode;
};

const BackGroundImage = ({ className="", children }: Props) => {
	return (
		<>
			<div 
				className={`relative w-full h-screen flex flex-col items-center justify-center bg-cover bg-center ${className}`}
				style={{ backgroundImage: `url(${BackGround})` }}
			>
				{children}
			</div>
		</>
	)
}

export default BackGroundImage