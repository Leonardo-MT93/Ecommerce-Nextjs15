import { titleFont } from "@/config/fonts";

interface Props {
    title: string;
    subtitle?: string;
    className?: string;
}

export default function Title({ title, subtitle, className }: Props) {
    return (
        <div className={`mt-3 ${className}`}>
            <h1 className={`${titleFont.className} antialiased text-2xl sm:text-3xl lg:text-4xl font-semibold my-6 sm:my-8 lg:my-10`}>{title}</h1>
            {subtitle && <h3 className="text-lg sm:text-xl mb-3 sm:mb-5">{subtitle}</h3>}
        </div>
    )
}