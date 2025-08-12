"use client"
import { titleFont } from "@/config/fonts";
import { IoCartOutline, IoMenuOutline, IoSearchOutline } from "react-icons/io5";
import Link from "next/link";
import { useUiStore } from "@/store";

export default function TopMenu() {
    const openSideMenu = useUiStore((state) => state.openSideMenu)
    return (
        <nav className="flex px-5 justify-between items-center w-full">
            {/* LOGO */}
            <div className="">
                <Link href="/">
                    <span className={`${titleFont.className} antialiased font-bold`}>Teslo</span>
                    <span className="text-sm text-gray-500">|</span>
                    <span className="text-sm text-gray-500">Shop</span>
                </Link>
            </div>

            <div className="hidden sm:block">
                <Link className="m-2 p-2 rounded-md transition-all hover:bg-gray-100" href="/category/men">Men</Link>
                <Link className="m-2 p-2 rounded-md transition-all hover:bg-gray-100" href="/category/women">Women</Link>
                <Link className="m-2 p-2 rounded-md transition-all hover:bg-gray-100" href="/category/kid">Kids</Link>
            </div>
            {/* search, cart, menu */}
            <div className="flex items-center">
                <Link href="/search" className="mx-2">
                    <IoSearchOutline className="w-5 h-5" />
                </Link>
                <Link href="/cart" className="mx-2">
                    <div className="relative">
                        <span className="absolute text-xs rounded-full px-1 font-bold -top-2 bg-blue-700 -right-2 text-white">

                            3
                        </span>
                        <IoCartOutline className="w-5 h-5" />
                    </div>
                </Link>
                <button
                    onClick={openSideMenu}
                    className="m-2 p-2 rounded-md transition-all hover:bg-gray-100">
                    Menu
                </button>
            </div>
        </nav>
    )
}