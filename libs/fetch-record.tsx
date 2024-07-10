import { supabase } from "@/libs/supabase";
import { RecordType } from "@/types/types";

const fetchData = async (userId: string): Promise<RecordType[]> => {
  try {
    const { data, error } = await supabase.from("record").select("*").eq("user_id", userId);

    if (error) {
      throw error;
    }
    return data;
  } catch (error: any) {
    console.error("Error fetching data:", error.message);
    return [];
  }
};

export default fetchData;
