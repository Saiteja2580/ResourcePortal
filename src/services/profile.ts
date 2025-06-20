import { getUser } from "./auth";
import { createClient } from "../../utils/supabase/client";

export const getProfile = async () => {
  const responseUser = await getUser();

  const supabase = createClient();

  if (!responseUser.success || !responseUser.user) {
    return {
      success: false,
      message: responseUser.message || "Failed to get user",
      profile: null,
    };
  }

  const email = responseUser.user.email;

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("email", email)
    .single(); // Use `.single()` since email is unique

  if (error) {
    return {
      success: false,
      message: `Failed to fetch profile: ${error.message}`,
      profile: null,
    };
  }

  return {
    success: true,
    message: "Profile fetched successfully.",
    profile: data,
  };
};
