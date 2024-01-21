export default function Footer() {
  return (
  <footer className="bg-blue-950 h-[400px] ">
    <section className="h-2/3 flex flex-col px-6 items-center justify-center ">
        <h1 className="text-center font-semibold text-white text-5xl">Subscribe to our emails</h1>
        <p className="text-gray-400 mt-2 text-center font-semibold">Be first to know about new collections and exclusive offers </p>
        <input type="email" placeholder="email" className="rounded-xl mt-12 px-4 py-2 md:w-[400px]" />
   </section>
   <section className="border-t w-full border-gray-500 py-12 md:px-12">
    <p className="text-sm text-gray-500 px-4">© 2024, Strength Palace Powered by Shopify</p>
   </section>
  </footer>
  );
}
