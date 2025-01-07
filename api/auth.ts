const API_URL_DEV = process.env.EXPO_PUBLIC_API_URL_DEV;

interface registerType {
  email: string;
  password: string;
  role: string;
}

interface usedTypeRegister {
  Data: registerType;
}

export async function loginAuth(email: string, password: string) {
  const fetchData = await fetch(`${API_URL_DEV}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!fetchData.ok) {
    const errorData = await fetchData.json();
    throw new Error(errorData.message || "Authentication failed");
  }

  const data = await fetchData.json();

  alert("login successful");

  return { data };
}

export async function registerAuth(
  data: registerType
): Promise<usedTypeRegister> {
  const fetchData = await fetch(`${API_URL_DEV}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!fetchData.ok) {
    const errorData = await fetchData.json();
    console.error("Error response:", errorData);
    throw new Error(errorData.message || "Registration failed");
  }

  const responseData = await fetchData.json();
  console.log("message", responseData);

  alert("Registration successful");

  return {
    Data: responseData as registerType,
  };
}
