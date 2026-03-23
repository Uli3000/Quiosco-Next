import ProductSearchForm from "@/components/products/ProductSearchForm";
import ProductTable from "@/components/products/ProductTable";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";

async function searchProducts(searchTerm: string) {
    const products = await prisma.product.findMany({
        where:{
            name: {
                contains: searchTerm,
                mode: 'insensitive'
            }
        },
        include: {
            category: true
        }
    })

    return products
}

export default async function SearchPage({searchParams} : {searchParams: Promise<{ [key: string]: string | string[] | undefined }>;}) {
    const { search } = await searchParams
    const searchTerm = typeof search === "string" ? search : "";

    const products = await searchProducts(searchTerm)
  return (
    <>
        <Heading>Resultados de busqueda: {searchTerm}</Heading>

        <div className="flex flex-col gap-5 lg:flex-row lg:justify-end">
            <ProductSearchForm />
        </div>

        {products.length ? (
            <ProductTable 
                products={products}
            />
        ) : <p className="text-center text-lg">No hay resultados</p>}
        
    </>
  )
}
