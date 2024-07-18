import UploadSection from './UploadSection';

function App() {
	return (
		<main className='lg:p-10 px-3 lg:px-20 bg-[#edede9]/40 min-h-screen '>
			<div className='flex flex-col gap-y-2 pt-28 lg:pt-20'>
				<h1 className='text-center text-5xl font-bold blur-[0.3px] select-none drop-shadow-sm cursor-pointer hover:blur-[0.35px] hover:drop-shadow-md py-3'>
					Statement<span className='block'>Visualized</span>
				</h1>
				<p className='text-center text-lg font-medium'>
					Your Financial History, Simplified
				</p>
			</div>
			<div className='flex gap-3 items-center justify-center py-5'>
				<p className='font-medium'>Powered By </p>
				<div className='w-20 h-10 overflow-hidden'>
					<img
						src='/geminilogo.png'
						className='object-contain cursor-pointer'
					/>
				</div>
			</div>
			<div className='py-20'>
				<UploadSection />
			</div>
		</main>
	);
}

export default App;
