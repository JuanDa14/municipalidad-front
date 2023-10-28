import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Carousel } from "@/app/(root)/_components/carousel";
import { news,services,objects } from "@/data/news";
import { Separator } from "@/components/ui/separator";

const RootPage = async () => {
  return (
    <div id="hero" className="">
      <Carousel  />
      <div className="max-w-7xl mt-28 mx-auto space-y-28 px-10">
        {/* Noticias */}
        <div id="news" className="space-y-10">
          <div className="text-center">
            <h3 className="text-2xl font-bold">Noticias</h3>
            <p className="text-xl font-medium">Gobierno Municipdal</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {news.map((n, i) => (
              <div key={i}>
                <h4 className="font-bold">{n.tittle}</h4>
                <span>{n.date}</span>
                <Separator className="mb-5 mt-2" />
                <p className="text-justify mb-5">{n.new}</p>
                <Link href={n.url} target="_blank">
                  <Button>Leer más</Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
        {/* Servicios */}
        <div id="services" className="space-y-10">
          <div className="text-center">
            <h3 className="text-2xl font-bold">Servicios</h3>
            <p className="text-xl font-medium">
              Te atenderemos de la mejor manera
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {services.map((s, i) => (
              <div className="flex flex-col items-center justify-start gap-5" key={i}>
                <Image
                  className="object-cover rounded-xl shadow-lg w-full  "
                  src={s.image}
                  alt="Picture of the author"
                  height={150}
                  width={150}
                />
                <div>
                  <h4 className="font-bold">{s.tittle}</h4>
                  <Separator className="mb-3 mt-1" />

                  <p className="text-justify">{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Mision y Vision */}
        <div className="space-y-10 border p-10 rounded-lg">
          <div className="text-center">
            <h3 className="text-2xl font-bold">Mision y Vision</h3>
            <p className="text-xl font-medium">
              Nuestro compromiso es con la ciudadania
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {objects.map((o, i) => (
              <div
                className="flex flex-col justify-start items-center gap-5"
                key={i}
              >
                <Image
                  className="object-cover object-center rounded-lg w-[250px] h-[150px] shadow-lg"
                  src={o.image}
                  alt="Picture of the author"
                  height={150}
                  width={150}
                />
                <div>
                  <p className="text-justify">
                    {o.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RootPage;
