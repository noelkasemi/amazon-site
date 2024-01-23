"use client";
import Footer from "@/app/partials/footer";
import { useState } from "react";
import Header from "@/app/partials/header";
import ProductGrid from "@/app/ui/productGrid";
import products from "@/app/data/products.json";
import SortFeature from "@/app/tools/sortFeature/sortFeature";
import {
  priceOptions,
  titleOptions,
  handleSortPriceChange,
  handleSortTitleChange,
} from "@/app/tools/sortFeature/sortUtils";
import ProductSearch from "@/app/tools/productSearch";

export default function Catalog() {
  const [sortedProducts, setSortedProducts] = useState(products);

  // Separate state for each SortFeature
  const [sortOrderPrice, setSortOrderPrice] = useState("default");
  const [sortOrderTitle, setSortOrderTitle] = useState("default");


  return (
    <>
      <Header />
      <main className="py-12 px-4 md:px-12 ">
        <h1 className="text-5xl font-bold my-12 text-blue-950 mt-2">
          Products
        </h1>
        <h2 className="text-xl font-semibold mb-2">Filter :</h2>
        <section className="mb-8 flex flex-col md:flex-row  md:items-center">
          <article className="flex space-x-4 ">
            <SortFeature
              title={"Price"}
              onSortChange={(selectedSort) =>
                handleSortPriceChange(
                  selectedSort,
                  products,
                  setSortOrderPrice,
                  setSortedProducts
                )
              }
              defaultSort={sortOrderPrice}
              sortOptions={priceOptions}
            />
            <SortFeature
              title={"Alphabetically"}
              onSortChange={(selectedSort) =>
                handleSortTitleChange(
                  selectedSort,
                  products,
                  setSortOrderTitle,
                  setSortedProducts
                )
              }
              defaultSort={sortOrderTitle}
              sortOptions={titleOptions}
            />
          </article>
          <section className="w-full flex md:pl-12 relative h-fit mt-8 mb-4">
              <ProductSearch data={sortedProducts} />
          </section>
        </section>
        <ProductGrid products={sortedProducts} />
      </main>
      <Footer />
    </>
  );
}
