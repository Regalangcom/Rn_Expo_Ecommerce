import { VStack } from "@/components/ui/vstack";
import { Input, InputField } from "@/components/ui/input";
import { FormControl } from "@/components/ui/form-control";
import { Text } from "@/components/ui/text";
import { InputSlot } from "@/components/ui/input";
import { InputIcon } from "@/components/ui/input";
import { Link, useRouter } from "expo-router";
import { HStack } from "@/components/ui/hstack";
import {
  FormControlHelper,
  FormControlHelperText,
} from "@/components/ui/form-control";
// icons
import { EyeIcon, EyeOffIcon } from "lucide-react-native";
// hooks
import { useState } from "react";
import { Pressable } from "react-native";
import { useMutation } from "@tanstack/react-query";
import { registerAuth } from "@/api/auth";

export default function registerScreen() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [formError, setFormError] = useState<string>("");

  const router = useRouter();

  const registerData = useMutation({
    mutationFn: () => registerAuth({ email, password, role }),
    onSuccess: (data) => {
      console.log("success", data);
    },
    onError: (error) => {
      console.log("error", error);
      setFormError("Failed to register. Please try again.");
    },
  });

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleRegister = () => {
    // Validasi form
    if (!email || !role || !password || !confirmPassword) {
      setFormError("All fields are required.");
      return;
    }
    if (password !== confirmPassword) {
      setFormError("Passwords do not match.");
      return;
    }

    // Reset error jika validasi berhasil
    setFormError("");
    registerData.mutate();
    router.push("/login");
  };

  return (
    <FormControl
      isInvalid={!!formError || !!registerData.error}
      className="p-4 border max-w-[500px] m-2 rounded-lg border-outline-300"
    >
      <VStack space="xl">
        {formError && <Text className="text-red-600">{formError}</Text>}

        <VStack space="xs">
          <Text className="text-typography-500">Role</Text>
          <Input className="min-w-[250px]" size="xl">
            <InputField type="text" value={role} onChangeText={setRole} />
          </Input>
        </VStack>

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
              type="text"
              value={password}
              onChangeText={setPassword}
            />
          </Input>
          <FormControlHelper>
            <FormControlHelperText>
              Must be at least 8 characters.
            </FormControlHelperText>
          </FormControlHelper>
        </VStack>

        <VStack space="xs">
          <Text className="text-typography-500">Confirm Password</Text>
          <Input className="text-center" size="xl">
            <InputField
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <InputSlot className="pr-3" onPress={handleShowPassword}>
              <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
            </InputSlot>
          </Input>
          {confirmPassword && confirmPassword !== password && (
            <Text className="text-red-600">Passwords do not match.</Text>
          )}
        </VStack>

        <HStack space="sm">
          <Pressable
            className="bg-black px-4 py-2 rounded-lg flex-1 active:bg-gray-800 items-center justify-center"
            onPress={handleRegister}
          >
            <Text className="text-blue-100 text-base font-bold">Sign up</Text>
          </Pressable>
          <Pressable className="px-4 py-2 rounded-lg border flex-1 active:bg-gray-700 items-center justify-center">
            <Link href={"/login"}>
              <Text className="text-black text-base font-bold">Sign in</Text>
            </Link>
          </Pressable>
        </HStack>
      </VStack>
    </FormControl>
  );
}
