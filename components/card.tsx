import { ReactNode } from "react";

export default function Card({children}:{children:ReactNode}){
	return <>
		<div 
			className="
			min-w-md 
			sm:max-w-full 
			min-h-500 
			dark:bg-gray-700"
		>

			{children}

		</div>
	</>
};
