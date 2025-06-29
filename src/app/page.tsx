"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const Home = () => {
  const router = useRouter();

  const handleSubmit = (route: string) => {
    console.log(route);

    router.push(`/${route}`);
  };

  return (
    <div
      style={styles.image}
      className="flex flex-col items-center justify-center min-h-screen bg-gray-100"
    >
      <div className="flex flex-col gap-5  bg-white p-10 w-full max-w-md text-center space-y-4 rounded-2xl">
        <h1 style={styles.header} className="text-3xl font-semibold">
          Choose Your Role
        </h1>
        <Button
          className="font-medium text-xl py-5"
          style={styles.button}
          onClick={() => handleSubmit("loginadmin")}
        >
          Admin
        </Button>
        <Button
          className="font-medium text-xl py-5"
          style={styles.button}
          onClick={() => handleSubmit("loginfaculty")}
        >
          Faculty
        </Button>
      </div>
    </div>
  );
};

export default Home;

const styles = {
  image: {
    background: 'url("/college.jpeg")',
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  },

  header: {
    fontFamily: "var(--font-heading)",
    color: "var(--text-primary)",
  },
  button: {
    background:
      "linear-gradient(to right, var(--color-gradient-start), var(--color-gradient-end))",
    boxShadow: "var(--shadow-button)",
    borderRadius: "var(--radius-md)",
    fontFamily: "var(--font-heading)",
    transition: "var(--transition-smooth)",
  },
};
