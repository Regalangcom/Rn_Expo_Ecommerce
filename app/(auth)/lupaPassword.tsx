import React, { useState } from "react";
import { VStack } from "@/components/ui/vstack";
import { Input, InputField } from "@/components/ui/input";
import { FormControl } from "@/components/ui/form-control";
import { Text } from "@/components/ui/text";
import { InputSlot } from "@/components/ui/input";
import { InputIcon } from "@/components/ui/input";
import { Heading } from "@/components/ui/heading";
import { Button, ButtonText } from "@/components/ui/button";

// icons

import { EyeIcon, EyeOffIcon } from "lucide-react-native";
import { Pressable } from "react-native";
import { Link } from "expo-router";

export default function ForgetPasswordScreen() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  // const [showModal , setShowModal] = useState<boolean>(true)

  // const showModal = () => {
  //   return !showModal
  // }

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <FormControl className="p-6 border rounded-lg border-outline-300">
      <VStack space="xl" className="mt-10">
        <VStack space="xs">
          <Text className="text-typography-500">Email</Text>
          <Input className="text-center">
            <InputField type={showPassword ? "text" : "password"} />
            <InputSlot className="pr-3" onPress={handleShowPassword}>
              <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
            </InputSlot>
          </Input>
        </VStack>
        <VStack className="flex flex-row relative justify-end mt-10 ">
          {/* using pressable */}
          <Pressable
            className="mr-4 bg-black px-4 py-2 rounded-lg active:bg-gray-800"
            onPress={() => {
              console.log("Button Pressed!");
            }}
          >
            <Text className="text-blue-100 text-base font-bold">Send</Text>
          </Pressable>
        </VStack>
        <Link href={"/"}>
          <Text className="text-blue-700 font-bold">Back?</Text>
        </Link>
      </VStack>
    </FormControl>
  );
}
