import ProductCard from "@/components/products/ProductCard";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma"
import { Product } from "@prisma/client";

async function getProducts(category: string): Promise<Product[]>{
  const products = await prisma.product.findMany({
    where: {
      category: {
        slug: category
      }
    }
  })

  return products;
}

export default async function OrderPage({searchParams} : {searchParams: Promise<{ [key: string]: string | string[] | undefined }>;}) {
  const { category } = await searchParams
  const categoryParam = typeof category === "string" ? category : ""
  const products = await getProducts(categoryParam)

  return (
    <>
    <Heading>
      Elige y personaliza tu pedido a continuacion
    </Heading>

      <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-4 items-start gap-4">
        {products.map(product =>(
          <ProductCard 
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </>
  )
}
