import ProductCard from "@/components/products/ProductCard";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma"

// Infiere el tipo de retorno de findMany
type Product = Awaited<ReturnType<typeof prisma.product.findMany>>[number]

async function getProducts(category: string): Promise<Product[]> {
  const products = await prisma.product.findMany({
    where: {
      category: {
        slug: category
      }
    }
  })

  return products;
}

export default async function OrderPage({params}: {params: Promise<{ category: string }>}) {
  const { category } = await params
  const products: Product[] = await getProducts(category)

  return (
    <>
      <Heading>
        Elige y personaliza tu pedido a continuacion
      </Heading>

      <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-4 items-start gap-4">
        {products.map((product: Product) => (
          <ProductCard 
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </>
  )
}