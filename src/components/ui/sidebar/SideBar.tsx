"use client"
import { useUiStore } from "@/store/ui/ui-store";
import clsx from "clsx";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { IoCloseOutline, IoLogInOutline, IoLogOutOutline, IoPeopleOutline, IoPersonOutline, IoSearchOutline, IoShirtOutline, IoTicketOutline } from "react-icons/io5";

export default function SideBar() {

    const isSideMenuOpen = useUiStore((state) => state.isSideMenuOpen)
    const closeSideMenu = useUiStore((state) => state.closeSideMenu)

    const { data: session } = useSession();
    const isAuthenticated = !!session?.user;
    const isAdmin = session?.user.role === "admin";



    return (
        <div className="hidden md:block">

            {isSideMenuOpen && (
                <div
                    className="fixed top-0 left-0  w-screen h-screen z-10 bg-black opacity-30" />

            )}
            {isSideMenuOpen && (
                <div
                    onClick={closeSideMenu}

                    className="fade-in fixed top-0 left-0 w-screen h-screen backdrop-filter backdrop-blur-sm z-10" />
            )}


            <nav className={
                clsx(

                    "fixed p-5 top-0 right-0 w-[500px] h-screen bg-white z-20 shadow-2xl transition-all transform duration-300",
                    {
                        "translate-x-full": !isSideMenuOpen,
                    }
                )
            }>
                <IoCloseOutline size={50} className="absolute top-5 right-5 cursor-pointer"
                    onClick={closeSideMenu}
                />
                <div className="relative mt-14 ">
                    <IoSearchOutline size={20} className="absolute top-2 left-2" />
                    <input
                        type="text"
                        placeholder="Search"
                        className="w-full rounded border bg-gray-50 pl-10 py-1 pr-10 border-b-2 text-xl  border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                {
                    !isAuthenticated && (
                        <Link href="/auth/login"
                            onClick={closeSideMenu}
                            className="flex items-center mt-10 p-2  hover:bg-gray-100 transition-all rounded cursor-pointer"
                        >
                            <IoLogInOutline color="blue" size={30} />
                            <span className="ml-3 text-xl text-blue-500 hover:text-blue-800">Login</span>
                        </Link>
                    )
                }
                {
                    isAuthenticated && session?.user?.role === "admin" && (
                        <>
                            <Link href="/profile"
                                onClick={closeSideMenu}
                                className="flex items-center mt-10 p-2  hover:bg-gray-100 transition-all rounded"
                            >
                                <IoPersonOutline size={30} />
                                <span className="ml-3 text-xl ">Profile</span>
                            </Link>
                            <div className="w-full h-px bg-gray-200 my-10" />
                            <Link href="/"
                                className="flex items-center mt-10 p-2  hover:bg-gray-100 transition-all rounded"
                            >
                                <IoShirtOutline size={30} />
                                <span className="ml-3 text-xl ">Products</span>
                            </Link>
                            <Link href="/"
                                className="flex items-center mt-10 p-2  hover:bg-gray-100 transition-all rounded"
                            >
                                <IoTicketOutline size={30} />
                                <span className="ml-3 text-xl ">Orders</span>
                            </Link>
                            <Link href="/"
                                className="flex items-center mt-10 p-2  hover:bg-gray-100 transition-all rounded"
                            >
                                <IoPeopleOutline size={30} />
                                <span className="ml-3 text-xl ">Users</span>
                            </Link>
                            <div className="w-full h-px bg-gray-200 my-10" />
                            <button
                                onClick={() => signOut({ callbackUrl: '/' })}
                                onClickCapture={() => closeSideMenu()}
                                className="flex items-center mt-10 p-2  hover:bg-red-100 transition-all rounded cursor-pointer"
                            >
                                <IoLogOutOutline color="red" size={30} />
                                <span className="ml-3 text-xl text-red-500">Logout</span>
                            </button>
                        </>



                    )
                }
                {
                    isAuthenticated && session?.user?.role === "user" && (
                        <>
                            <Link href="/profile"
                                onClick={closeSideMenu}
                                className="flex items-center mt-10 p-2  hover:bg-gray-100 transition-all rounded"
                            >
                                <IoPersonOutline size={30} />
                                <span className="ml-3 text-xl ">Profile</span>
                            </Link>
                            <Link href="/"
                                className="flex items-center mt-10 p-2  hover:bg-gray-100 transition-all rounded"
                            >
                                <IoTicketOutline size={30} />
                                <span className="ml-3 text-xl ">Orders</span>
                            </Link>
                            <div className="w-full h-px bg-gray-200 my-10" />
                            <button
                                onClick={() => signOut({ callbackUrl: '/' })}
                                onClickCapture={() => closeSideMenu()}
                                className="flex items-center mt-10 p-2  hover:bg-red-100 transition-all rounded cursor-pointer"
                            >
                                <IoLogOutOutline color="red" size={30} />
                                <span className="ml-3 text-xl text-red-500">Logout</span>
                            </button>
                        </>
                    )
                }



            </nav>
        </div>
    )
}