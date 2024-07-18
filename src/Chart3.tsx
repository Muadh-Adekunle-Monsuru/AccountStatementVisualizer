'use client';
import React from 'react';

import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from 'recharts';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart';

const chartConfig = {
	OUTFLOW: {
		label: 'Outflow',
		color: 'hsl(var(--chart-1))',
	},
	INFLOW: {
		label: 'Inflow',
		color: 'hsl(var(--chart-2))',
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
export function Chart3({ data }: { data: Prop[] }) {
	const totalVisitors =
		Number(data[data.length - 1].BALANCE) - Number(data[0].BALANCE);

	const totalInflow = React.useMemo(() => {
		return data.reduce((acc, curr) => acc + Number(curr.INFLOW), 0);
	}, []);
	const totalOutflow = React.useMemo(() => {
		return data.reduce((acc, curr) => acc + Number(curr.OUTFLOW), 0);
	}, []);

	const chartData = [
		{ INFLOW: Math.floor(totalInflow), OUTFLOW: Math.floor(totalOutflow) },
	];

	return (
		<Card className='flex flex-col lg:h-40 h-60'>
			<CardHeader className='items-center pb-0'>
				<CardTitle>Inflow - Outflow</CardTitle>
			</CardHeader>
			<CardContent className='flex flex-1 items-center pb-0 '>
				<ChartContainer
					config={chartConfig}
					className='mx-auto aspect-square w-full max-w-[250px] '
				>
					<RadialBarChart
						data={chartData}
						endAngle={180}
						innerRadius={65}
						outerRadius={90}
						className='w-full flex-1'
					>
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent hideLabel />}
						/>
						<PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
							<Label
								content={({ viewBox }) => {
									if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
										return (
											<text x={viewBox.cx} y={viewBox.cy} textAnchor='middle'>
												<tspan
													x={viewBox.cx}
													y={(viewBox.cy || 0) - 16}
													className='fill-foreground text-lg font-bold'
												>
													{totalVisitors.toLocaleString()}
												</tspan>
												<tspan
													x={viewBox.cx}
													y={(viewBox.cy || 0) + 4}
													className='fill-muted-foreground'
												>
													Difference
												</tspan>
											</text>
										);
									}
								}}
							/>
						</PolarRadiusAxis>
						<RadialBar
							dataKey='OUTFLOW'
							stackId='a'
							cornerRadius={5}
							fill='var(--color-OUTFLOW)'
							className='stroke-transparent stroke-2'
						/>
						<RadialBar
							dataKey='INFLOW'
							fill='var(--color-INFLOW)'
							stackId='a'
							cornerRadius={5}
							className='stroke-transparent stroke-2'
						/>
					</RadialBarChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}
