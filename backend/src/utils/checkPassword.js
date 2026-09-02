import bcrypt from "bcryptjs"

const CheckPassword = async (password,hashedPassword)=>{

    try{
        const res = await bcrypt.compare(password,hashedPassword);
        return res;

    }catch(err){
      console.log('Error in check password util func :',err);
      throw err;
    }

}

export default CheckPassword;