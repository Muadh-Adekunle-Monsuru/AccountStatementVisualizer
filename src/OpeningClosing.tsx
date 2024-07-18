import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Chart3 } from './Chart3';
interface Prop {
	'POSTING DATE': string;
	'VALUE DATE': string;
	'DESCRIPTION': string;
	'OUTFLOW': string;
	'INFLOW': string;
	'BALANCE': string;
}
export default function Balance({ data }: { data: Prop[] }) {
	return (
		<div className='flex flex-col md:flex-row gap-y-5 justify-evenly w-full lg:h-40 overflow-y-hidden '>
			<div>
				<Card>
					<CardHeader>
						<CardTitle>Opening Balance</CardTitle>
						<CardDescription>{data[0]['VALUE DATE']}</CardDescription>
					</CardHeader>
					<CardContent>
						<p className='text-xl'>
							₦{Number(data[0].BALANCE).toLocaleString('en-US')}
						</p>
					</CardContent>
				</Card>
			</div>
			<div>
				<Card>
					<CardHeader>
						<CardTitle>Closing Balance</CardTitle>
						<CardDescription>
							{data[data.length - 1]['VALUE DATE']}
						</CardDescription>
					</CardHeader>
					<CardContent>
						<p className='text-xl'>
							₦{Number(data[data.length - 1].BALANCE).toLocaleString('en-US')}
						</p>
					</CardContent>
				</Card>
			</div>
			<Chart3 data={data} />
		</div>
	);
}
