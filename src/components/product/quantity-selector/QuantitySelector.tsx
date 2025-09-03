"use client"
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5"

interface Props {
    quantity: number,
    onQuantityChange: (value: number) => void,
}

export default function QuantitySelector({ quantity, onQuantityChange }: Props) {

    // const [currentQuantity, setCurrentQuantity] = useState(quantity);

    const onValueChage = (value: number) => {
        if (quantity + value < 1) return;
        // setCurrentQuantity(value)
        onQuantityChange(quantity + value);
    }

    return (
        <div className="flex">
            <button
                onClick={() => onValueChage(-1)}
            >
                <IoRemoveCircleOutline size={30} className="cursor-pointer" />
            </button>
            <span className="w-20 mx-3 px-5 bg-gray-200 text-center">{quantity}</span>
            <button
                onClick={() => onValueChage(1)}
            >
                <IoAddCircleOutline size={30} className="cursor-pointer" />
            </button>
        </div>
    )
}