"use client"
import { useState } from "react"
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5"

interface Props {
    quantity: number
}

export default function QuantitySelector({ quantity }: Props) {

    const [currentQuantity, setCurrentQuantity] = useState(quantity);

    const onQuantityChange = (value: number) => {
        if (value < 1) return;
        setCurrentQuantity(value);
    }

    return (
        <div className="flex">
            <button
                onClick={() => onQuantityChange(currentQuantity - 1)}
            >
                <IoRemoveCircleOutline size={30} />
            </button>
            <span className="w-20 mx-3 px-5 bg-gray-200 text-center">{currentQuantity}</span>
            <button
                onClick={() => onQuantityChange(currentQuantity + 1)}
            >
                <IoAddCircleOutline size={30} />
            </button>
        </div>
    )
}