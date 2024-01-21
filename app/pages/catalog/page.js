import Footer from "@/app/partials/footer";
import Header from "@/app/partials/header";
import ProductCard from "@/app/ui/articleCard";

export default function Catalog() {
    
    
    return (
        <>
        <Header />
        <main className="py-12 px-12 ">
        <h1 className="text-5xl font-bold my-12 text-blue-950 mt-2">
          Products
        </h1>
            <ProductCard />
        </main>
        <Footer />
        </>
    )
}