"use client"
import Link from "next/link";
import { usePathname } from 'next/navigation'

export default function Header() {
    const pathName = usePathname()

    return (
        <header className="flex flex-col items-center py-4  px-8 bg-blue-900" >
            <section className="space-y-4">
                <h1 className="text-3xl sm:text-5xl font-bold text-white">Strength Palace</h1>
                <ol className="flex space-x-4 justify-center text-white">
                    <Link href='/' className={` ${pathName === '/' ? 'border-b' : ''} hover:border-b transition-transform ease-in-out pb-1 cursor-pointer`}>Home</Link>
                    <Link href='/pages/catalog' className={`${pathName === '/pages/catalog' ? 'border-b' : ''} hover:border-b transition-transform ease-in-out pb-1 cursor-pointer`}>Catalog</Link>
                    <Link href='/pages/contact' className={`${pathName === '/pages/contact' ? 'border-b' : ''} hover:border-b transition-transform ease-in-out pb-1 cursor-pointer`}>Contact</Link>
                </ol>
            </section>
        </header>
    )
}