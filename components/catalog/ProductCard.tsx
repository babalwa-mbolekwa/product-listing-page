import React from "react"
import { Product } from "@/types/product"
import Image from "next/image"
import { Button } from "../ui/button"
import { ShoppingCart } from "lucide-react"
import { formatPrice } from "@/lib/products"

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
      <article className="flex h-full flex-col overflow-hidden rounded-lg border border-[#C3C6D7]">
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
        <div className="flex flex-1 flex-col justify-between gap-1 p-4">
          <div>
            <p className="text-sm font-semibold tracking-wide text-[#434655] uppercase">
              {product.category}
            </p>
            <h3 className="text-2xl font-semibold text-[#0B1C30]">
              {product.title}
            </h3>
          </div>

          <div className="mt-2 flex items-center justify-between">
            <span className="text-[20px] font-bold text-custom-blue">
              {formatPrice(product.price)}
            </span>
            <Button
              size="icon"
              variant="ghost"
              className="h-11 w-11 bg-custom-blue"
              aria-label={`Add ${product.title} to cart`}
            >
              <ShoppingCart
                className="bg-custom-blue text-white"
                aria-hidden="true"
              />
            </Button>
          </div>
        </div>
      </article>
    </li>
  )
}

export default ProductCard
