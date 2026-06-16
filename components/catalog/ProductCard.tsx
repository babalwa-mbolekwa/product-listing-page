import React from "react"
import { Product } from "@/types/product"
import Image from "next/image"
import { formatPrice } from "@/lib/utils"
import { Button } from "../ui/button"
import { ShoppingCart } from "lucide-react"

interface ProductCardProps {
  product: Product
  priority?: boolean // for prioritising the first few images so they aren't lazy loaded on blank skeleton
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  priority = false,
}) => {
  return (
    <li className="group list-none">
      <article className="flex h-full flex-col overflow-hidden rounded-lg border">
        <div className="relative aspect-4/3 w-full overflow-hidden bg-muted">
          <Image
            src={product.image}
            alt={product.title}
            fill
            priority={priority}
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <div className="flex flex-1 flex-col gap-1 p-4">
          <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
            {product.category}
          </p>
          <h3 className="text-sm font-semibold text-foreground">
            {product.title}
          </h3>
          <div className="mt-2 flex items-center justify-between">
            <span>{formatPrice(product.price)}</span>
            <Button
              size="icon"
              variant="default"
              className="md:hidden"
              aria-label={`Add ${product.title} to cart`}
            >
              <ShoppingCart className="h-4 w-4 bg-custom-blue text-white" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </article>
    </li>
  )
}

export default ProductCard
