// utils/cartUtils.js
export function buildCartItem(product, quantity = 1, variant = null) {
    return {
      id: variant?.id || product.id,
      name: product.name,
      image: variant?.image || product.image,
      price: product.price,
      seller: product.seller || 'Unknown Seller',
      variant: variant?.name || null,
      quantity: quantity
    };
  }
  