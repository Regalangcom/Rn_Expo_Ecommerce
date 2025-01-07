import { useCart } from "@/store/store.zus";
import { Text, FlatList, Pressable, Alert } from "react-native";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { Image } from "@/components/ui/image";
import { Button, ButtonText } from "@/components/ui/button";
import { Redirect } from "expo-router";
import { useMutation } from "@tanstack/react-query";
import { createOrders } from "@/api/orders";
import { useAuth } from "@/store/authStore";
import { Icon } from "@/components/ui/icon";
import { Trash2Icon } from "lucide-react-native";
export default function CartScreen() {
  const items = useCart((state) => state.items);
  const DataCartDelete = useCart((state) => state.resetItems);
  const removeCart = useCart((state) => state.removeCart);
  const isLoggedIn = useAuth((s) => !!s.token);
  const token = useAuth.getState().logout;

  const createOrdersMutation = useMutation({
    mutationFn: () =>
      createOrders(
        items.map((item) => ({
          productId: item.product.id,
          quantity: item.quantity,
          price: item.product.price,
        }))
      ),
    onSuccess: (data) => {
      console.log("successfully created", data);
      DataCartDelete();
    },
    onError: (error) => {
      console.log("Failed to create", error);
    },
  });

  const handleCheckout = async () => {
    createOrdersMutation.mutate();
  };

  const handleRemoveCart = (id: number) => {
    removeCart(id);
    console.log(`item id ${id} removed`);
  };

  const handleRemove = () => {
    token();
  };

  if (items.length === 0) {
    return <Redirect href={"/"} />;
  }

  if (!isLoggedIn) {
    Alert.alert("please login first");
    return <Redirect href={"/login"} />;
  }

  return (
    <FlatList
      contentContainerClassName="pb-24 gap-3 max-w-[980px] mt-3 w-full mx-auto"
      data={items}
      keyExtractor={(item, index) => `${item.product.id}-${index}`}
      renderItem={({ item }) => (
        <HStack className="bg-white p-3 rounded-lg flex-row justify-between items-center">
          {/* Gambar dan Detail Produk */}
          <HStack className="flex-row items-center flex-1">
            <Image
              source={{ uri: item.product.image }}
              resizeMode="contain"
              className="w-20 h-20 rounded-md mr-4"
            />
            <VStack className="space-y-1">
              <Text className="font-bold">{item.product.name}</Text>
              <Text>${item.product.price}</Text>
              <Text>Qty: {item.quantity}</Text>
            </VStack>
          </HStack>

          {/* Ikon Sampah */}
          <Pressable
            className="flex justify-center items-center"
            onPress={() => handleRemoveCart(item.id)}
          >
            <Icon as={Trash2Icon} className="w-5 h-6 text-red-500" />
          </Pressable>
        </HStack>
      )}
      ListFooterComponent={() => (
        <Button
          onPress={handleCheckout}
          className="mt-5 px-4 py-2 rounded border w-full max-w-[300px] mx-auto flex items-center justify-center"
        >
          <ButtonText>Checkout</ButtonText>
        </Button>
      )}
    />
  );
}
