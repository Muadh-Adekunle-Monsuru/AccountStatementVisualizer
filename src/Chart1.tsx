import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

import { ChartConfig, ChartContainer } from '@/components/ui/chart';
import { ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { ChartLegend, ChartLegendContent } from '@/components/ui/chart';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
const chartConfig = {
	INFLOW: {
		label: 'Inflow',
		color: '#52b788',
	},
	OUTFLOW: {
		label: 'Outflow',
		color: '#ff4d6d',
	},
	BALANCE: {
		label: 'balance',
		color: '#1f1f1f',
	},
} satisfies ChartConfig;

interface Prop {
	'POSTING DATE': string;
	'VALUE DATE': string;
	'DESCRIPTION': string;
	'OUTFLOW': string;
	'INFLOW': string;
	'BALANCE': string;
}
export default function Chart1({ data }: { data: Prop[] }) {
	return (
		<Card className='w-full'>
			<CardHeader>
				<CardTitle>Inflow - Outflow</CardTitle>
				<CardDescription>
					{data[0]['VALUE DATE']} -{data[data.length - 1]['VALUE DATE']}
				</CardDescription>
			</CardHeader>
			<CardContent>
				<ChartContainer config={chartConfig} className='min-h-[200px] w-full '>
					<BarChart accessibilityLayer data={data}>
						<CartesianGrid />
						<XAxis
							dataKey='POSTING DATE'
							tickLine={false}
							tickMargin={10}
							axisLine={false}
							tickFormatter={(value) => value.slice(0, 6)}
						/>
						<ChartTooltip content={<ChartTooltipContent />} />
						<ChartLegend content={<ChartLegendContent />} />
						<Bar dataKey='OUTFLOW' fill='var(--color-OUTFLOW)' radius={4} />
						<Bar dataKey='INFLOW' fill='var(--color-INFLOW)' radius={4} />
						{/* <Bar dataKey='BALANCE' fill='var(--color-BALANCE)' radius={4} /> */}
					</BarChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}
