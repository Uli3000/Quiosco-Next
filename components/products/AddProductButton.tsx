"use client"

import { prisma } from "@/src/lib/prisma"
import { useStore } from "@/src/store"

// Infiere el tipo Product directamente del modelo
type Product = Awaited<ReturnType<typeof prisma.product.findFirst>>

type AddProductButtonProps = {
  product: NonNullable<Product>  // NonNullable elimina la posibilidad de null
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