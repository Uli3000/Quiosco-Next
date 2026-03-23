"use client"

import { Prisma } from "@prisma/client"
import { useStore } from "@/src/store"

// Define el tipo Product excluyendo null
type Product = NonNullable<Prisma.ProductGetPayload<{}>>

type AddProductButtonProps = {
  product: Product
}

export default function AddProductButton({product}: AddProductButtonProps) {
  const addToOrder = useStore((state) => state.addToOrder)

  return (
    <button
        type="button"
        className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer"
        onClick={() => addToOrder(product)}
    >Agregar</button>
  )
}