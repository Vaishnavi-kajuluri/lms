import { Webhook } from "svix";
import User from "../models/User.js";

//api controller function to manage clerk user with database

export const clerkwebhooks =async(req,res) =>{
    try{
      const whook=new Webhook(process.env.CLERK_WEBHOOK_SECRET)
      await whook.verify(JSON.stringify(req.body),{
        "svix-id":req.headers['svix-id'],
        "svix-timestamp":req.headers["svix-timestamp"],
        "svix-signature":req.headers["svix-signature"]
      })
      const{data,type}=req.body
      switch (type){
        case 'user.created':{
            const userData={
                _id:data.id,
                email:data.email_address[0].email_address,
                name:data.first_name + " " +data.last_name,
                imageUrl:data.image_url,
            }
            await user.create(userData)
            res.json({})
            break;
        }
        case 'user.updated':{
          const userData={
            email:data.email_adress[0].email_adress,
            name:data.first_name + " " +data.last+name,
    
            imageUrl:data.image_url,
          }
          await user.findByIdAndUpdate(data.id,userData)
          res.json({})
          break;
        }
        default:
          break;
      }
    }
    catch(error){
       res.json({success:false,message:error.message})
    }
}