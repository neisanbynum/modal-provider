import { ModalHeaderProperties } from "@/types"
import { cn } from "@sglara/cn"
import { X } from "lucide-react"
import { useModalContext } from "./context"

const Header: React.FC<ModalHeaderProperties> = ({ icon, title, desc }) => {
	const { close, closer } = useModalContext()

	return (
		<div className='flex w-full gap-2'>
			{icon && (
				<div className='flex justify-center items-center'>
					<icon.icon className={cn(icon.className, 'w-8 h-8')} />
				</div>
			)}
			<div className='flex flex-col w-full items-start'>
				{title && <span className='text-lg font-semibold'>{title}</span>}
				{desc && <span className='text-muted text-sm'>{desc}</span>}
			</div>
			{closer !== 'none' && (
				<div className='flex justify-center items-start'>
					<button
						onClick={close}
						className='cursor-pointer disabled:cursor-default touch-manipulation select-none disabled:opacity-50'
					>
						<X className='w-5 h-5' />
					</button>
				</div>
			)}
		</div>
	)
}

export default Header