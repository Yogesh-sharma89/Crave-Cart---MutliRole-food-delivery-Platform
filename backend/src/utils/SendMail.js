import resend from "../config/resend.js";

const SendMail = async({subject,html,email})=>{
    try{

        const {data,error} = await resend.emails.send({
            from:"Acme <onboarding@resend.dev>",
            to:email,
            subject,
            html
        })

        if(error){
            throw(error);
        }

        console.log("Mail send to : ",data.id)

    }catch(err){
     console.log("error in sendmail function ",err)
    }
}

export default SendMail;