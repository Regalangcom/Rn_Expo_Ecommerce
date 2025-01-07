import React, { useState } from "react";
import { VStack } from "@/components/ui/vstack";
import { Input, InputField } from "@/components/ui/input";
import { FormControl } from "@/components/ui/form-control";
import { Text } from "@/components/ui/text";
import { InputSlot } from "@/components/ui/input";
import { InputIcon } from "@/components/ui/input";
import { HStack } from "@/components/ui/hstack";
// icons
import { EyeIcon, EyeOffIcon } from "lucide-react-native";
import { Pressable } from "react-native";
import { Link, Redirect } from "expo-router";
import { useMutation } from "@tanstack/react-query";
import { loginAuth } from "@/api/auth";
import { useAuth } from "@/store/authStore";
import { Button } from "@/components/ui/button";

export default function loginScreen() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showErrorAuth, setshowErrorAuth] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  // zustand
  const setUser = useAuth((user) => user.setUser);
  const setToken = useAuth((token) => token.setToken);

  const isLoggedIn = useAuth((s) => !!s.token);

  console.log("tokem", setToken);

  const loginData = useMutation({
    mutationFn: () => loginAuth(email, password),
    onSuccess: (data) => {
      console.log("success", data);
      if (data.data.user && data.data.token) {
        setUser(data.data.user);
        setToken(data.data.token);
      }
      setPassword("");
      setEmail("");
    },
    onError: (error) => {
      console.log("error", error);
      setErrorMessage(error.message);
      setshowErrorAuth(true);
    },
  });
  // sementara
  const removeToken = () => {
    const token = useAuth.getState().logout;
    token();
    console.log("Removed", token);
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  if (isLoggedIn) {
    return <Redirect href={"/cart"} />;
  }
  return (
    <FormControl
      isInvalid={!!errorMessage || !!loginData.error}
      className="border max-w-[500px] p-4 rounded-lg border-outline-300 m-2"
    >
      <VStack space="xl" className="mt-10">
        <VStack space="xs">
          <Text className="text-typography-500">Email</Text>
          <Input className="min-w-[250px]" size="xl">
            <InputField type="text" value={email} onChangeText={setEmail} />
          </Input>
        </VStack>
        <VStack space="xs">
          <Text className="text-typography-500">Password</Text>
          <Input className="min-w-[250px]" size="xl">
            <InputField
              type={showPassword ? "text" : "password"}
              value={password}
              onChangeText={setPassword}
            />
            <InputSlot className="pr-3" onPress={handleShowPassword}>
              <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
            </InputSlot>
          </Input>
        </VStack>
        {showErrorAuth && <Text className="text-red-600">{errorMessage}</Text>}
        <HStack space="sm">
          {/* Using Pressable */}
          <Pressable
            className=" px-4 py-2 rounded-lg border flex-1  items-center justify-center"
            onPress={() => {
              loginData.mutate();
            }}
          >
            <Text className="text-black text-base font-bold">Sign in</Text>
          </Pressable>
          <Pressable
            className="bg-black px-4 py-2 rounded-lg flex-1 active:bg-gray-700 items-center justify-center"
            onPress={() => {
              console.log("Button Pressed!");
            }}
          >
            <Link href={"/register"}>
              <Text className="text-blue-100 text-base font-bold">Sign up</Text>
            </Link>
          </Pressable>
        </HStack>

        <Link href={"/lupaPassword"}>
          <Text className="text-blue-700 font-bold">forget password?</Text>
        </Link>
      </VStack>
      <Button
        className=" mt-4 bg-white px-6 py-5 rounded-lg flex-1 items-center justify-center"
        onPress={() => {
          removeToken();
        }}
      >
        <Text className="text-black font-bold  ">Hapus Token</Text>
      </Button>
    </FormControl>
  );
}
