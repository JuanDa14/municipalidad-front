import { format, subDays } from 'date-fns';

export interface MunicipalNew {
	tittle: string;
	date: string;
	description: string;
	url: string;
}

export const municipalNews: MunicipalNew[] = [
	{
		tittle: 'PARROQUIA S.M.P. CONTINUA TRABAJO EN TECHO DE SALON PARROQUIAL',
		date: format(new Date(), 'dd/MM/yyyy'),
		description: `PARROQUIA S.M.P. CONTINUA TRABAJO EN TECHO DE SALON PARROQUIAL GRACIAS A LA UNIDAD Y COLABORACION DE VECINOS
El Comité Parroquial informa que  se viene dando altura a la otra parte del salón gracias al apoyo del pueblo, mediante «Bingos», aportes económicos Anonimos, apoyo con mano de obra, entre otros. Hacen un agredicimiento especial a la Familia Flores
Por su apoyo con una volquetada de ripio`,
		url: 'https://www.facebook.com/permalink.php?story_fbid=pfbid0TNBmhhudpL5hz7SN1b6FiGW3QS4dP4pBFU5XP8Yg7TgQAFRUirRsvrCtzYSwmPQxl&id=100009636243866',
	},
	{
		tittle: 'NUEVO JUEZ DE PAZ DEL C.P. SAN MARTIN DE PORRES',
		date: format(subDays(new Date(), 7), 'dd/MM/yyyy'),
		description: `⚖️YÁ ESTA ATENDIENDO EL NUEVO JUEZ DE PAZ DEL C.P. SAN MARTIN DE PORRES Victor Leonardo Vasquez Bernales . ⚖️
Poder Judicial da a conocer el documento que certifica al nuevo Juez de Paz del Nuestro Centro poblado San Martin de Porres.
El nuevo Local del juzgado de Paz está Ubicado en Av panamericana # 982  `,
		url: 'https://www.facebook.com/permalink.php?story_fbid=pfbid031AJnGjTpqQcKNaX5wrpyz556XcqeBER6UV6nB4jbyQCTaQuXJUihyY2VzeFD2k1Tl&id=100009636243866',
	},
	{
		tittle: 'PARROQUIA S.M.P. CONSTRUYE TECHO DE SALON PARROQUIAL',
		date: format(subDays(new Date(), 14), 'dd/MM/yyyy'),
		description:
			'PARROQUIA S.M.P. CONSTRUYE TECHO DE SALON PARROQUIAL GRACIAS A LA UNIDAD Y COLABORACION DE VECINOS La construcción del techo del salón parroquial tiene un avance del 50%, gracias al apoyo mancomunado de los ciudadanos y entidades. El Comite, informa que el trabajo se hace gracias al apoyo del pueblo, mediante «Bingos», aportes económicos Anonimos, apoyo con mano de obra, entre otros.',
		url: 'https://www.facebook.com/permalink.php?story_fbid=pfbid0e7tJu9CXjkeGYfKVQiN7d1F5qcZL6c42YEv2DG7x8yyzskmB5MuVo8LFrsXqPRDBl&id=100009636243866',
	},
];

export interface MunicipalService {
	title: string;
	description: string;
	image: string;
}

export const municipalServices: MunicipalService[] = [
	{
		title: 'Agua y desagüe',
		description:
			'Nuestro centro poblado ofrece los servicios de agua y desagüe, siempre en constante cuidado de verificar que todos nuestros pobladores reciban agua y el servicio de desagüe en el moemnto indicado.',
		image: '/agua.webp',
	},
	{
		title: 'Baja Policia',
		description:
			'el centro poblado ofrece el servicio de baja policia encargado de mantener las calles limpias para cuidar nuestras calles y a sus ciudadanos.',
		image: '/baja-policia.webp',
	},
	{
		title: 'SISA',
		description:
			'El sistema impositorio de servicios ambulatorios es uno de los servicios que permite evitar el comercio ilegal y ofrecer a nuestros comerciantes mejores oportunidades.',
		image: '/sisa.webp',
	},
	{
		title: 'Evento Deportivo',
		description:
			'Nuestra municipalidad tambien permite gestionar caulauier evento deportivo en el que se necesite del uso de nuestro estadio, siendo estos netamente deportivos u otro tipo de evento',
		image: '/deporte.webp',
	},
	{
		title: 'Registros Civiles',
		description:
			'Otro de nuestros servicios son los registros civiles ante cualquier dituación de nuestros ciudadanos, buscando siempre la transparencia y rapidez en los procesos',
		image: '/civiles.webp',
	},
];

export interface MunicipalVisianAndMission {
	description: string;
	image: string;
}

export const municipalVisianAndMission: MunicipalVisianAndMission[] = [
	{
		description:
			'Somos una Municipalidad comprometida con el bienestar de nuestros ciudadanos, trabajando incansablemente para proporcionar servicios de calidad, promover el desarrollo sostenible, y garantizar un entorno seguro y saludable para todos los residentes de nuestro centro poblado. Nuestra misión es liderar con transparencia, eficiencia y participación ciudadana, promoviendo el progreso social y económico en armonía con nuestra cultura y tradiciones',
		image: '/mision.webp',
	},
	{
		description:
			'Nos visualizamos como una Municipalidad modelo en la provincia, reconocida por su gestión innovadora y eficiente, que mejora constantemente la calidad de vida de sus habitantes. Queremos ser un referente en la promoción del desarrollo económico sostenible, la preservación del medio ambiente. Trabajaremos en estrecha colaboración con nuestra comunidad, siendo un faro de participación ciudadana y empoderamiento, para construir un futuro próspero y equitativo para todos en nuestro distrito.',
		image: '/vision.png',
	},
];
