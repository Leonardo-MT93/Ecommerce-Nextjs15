import { titleFont } from "@/config/fonts";
import Link from "next/link";

export default function Footer() {
    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row w-full justify-center text-xs mb-10 gap-2 sm:gap-0">
                <Link href="/">
                    <span className={`${titleFont.className} antialiased font-bold`}>Teslo | Shop </span>
                    <span>All rights reserved</span>
                    <span> - </span>
                    <span>©{new Date().getFullYear()}</span>
                </Link>
                <Link href="/" className="sm:mx-3">
                    <span>Terms and conditions</span>
                    <span> - </span>
                    <span>Privacy policy</span>
                </Link>
            </div>
        </div>
    )
}