import { prisma } from '@/src/lib/prisma'
import CategoryIcon from '../ui/CategoryIcon'
import Logo from '../ui/Logo'

// Infiere el tipo de retorno de findMany
type Category = Awaited<ReturnType<typeof prisma.category.findMany>>[number]

async function getCategories(): Promise<Category[]> {
  return await prisma.category.findMany()
}

export default async function OrderSidebar() {
  const categories = await getCategories()

  return (
    <aside className="md:w-72 md:h-screen bg-white">
      <Logo />
      <nav className='mt-10'>
        {categories.map((category: Category) => (
          <CategoryIcon 
            key={category.id}
            category={category}
          />
        ))}
      </nav>
    </aside>
  )
}