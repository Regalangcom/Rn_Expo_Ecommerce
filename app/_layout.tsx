import { Stack } from "expo-router";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import { ShoppingCart, User } from "lucide-react-native";
import { Icon } from "@/components/ui/icon";
import "@/global.css";

import { Link } from "expo-router";
import { Pressable } from "react-native";
import { useCart } from "@/store/store.zus";
import { Text } from "@/components/ui/text";
import { useAuth } from "@/store/authStore";

const queryClient = new QueryClient();

export default function RootLayout() {
  // Mengambil panjang data item dari state global
  const lengthDataItems = useCart((state: any) => state.items.length);

  const token = useAuth.getState().token;

  const isLoggedIn = useAuth((s) => !!s.token);

  console.log("datas", token);

  console.log("length", lengthDataItems);

  return (
    <QueryClientProvider client={queryClient}>
      <GluestackUIProvider>
        <Stack
          screenOptions={{
            headerTitleAlign: "center",
            // Header dengan badge untuk menampilkan jumlah item di keranjang
            headerRight: () =>
              lengthDataItems > 0 && (
                <Link href="/cart" asChild>
                  <Pressable className="flex-row gap-2">
                    <Icon as={ShoppingCart} />
                    <Text>{lengthDataItems}</Text>
                  </Pressable>
                </Link>
              ),
          }}
        >
          {/* Daftar Screen */}
          <Stack.Screen
            name="index"
            options={{
              title: "Shop",
              headerLeft: () => (
                <Link href={"/login"} asChild>
                  <Pressable className="flex-row gap-2">
                    <Icon as={User} />
                  </Pressable>
                </Link>
              ),
            }}
          />
          <Stack.Screen
            name="(auth)/register"
            options={{
              title: "Register",
              headerTitleAlign: "center",
            }}
          />
          <Stack.Screen
            name="(auth)/login"
            options={{
              title: "login",
              headerTitleAlign: "center",
            }}
          />
          <Stack.Screen
            name="(auth)/lupaPassword"
            options={{
              title: "lupaPassword",
              headerTitleAlign: "center",
            }}
          />
          <Stack.Screen
            name="product/[id]"
            options={{ title: "Product Details", headerTitleAlign: "center" }}
          />
        </Stack>
      </GluestackUIProvider>
    </QueryClientProvider>
  );
}
