import ProductListing from "@/components/catalog/ProductListing"
import { getProducts } from "@/lib/api"

export default async function Page() {
  const products = await getProducts()
  return <ProductListing products={products} />
}
