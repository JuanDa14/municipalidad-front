import { Carousel } from '@/app/(root)/_components/carousel';
import { MunicipalNews } from './_components/municipal-news';
import { municipalNews, municipalServices, municipalVisianAndMission } from '@/data/seed';
import { MunicipalServices } from './_components/municipal-services';
import { MunicipalContact } from './_components/municipal-contact';
import { MunicipalVisionMission } from './_components/municipal-vision-mission';

const RootPage = async () => {
	return (
		<div id='inicio'>
			<Carousel />
			<div className='space-y-10'>
				{/* Noticias */}
				<MunicipalNews news={municipalNews} />
				{/* Servicios */}
				<MunicipalServices services={municipalServices} />

				<MunicipalContact />

				{/* Mision y Vision */}
				{/* <MunicipalVisionMission municipalVisianAndMissions={municipalVisianAndMission} /> */}
			</div>
		</div>
	);
};

export default RootPage;
