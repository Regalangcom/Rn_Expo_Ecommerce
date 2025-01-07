import { useAuth } from "@/store/authStore";

const API_URL_DEV = process.env.EXPO_PUBLIC_API_URL_DEV;

export async function createOrders(items: any[]) {
  const token = useAuth.getState().token;

  console.log("token_order", token);

  if (!token) {
    throw new Error("Missing authentication token");
  }

  if (!items || items.length === 0) {
    throw new Error("Items cannot be empty");
  }

  try {
    const response = await fetch(`${API_URL_DEV}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ order: {}, items }),
    });

    const data = await response.json();

    if (!response.ok) {
      const errorMessage = data?.message || "Unknown error occurred";
      console.error(`Error creating order: ${errorMessage}`);
      throw new Error(errorMessage);
    }

    return data;
  } catch (error) {
    console.error("Network error:", error);
  }
}
