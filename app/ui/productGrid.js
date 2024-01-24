import React from "react";
import Link from "next/link";
import useResizeEffect from '@/app/tools/resizeEffect'

const ProductCard = ({ product }) => (
  <section className="bg-white rounded-xl hover:scale-110 transition-transform ease-in-out shadow-xl p-4 max-w-sm w-full mx-auto">
    <Link href={product.Link}>
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-[150px] md:h-[300px] object-cover rounded-lg mb-4  hover:brightness-90"
      />
    </Link>
    <article className="text-center">
      <h2 className="text-xl font-medium h-[60px] md:h-[113px] overflow-hidden wrap w-full text-gray-800 mb-2 ">
        {product.title}
      </h2>
      <p className="text-gray-600 mb-4 text-lg font-semibold">
        ${product.price}
      </p>
      <Link
        href={product.Link}
        className="text-white font-semibold px-6 py-2 bg-blue-600 hover:bg-blue-900 rounded"
      >
        Buy now
      </Link>
    </article>
  </section>
);

const ProductGrid = ({ numberOfProducts, products }) => {
  const productData = products || [];
  const displayedProducts = numberOfProducts
    ? productData.slice(0, numberOfProducts)
    : productData;

    const pageWidth = useResizeEffect(undefined, 300);
  return (
    <section>
      <section className={`grid ${pageWidth >= 300 ? 'grid-cols-2' : 'grid-cols-1'} md:grid-cols-3 lg:grid-cols-4 gap-4`}>
        {displayedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>
    </section>
  );
};

export default ProductGrid;
