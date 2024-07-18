import { Input } from './components/ui/input';
import { Label } from './components/ui/label';
import { Button } from './components/ui/button';
import { useState } from 'react';
import { Loader } from 'lucide-react';
import { TableDemo } from './ShadcnTable';
import Chart1 from './Chart1';
import Chart2 from './Chart2';
import Balance from './OpeningClosing';
import { sampleData } from './SampleData';
interface Transaction {
	'POSTING DATE': string;
	'VALUE DATE': string;
	'DESCRIPTION': string;
	'OUTFLOW': string;
	'INFLOW': string;
	'BALANCE': string;
}
export default function UploadSection() {
	const [file, setFile] = useState('');
	const [response, setResponse] = useState<Transaction[]>([]);
	const [loading, setLoading] = useState(false);
	const [password, setPassowrd] = useState('');
	const [error, setError] = useState('');

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		setError('');
		if (!file) {
			setError('Missing file, please upload file.');
			return;
		}
		const form: any = event.currentTarget;
		const formData = new FormData(form);

		try {
			setLoading(true);
			const response = await fetch('http://localhost:5000/upload', {
				method: 'POST',
				body: formData,
			});
			if (response.ok) {
				setLoading(false);
				const res = await response.json();
				setResponse(res);
				console.log('form upload successful');
			} else {
				setLoading(false);
				setError('Error Processing Your File, Please Try Again!');
				console.log('Submit not successful');
			}
		} catch (e) {
			setLoading(false);
			setError('Error Processing Your File, Please Try Again!');
			console.log('Error');
		}
	};
	const handleDemoSubmit = async () => {
		setLoading(true);
		setTimeout(() => {
			setResponse(sampleData);
			setLoading(false);
		}, 5000);
	};
	return (
		<div className='flex flex-col items-center'>
			<h2 className='py-2 font-medium text-lg'>
				Upload Your Account Statement:
			</h2>

			<form className='flex gap-x-5 items-end' onSubmit={handleSubmit}>
				<div className='grid w-full max-w-sm items-center gap-1.5'>
					<Label htmlFor='file'>File</Label>
					<Input
						id='file'
						type='file'
						name='file'
						value={file}
						onChange={(e) => setFile(e.target.value)}
					/>
				</div>
				<div className='grid max-w-sm items-center gap-1.5'>
					<Label htmlFor='password'>File Password</Label>
					<Input
						name='password'
						id='password'
						type='password'
						className='max-w-40'
						value={password}
						onChange={(e) => setPassowrd(e.target.value)}
					/>
				</div>
				<Button type='submit' disabled={loading}>
					Submit
				</Button>
			</form>
			<Button className='my-5' onClick={() => handleDemoSubmit()}>
				Use Demo Data
			</Button>
			{loading && (
				<div className='flex items-center justify-center animate-pulse py-10'>
					<Loader className='w-10 h-10 animate-spin' />
					<p className='text-sm'>Processing...</p>
				</div>
			)}
			<p className='text-sm font-medium text-red-500 h-5 py-2 mb-2 flex items-center'>
				{error}
			</p>
			{!loading && response.length > 0 && (
				<div className='py-10 px-1  w-full'>
					<div className='h-96 overflow-auto bg-white border rounded-lg p-1 py-4 shadow-sm'>
						<TableDemo data={response} />
					</div>
					<p className='text-sm text-muted-foreground py-2'>
						A list of all your transactions
					</p>
					<div className='py-5 flex flex-col gap-7 items-center'>
						<Balance data={response} />
						<Chart1 data={response} />
						<Chart2 data={response} />
					</div>
				</div>
			)}
		</div>
	);
}
