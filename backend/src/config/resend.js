import { Resend } from "resend";
import dotenv from "dotenv"

dotenv.config();

const resendKey = process.env.RESEND_API_KEY;

const resend = new Resend(resendKey);

export default resend;