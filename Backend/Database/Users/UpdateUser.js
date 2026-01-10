import supabase from "../SupabaseClient.js";

const UpdateUser = async (email, Role) => {
    const { data, error } = await supabase
        .from("users")
        .update({ role: Role })
        .eq("email", email)
        .select()
        .single();

    if (error) throw error;

    return data;
};



export default UpdateUser;