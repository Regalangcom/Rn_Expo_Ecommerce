import { Stack, useLocalSearchParams } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import products from "@/assets/product.json";

import { Card } from "@/components/ui/card";
import { Image } from "@/components/ui/image";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";
import { VStack } from "@/components/ui/vstack";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { getProductDataById } from "@/api/api";
import { useCart } from "@/store/store.zus";
// import { Link } from "expo-router";
// import { Pressable } from "react-native";
export default function DetailProductScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const {
    data: product,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products", id],
    queryFn: () => getProductDataById(Number(id)),
  });

  const addProductCart = useCart((state) => state.addProducts);
  // const logDataCart = useCart((state) => state.items);

  const addProductToCart = () => {
    addProductCart(product);
  };

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (isError) {
    return <Text>Error fetching data</Text>;
  }

  console.log("re render data product");

  return (
    <Box className=" bg-slate-500 flex-1 items-center p-3">
      <View className="items-center  ">
        <Stack.Screen options={{ title: product.name }} />
      </View>
      <Card className="p-5 rounded-lg max-w-[560px]  flex-1">
        <Image
          source={{
            uri: product.image,
          }}
          className="mb-6 h-[240px] w-full rounded-md aspect-[4/3] mt-5"
          alt="image"
          resizeMode="contain"
        />
        <Text className="text-sm font-normal mb-2 text-typography-700">
          {product.name}
        </Text>
        <VStack className="mb-6">
          <Heading size="md" className="mb-4">
            ${product.price}
          </Heading>
          <Text size="sm">{product.description}</Text>
        </VStack>
        <Box className="flex-col sm:flex-row">
          <Button
            onPress={addProductToCart}
            className="px-4 py-2 mr-0 mb-3 sm:mr-3 sm:mb-0 sm:flex-1"
          >
            <ButtonText size="sm">Add to cart</ButtonText>
          </Button>
          <Button
            variant="outline"
            className="px-4 py-2 border-outline-300 sm:flex-1"
          >
            <ButtonText size="sm" className="text-typography-600">
              Wishlist
            </ButtonText>
          </Button>
        </Box>
      </Card>
    </Box>
  );
}
