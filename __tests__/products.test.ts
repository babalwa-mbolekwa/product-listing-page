import { Product } from "@/types/product";
import { filterProducts, formatPrice, getCategories, sortProducts } from "@/lib/utils";

const products: Product[] = [
  {
    createdAt: "2026-06-14T13:47:33.835Z",
    title: "Soft Wooden Chair",
    image: "https://picsum.photos/seed/UQk3wMI/1320/1565",
    category: "Movies",
    price: "721.39",
    id: "1",
  },
  {
    createdAt: "2026-06-14T23:25:26.467Z",
    title: "Bespoke Silk Car",
    image: "https://loremflickr.com/2886/1985?lock=5433730127925866",
    category: "Kids",
    price: "203.69",
    id: "2",
  },
  {
    createdAt: "2026-06-14T16:16:27.501Z",
    title: "Licensed Gold Fish",
    image: "https://picsum.photos/seed/1VrwhMj3/727/2466",
    category: "Kids",
    price: "248.75",
    id: "3",
  },
  {
    createdAt: "2026-06-14T23:39:03.509Z",
    title: "Tasty Concrete Chips",
    image: "https://loremflickr.com/674/880?lock=2913952307247669",
    category: "Automotive",
    price: "956.69",
    id: "4",
  }
];

describe("filterProducts", () => {
    it("returns every product when no filter is applied", () => {
        const result = filterProducts(products, {
            categories: [],
            minPrice: 0,
            maxPrice: 1000,
        });
        expect(result).toHaveLength(4);
    });

    it("filters by a single category", () => {
        const result = filterProducts(products, {
            categories: ["Kids"],
            minPrice: 0,
            maxPrice: 1000,
        });
        expect(result.map((p) => p.id)).toEqual(["2", "3"])
    })

    it("combines category and price filters", () => {
        const result = filterProducts(products, {
            categories: ["Kids"],
            minPrice: 0,
            maxPrice: 230,
        });
        expect(result.map((p) => p.id)).toEqual(["2"])
    })

    it("returns an empty array when nothing matches", () => {
        const result = filterProducts(products, {
            categories: ["Electronics"],
            minPrice: 0,
            maxPrice: 230,
        });
        expect(result).toEqual([])
    })
})

describe("getCategories", () => {
    it("returns a de-duplicated, alphabetised list of categories", () => {
        expect(getCategories(products)).toEqual(["Automotive", "Kids", "Movies"]);
    })
})

describe("sortProducts", () => {
    it("sorts by price ascending", () => {
        const result = sortProducts(products, "price-asc");
        expect(result.map((p) => p.id)).toEqual(["2", "3", "1", "4"])
    })

    it("sorts by price descending", () => {
        const result = sortProducts(products, "price-desc");
        expect(result.map((p) => p.id)).toEqual(["4", "1", "3", "2"])
    })
})

describe("formatPrice", () => {
    it("formats numeric string price with a dollar sign and two decimals", () => {
        expect(formatPrice("230.19")).toBe("$230.19");
        expect(formatPrice("9")).toBe("$9.00");

    })
})
