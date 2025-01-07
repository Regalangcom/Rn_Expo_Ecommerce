import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from "react-native";
// import products from "../assets/product.json";
import ProductListItem from "@/components/ui/ProductListItem";
import { useBreakpointValue } from "@/components/ui/utils/use-break-point-value";
import { getAllDataProduct } from "@/api/api";
import { useQuery } from "@tanstack/react-query";

export default function HomeScreen() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: getAllDataProduct,
  });

  const numberCol = useBreakpointValue({
    default: 2,
    sm: 3,
    xl: 4,
  });

  // indicator
  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (isError) {
    return <Text>Error fetching data</Text>;
  }

  // mengatur dimensi layar

  return (
    <View>
      <FlatList
        key={numberCol}
        data={data}
        // create count coloums
        numColumns={numberCol}
        contentContainerClassName="gap-2 bg-slate-500 max-w-[960] mx-auto w-full "
        columnWrapperClassName="gap-2"
        renderItem={({ item }) => <ProductListItem products={item} />}
      />
    </View>
  );
}
