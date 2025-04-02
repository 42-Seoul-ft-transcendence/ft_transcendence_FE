import { ReactNode } from 'react';

type Props= {
	className?: string;
	children?: ReactNode;
};

const BackGroundImage = ({ className="", children }: Props) => {
	return (
		<>
			<div 
				className={
					`relative w-full h-screen flex flex-col items-center justify-center bg-cover bg-center
					bg-[url("/../src/assets/background.png")]
					${className}`}
			>
				{children}
			</div>
		</>
	)
}

export default BackGroundImage