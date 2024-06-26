import { supabase } from "../../libs/supabase";

const getMarkers = async (): Promise<RecordType[]> => {
  const { data } = await supabase.from("record").select("*");
  if (!data) return [];
  return data;
};

export default getMarkers;
