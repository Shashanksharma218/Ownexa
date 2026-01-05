import supabase from "../SupabaseClient.js";

const FindUser = async (userId) => {
  const { data, error } = await supabase
    .from("users")
    .select(" email, username , created_at ")
    .eq("id", userId)
    .single();

  if (error) throw error;

  return data;
};

export default FindUser;