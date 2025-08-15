"use client";

import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";
import Link from "next/link";
import { redirect, usePathname, useSearchParams } from "next/navigation";
import { generatePaginationNumbers } from "@/utils";
import clsx from "clsx";

interface Props {
    totalPages: number;
}

export default function Pagination({ totalPages }: Props) {

    const pathName = usePathname();

    const searchParams = useSearchParams();

    let currentPage = searchParams.get("page") ?? 1;


    //validacion si el page es string o su valor es igual o menor a 0 o es mayor al total de paginas
    if (isNaN( +currentPage ) || +currentPage <= 0) {
        redirect("/");
    } else {
        currentPage = Number(currentPage);
        if (currentPage > totalPages) {
            redirect("/");
        }
    }


    const allPages = generatePaginationNumbers(currentPage, totalPages);

    const createPageUrl = (page: number | string) => {
        const params = new URLSearchParams(searchParams);
        if (page === '...') { //Ejemplo: ...
            return `${pathName}?${params.toString()}`;
        }

        if (+page <= 0) { //Ejemplo: href="/kid"
            return `${pathName}?`
        }
        if (+page > totalPages) { //Ejemplo: Next >
            return `${pathName}?${params.toString()}`;
        }
        params.set("page", page.toString()); //Ejemplo: href="/kid?page=2"
        return `${pathName}?${params.toString()}`;
    }



    return (
        <div className="flex items-center text-center mt-10 mb-32 justify-center">
            <nav aria-label="Page navigation example">
                <ul className="flex list-style-none">
                    <li className="page-item"><Link
                        className="page-link relative block py-1.5 px-3  border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                        href={createPageUrl(currentPage - 1)} aria-disabled="true"><IoChevronBackOutline /></Link></li>

                    {
                        allPages.map((page, index) => (
                            <li key={page + '-' + index} className="page-item">
                                <Link
                                    className={
                                        clsx(
                                            "page-link relative block py-1.5 px-3  border-0 outline-none transition-all duration-300 rounded text-gray-800 focus:shadow-none",
                                            {
                                                "bg-blue-400 shadow-md text-white hover:text-white hover:bg-blue-700": page === currentPage,
                                            }
                                        )
                                    }
                                    href={createPageUrl(page)}>{page}</Link>
                            </li>
                        ))}



                    <li className="page-item"><Link
                        className="page-link relative block py-1.5 px-3  border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                        href={createPageUrl(currentPage + 1)}><IoChevronForwardOutline /></Link></li>
                </ul>
            </nav>
        </div>
    )
}