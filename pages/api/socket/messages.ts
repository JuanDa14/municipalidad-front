import { NextApiResponseServerIo } from '@/types';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponseServerIo) {
	if (req.method !== 'POST') {
		return res.status(405).json({ message: 'Metodo no permitido' });
	}

	try {
		const { message } = req.body;

		if (!message) {
			return res.status(400).json({ message: 'Falta el mensaje' });
		}
	} catch (error) {
		console.log('[MESSAGES_POST]', error);
		return res.status(500).json({ message: 'Error interno del servidor' });
	}
}
