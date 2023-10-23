interface QRLayoutProps {
	children: React.ReactNode;
}

const QRLayout = ({ children }: QRLayoutProps) => {
	return <main className='flex flex-col h-full items-center'>{children}</main>;
};

export default QRLayout;
