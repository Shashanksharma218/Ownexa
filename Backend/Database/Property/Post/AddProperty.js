import supabase from "../../SupabaseClient.js";

const CreateProperty = async ({
  ownerId,
  ownerEmail,
  ownerName,

  title,
  bhk,
  propertyType,
  builtUpAreaSqFt,

  addressLine,
  city,
  state,
  pincode,
  country = "India",

  registryName,
  registryNumber,
  registrationDate,

  expectedPriceINR,
  tokenName,

  propertyImages = [],
  legalDocuments = []
}) => {

  const { data, error } = await supabase
    .from("properties")
    .insert({
      owner_id: ownerId,
      owner_email: ownerEmail,
      owner_name: ownerName,

      title,
      bhk,
      property_type: propertyType,
      built_up_area_sqft: builtUpAreaSqFt,

      address_line: addressLine,
      city,
      state,
      pincode,
      country,

      registry_name: registryName,
      registry_number: registryNumber,
      registration_date: registrationDate,

      expected_price_inr: expectedPriceINR,
      token_name: tokenName,

      property_images: propertyImages,
      legal_documents: legalDocuments,

      status: "pending"
    })
    .select()
    .single();

  if (error) throw error;

  return data;
};

export default CreateProperty;