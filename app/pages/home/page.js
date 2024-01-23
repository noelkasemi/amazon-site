'use client'
 
import { useRouter } from 'next/navigation'
import Footer from "@/app/partials/footer";
import Header from "@/app/partials/header";
import ProductCard from "@/app/ui/productGrid";

export default function HomePage() {
  const router = useRouter()
  return (
    <>
      <Header />
      <main className="w-full h-[300px] sm:h-[400px] md:h-screen relative">
      <img src="/dumbbells.jpg" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <article className="bg-white w-full md:w-[550px] py-12 space-y-8 md:absolute bottom-44 left-12 px-6 rounded-xl md:z-20">
          <h1 className="text-3xl md:text-5xl font-bold  text-blue-950 mt-2">
            Browse our latest products
          </h1>
          <button onClick={() => router.push('/pages/catalog')} className="rounded py-2 px-5 bg-blue-950 text-white hover:bg-blue-700">
            Shop all
          </button>
        </article>
      </main>
      <section className="py-4 bg-[#eff0f5] px-12 space-y-12 mt-44 md:mt-0">
        <h1 className="text-5xl font-bold  text-blue-950 mt-2">
          Featured products
        </h1>
        <ProductCard numberOfProducts={4} />
      </section>
      <Footer />
    </>
  );
}
