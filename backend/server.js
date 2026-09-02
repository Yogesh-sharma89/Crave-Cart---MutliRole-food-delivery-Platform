import dotenv from "dotenv";
import ConnectToDb from "./src/config/db.js";
import app from "./app.js";

dotenv.config();

const port = process.env.PORT || 5000;


const IntializeConnetion = async () => {
  try {
    await ConnectToDb();

    app.listen(port, () => {
      console.log(`Server is listening at port ${port}`);
    });

  } catch (err) {
    console.log("Error in intialize connection ", err.message)
    process.exit(1);
  }
};

IntializeConnetion();


