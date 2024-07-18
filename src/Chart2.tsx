import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart';

const chartConfig = {
	desktop: {
		label: 'Desktop',
		color: 'hsl(var(--chart-1))',
	},
	BALANCE: {
		label: 'Balance',
		color: 'hsl(var(--chart-1))',
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
export default function Chart2({ data }: { data: Prop[] }) {
	const minBalance = Math.min(...data.map((item) => Number(item.BALANCE)));
	const maxBalance = Math.max(...data.map((item) => Number(item.BALANCE)));

	const padding = (maxBalance - minBalance) * 0.1;
	return (
		<Card className='w-full'>
			<CardHeader>
				<CardTitle>Balance Chart</CardTitle>
				<CardDescription>
					{data[0]['VALUE DATE']} -{data[data.length - 1]['VALUE DATE']}
				</CardDescription>
			</CardHeader>
			<CardContent>
				<ChartContainer config={chartConfig}>
					<LineChart
						accessibilityLayer
						data={data}
						margin={{
							left: 12,
							right: 12,
						}}
					>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey='VALUE DATE'
							tickLine={false}
							axisLine={false}
							tickMargin={8}
							tickFormatter={(value) => value.slice(0, 6)}
						/>
						<YAxis
							dataKey='BALANCE'
							tickLine={false}
							axisLine={false}
							tickMargin={8}
							domain={[minBalance - padding, maxBalance + padding]}
						/>
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent hideLabel />}
						/>
						<Line
							dataKey='BALANCE'
							type='natural'
							stroke='var(--color-desktop)'
							strokeWidth={2}
							dot={false}
						/>
					</LineChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}
