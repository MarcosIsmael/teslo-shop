export const revalidate = false;

import { getPaginatedWithImages } from "@/actions";
import { Pagination, ProductGrid, Title } from "@/components";
import { Categories } from "@/interfaces";
import { initialData } from "@/seed/seed";
import { Gender } from "@prisma/client";
import { notFound, redirect } from "next/navigation";

interface Props {
  params: {
    gender: string;
  };
  searchParams: {
    page?: string;
  };
}

async function GenderPage({ params, searchParams }: Props) {
  const { gender } = params;

  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  const { products, currentPage, totalPages } = await getPaginatedWithImages({
    page,
    gender: gender as Gender,
  });

  if (products.length === 0) {
    redirect(`/gender/${gender}`);
  }
  const label: Record<string, string> = {
    kid: "Niños",
    men: "Hombres",
    unisex: "Unisex",
    women: "Mujeres",
  };
  const labelSubtitle: Record<string, string> = {
    kid: "Ellos",
    men: "Ellos",
    unisex: "Todos",
    women: "Ellas",
  };

  // if (!Boolean(label[gender])) {
  //   notFound();
  // }

  return (
    <div>
      <Title
        title={`Todos los articulos de ${label[gender]}`}
        subtitle={`Articulos para ${labelSubtitle[gender]}`}
        className="mb-2"
      />

      <ProductGrid products={products} />

      <Pagination totalPages={totalPages} />
    </div>
  );
}

export default GenderPage;
