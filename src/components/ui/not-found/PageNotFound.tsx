import { titleFont } from "@/config/fonts";
import Image from "next/image";
import Link from "next/link";

export default function PageNotFound() {
    return (
        <div className="flex flex-col-reverse md:flex-row h-[800px] w-full   items-center justify-center align-middle">
            <div className="text-center px-5 mx-5">
                <h2 className={`${titleFont.className} antialiased text-9xl font-bold`}>404</h2>
                <p className=" text-2xl font-semibold">Page Not Found</p>
                <p className="text-gray-500">The page you are looking for does not exist.</p>
                <Link href="/" className="font-normal hover:underline transition-all">Go to Home</Link>
            </div>
            <div className="px-5 mx-5">
                <Image src="/imgs/starman_750x750.png" alt="starman" width={550} height={550} className="p-5 sm:p-0" />
            </div>
        </div>



    )
}