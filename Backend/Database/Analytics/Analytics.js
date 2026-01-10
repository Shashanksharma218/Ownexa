import supabase from "../SupabaseClient.js";

const Analytics = async () => {
  const { data, error } = await supabase
    .from("platform_stats")
    .select("*")
    .single(); 

  if (error) throw error;

  return data; 
};

export default Analytics;