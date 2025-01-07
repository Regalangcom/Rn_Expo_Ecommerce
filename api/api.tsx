const API_URL = process.env.EXPO_PUBLIC_API_URL_DEV;

export async function getAllDataProduct() {
  const getAllDataProducts = await fetch(`${API_URL}/products`);
  const data = await getAllDataProducts.json();
  if (!getAllDataProducts.ok) {
    throw new Error("error");
  }
  console.log("data products", data);
  return data;
}

export async function getProductDataById(id: number) {
  const productId = await fetch(`${API_URL}/products/${id}`);
  const data = await productId.json();
  if (!productId.ok) {
    throw new Error("error");
  }
  return data;
}
