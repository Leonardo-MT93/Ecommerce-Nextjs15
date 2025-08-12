import { titleFont } from "@/config/fonts";
import Link from "next/link";

export default function Footer() {
    return (
        <div className="flex w-full justify-center text-xs mb-10">
            <Link href="/">
                <span className={`${titleFont.className} antialiased font-bold`}>Teslo | Shop </span>
                <span>All rights reserved</span>
                <span> - </span>
                <span>©{new Date().getFullYear()}</span>
            </Link>
            <Link href="/" className="mx-3">
                <span>Terms and conditions</span>
                <span> - </span>
                <span>Privacy policy</span>
            </Link>
        </div>
    )
}