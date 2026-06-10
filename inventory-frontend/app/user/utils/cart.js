"use client";

const CART_KEY = "ims_cart";

export function getCartItems() {
  if (typeof window === "undefined") return [];

  try {
    return JSON.parse(localStorage.getItem(CART_KEY) || "[]");
  } catch {
    return [];
  }
}

export function saveCartItems(items) {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event("ims-cart-updated"));
}

export function addCartItem(product, quantity = 1) {
  const items = getCartItems();
  const existing = items.find((item) => item.id === product.id);
  const nextQuantity = Math.min(
    Number(product.stock || 0),
    Number(quantity) + Number(existing?.quantity || 0)
  );

  const nextItem = {
    id: product.id,
    product_name: product.product_name,
    category_name: product.category_name,
    description: product.description,
    price: product.price,
    stock: product.stock,
    image_url: product.image_url,
    quantity: nextQuantity,
  };

  const nextItems = existing
    ? items.map((item) => (item.id === product.id ? nextItem : item))
    : [...items, nextItem];

  saveCartItems(nextItems);
  return nextItems;
}

export function clearCart() {
  saveCartItems([]);
}

export function getCartTotal(items) {
  return items.reduce(
    (total, item) => total + Number(item.price || 0) * Number(item.quantity || 0),
    0
  );
}
