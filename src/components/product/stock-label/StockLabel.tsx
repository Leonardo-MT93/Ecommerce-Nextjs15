"use client"
import { getStockBySlug } from "@/actions/products/get-stock-by-slug";
import { useState } from "react";
import { titleFont } from "@/config/fonts";
import { useEffect } from "react";

interface Props {
    slug: string;
}

export default function StockLabel({ slug }: Props) {

    const [stock, setStock] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getStock();


    }, [slug]);

    const getStock = async () => {
        const stock = await getStockBySlug(slug);
        setStock(stock);
        setIsLoading(false);
    }


    return (
        <>

        {!isLoading ? (
            <h1 className={`${titleFont.className} antialiased text-lg font-bold`}>
                {`Stock: ${stock}`}

                </h1>
            ) : (
                <h1 className={`${titleFont.className} antialiased text-lg font-bold bg-gray-200 animate-pulse`}>&nbsp;</h1>
            )}
        </>

    )
}