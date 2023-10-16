import React from 'react';
import { ButtonChatBot } from './_components/button-chat-bot';
import { Navbar } from './_components/navbar';
import { Footer } from './_components/footer';

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
