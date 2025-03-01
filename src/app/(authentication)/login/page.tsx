import LoginForm from "@/features/authentication/components/LoginForm";

export default function LoginPage() {
  return (
    <>
      <LoginForm
        defaultValues={{ username: "fake-user", password: "12345678" }}
      />
    </>
  );
}
