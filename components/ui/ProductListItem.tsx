import React from "react";
import { Card } from "@/components/ui/card";
import { Image } from "@/components/ui/image";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";
import { VStack } from "@/components/ui/vstack";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Link } from "expo-router";
import { Pressable } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { getProductDataById } from "@/api/api";

interface data {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
}

interface productData {
  products: data;
}

export default function ProductListItem({ products }: productData) {
  // console.log("re-render product ...");
  return (
    // asChild di gunakan untuk mengambil seluruh is  element
    <Link href={`product/${products.id}`} asChild>
      <Pressable className="flex-1">
        <Card className="p-5 rounded-lg  flex-1">
          <Image
            source={{
              uri: products.image,
            }}
            className="mb-6 h-[240px] w-full rounded-md aspect-[4/3]"
            alt="image"
            resizeMode="contain"
          />
          <Text className="text-sm font-normal mb-2 text-typography-700">
            {products.name}
          </Text>
          <Heading size="md" className="mb-4">
            ${products.price}
          </Heading>
        </Card>
      </Pressable>
    </Link>
  );
}
