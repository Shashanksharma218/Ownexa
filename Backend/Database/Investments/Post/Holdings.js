import supabase from "../../SupabaseClient.js";

const Holdings = async (data, user) => {
  if (!user?.id) {
    throw new Error("Unauthorized: User not found");
  }
  const {
    propertyId,
    tokenQuantity,
    pricePerTokenInr,
    accountaddress
  } = data;

  const wallet = accountaddress.toLowerCase();
  const qty = Number(tokenQuantity);
  const price = Number(pricePerTokenInr); 
    
  const { data: existingHolding, error: fetchError } = await supabase
    .from("holdings")
    .select("id, token_quantity, avg_price_inr")
    .eq("wallet_address", wallet)
    .eq("property_id", propertyId)
    .eq("user_id" , user.id)
    .single();

  if (fetchError && fetchError.code !== "PGRST116") {
    throw fetchError;
  }
    
  if (existingHolding) {
    const oldQty = existingHolding.token_quantity;
    const oldAvg = existingHolding.avg_price_inr || 0;

    const newQty = oldQty + qty;
    const newAvg =
      (oldQty * oldAvg + qty * price) / newQty;

    const { error: updateError } = await supabase
      .from("holdings")
      .update({
        token_quantity: newQty,
        avg_price_inr: newAvg,
        updated_at: new Date().toISOString()
      })
      .eq("id", existingHolding.id);

    if (updateError) throw updateError;

    return { type: "UPDATED", newQty, newAvg };
  }

  const { error: insertError } = await supabase
    .from("holdings")
    .insert({
      user_id: user.id,
      wallet_address: wallet,
      property_id: propertyId,
      token_quantity: qty,
      avg_price_inr: price, 
      holding_status : true 
    });

  if (insertError) throw insertError;

  return { type: "CREATED", qty, avg_price_inr: price };
};

export default Holdings;