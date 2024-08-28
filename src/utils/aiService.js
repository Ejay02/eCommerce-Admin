import axios from "axios";
import { useNotifications } from "@/composable/globalAlert.js";

const { notify } = useNotifications();

const API_TOKEN = import.meta.env.VITE_HUGGING_FACE_TOKEN;
const API_URL = import.meta.env.VITE_HUGGING_FACE_API_URL;

export default {
  async generateContent(prompt) {
    try {
      const response = await axios.post(
        API_URL,
        { inputs: prompt },
        {
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );

      return response.data[0].generated_text;
    } catch (error) {
      console.log("error ai:", error);
      notify("Hmm, all our bots are currently busy.. ⚙️", "error");
    }
  },
};
