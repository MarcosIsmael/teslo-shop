import { ProductGrid, Title } from "@/components";
import { Categories } from "@/interfaces";
import { initialData } from "@/seed/seed";

interface Props {
  params: {
    id: Categories;
  };
}

function CategoryPage({ params }: Props) {
  const { id } = params;
  const products = initialData.products.filter(
    (product) => product.gender === id
  );
  const label: Record<Categories, string> = {
    kid: "Niños",
    men: "Hombres",
    unisex: "Unisex",
    women: "Mujeres",
  };
  const labelSubtitle: Record<Categories, string> = {
    kid: "Ellos",
    men: "Ellos",
    unisex: "Todos",
    women: "Ellas",
  };

  // if (id === "kids") {
  //   notFound();
  // }

  return (
    <div>
      <Title
        title={`Todos los articulos de ${label[id]}`}
        subtitle={`Articulos para ${labelSubtitle[id]}`}
        className="mb-2"
      />

      <ProductGrid products={products} />
    </div>
  );
}

export default CategoryPage;
