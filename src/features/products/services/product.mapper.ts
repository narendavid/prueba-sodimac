import type { Product, ApiProduct } from "@/types/product";

export const mapApiProductToProduct = (apiProduct: ApiProduct): Product => {
	const { price, priceWithoutFormatting } = apiProduct.prices[0] ?? { price: '$0', priceWithoutFormatting: 0 };

	return {
		id: apiProduct.productId,
		name: apiProduct.displayName,
		image: apiProduct.mediaUrls[0] || "",
		price: priceWithoutFormatting,
		priceFormatted: price,
	};
};

export const mapApiProductsToProducts = (
	apiProducts: ApiProduct[]
): Product[] => {
	return apiProducts.map(mapApiProductToProduct);
};
