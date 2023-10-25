interface QRLayoutProps {
	children: React.ReactNode;
}

const QRLayout = ({ children }: QRLayoutProps) => {
	return (
		<main className='min-h-screen w-full flex flex-col items-center justify-center'>
			{children}
		</main>
	);
};

export default QRLayout;
