import { titleFont } from "@/config/fonts";
import { initialData } from "@/seed/seed";
import { notFound } from "next/navigation";

interface ProductPageProps {
  params: {
    slug: string;
  };
}

export default function ProductPageSlug({ params }: ProductPageProps) {
  const { slug } = params;
  const products = initialData.products.find(
    (product) => product.slug === slug
  );
  if (!products) {
    notFound();
  }
  return (
    <div className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3">
      {/** SlideShow */}
      <div className="col-span-1  md:col-span-2">
        <h1>Hola mundo</h1>
      </div>
      {/** Detail */}
      <div className="col-span-1 px-5">
        <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
          {products.title}
        </h1>
        <p className="text-lg mb-5">{products.price}</p>

        {/** Selector de tallas */}

        {/** Selector de cantidad */}

        <button className="btn-primary my-5">Agregar al carrito</button>

        {/** Descripcion */}
        <h3 className="font-bold text-sm "> Descripción</h3>
        <p className="font-light">{products.description}</p>
      </div>
    </div>
  );
}
