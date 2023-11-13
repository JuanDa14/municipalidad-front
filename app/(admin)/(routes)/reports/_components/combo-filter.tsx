import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { formatNumberToMonth } from '@/lib/format';

interface comboProp {
	years?: number[];
	months?: number[];
	setYear: (e: string) => void;
	setMonth: (e: string) => void;
	month?: boolean;
}

const ComboFilter = ({ years = [], months = [], setYear, setMonth, month = false }: comboProp) => {
	return (
		<div className='flex gap-5'>
			<Select onValueChange={(e) => setYear(e)}>
				<SelectTrigger className='w-[180px]'>
					<SelectValue placeholder='Año' />
				</SelectTrigger>
				<SelectContent>
					{years.map((e) => {
						return (
							<SelectItem key={crypto.randomUUID()} value={String(e)}>
								{e}
							</SelectItem>
						);
					})}
				</SelectContent>
			</Select>
			{month && (
				<Select onValueChange={(e) => setMonth(e)}>
					<SelectTrigger className='w-[180px]'>
						<SelectValue placeholder='Mes' />
					</SelectTrigger>
					<SelectContent>
						{months.map((e) => {
							return (
								<SelectItem key={crypto.randomUUID()} value={String(e)}>
									{formatNumberToMonth(e)}
								</SelectItem>
							);
						})}
					</SelectContent>
				</Select>
			)}
		</div>
	);
};

export default ComboFilter;
