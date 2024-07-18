import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

interface Prop {
	'POSTING DATE': string;
	'VALUE DATE': string;
	'DESCRIPTION': string;
	'OUTFLOW': string;
	'INFLOW': string;
	'BALANCE': string;
}
export function TableDemo({ data }: { data: Prop[] }) {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead className='w-[100px]'>Posting Date</TableHead>
					<TableHead>Value Date</TableHead>
					<TableHead>Description</TableHead>
					<TableHead className='text-right'>Outflow</TableHead>
					<TableHead className='text-right'>Inflow</TableHead>
					<TableHead className='text-right'>Balance</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{data.map((invoice, index) => (
					<TableRow key={index}>
						<TableCell className='font-medium'>
							{invoice['POSTING DATE']}
						</TableCell>
						<TableCell>{invoice['VALUE DATE']}</TableCell>
						<TableCell>{invoice['DESCRIPTION']}</TableCell>
						<TableCell className='text-right'>{invoice['OUTFLOW']}</TableCell>
						<TableCell className='text-right'>{invoice['INFLOW']}</TableCell>
						<TableCell className='text-right'>{invoice['BALANCE']}</TableCell>
					</TableRow>
				))}
			</TableBody>
			{/* <TableFooter>
				<TableRow>
					<TableCell colSpan={3}>Total</TableCell>
					<TableCell className='text-right'>$2,500.00</TableCell>
				</TableRow>
			</TableFooter> */}
		</Table>
	);
}
