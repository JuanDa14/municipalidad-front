import { Navbar } from '@/app/(root)/_components/navbar';
import React from 'react';
import { ButtonChatBot } from '@/app/(root)/_components/button-chat-bot';
import { Footer } from '@/app/(root)/_components/footer';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className='w-full min-h-screen relative mx-auto flex flex-col'>
			<Navbar />
			<main className='h-full pt-16 flex-1'>
				{children}
				<ButtonChatBot />
			</main>
			<Footer />
		</div>
	);
};

export default RootLayout;
