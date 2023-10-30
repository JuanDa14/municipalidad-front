import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Carousel } from '@/app/(root)/_components/carousel';
import { Separator } from '@/components/ui/separator';
import { MunicipalNews } from './_components/municipal-news';
import { municipalNews, municipalServices, municipalVisianAndMission } from '@/data/seed';
import { MunicipalServices } from './_components/municipal-services';
import { MunicipalVisionMission } from './_components/municipal-vision-mission';

const RootPage = async () => {
	return (
		<div id='hero'>
			<Carousel />
			<div className='space-y-10'>
				{/* Noticias */}
				<MunicipalNews news={municipalNews} />
				{/* Servicios */}
				<MunicipalServices services={municipalServices} />

				{/* Mision y Vision */}
				{/* <MunicipalVisionMission municipalVisianAndMissions={municipalVisianAndMission} /> */}
			</div>
		</div>
	);
};

export default RootPage;
