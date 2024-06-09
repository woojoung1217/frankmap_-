import { supabase } from "../../../../lib/supabase/supabaseClient";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { email, password } = req.body;

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        return res.status(400).json({ error: error.message });
      }
      res.status(200).json({ message: "성공" });
    } catch (error) {
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${req.method} Not Allow`);
    }
  }
};
