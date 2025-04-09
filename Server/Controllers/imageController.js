import userModel from "../models/userModel.js";
import FormData from 'form-data'
import axios from 'axios'

export const generateImage = async (req,res)=>{
    try {
        
        const {userId, prompt} = req.body
        
        const user = await userModel.findById(userId)

        if(!user || !prompt){
            return res.json({sucess:false,message:"Missing Details"})
        }

        if(user.creditBalance === 0 || userModel.creditBalance < 0){
            return res.json({sucess:false,message:"No Credit Balanace", creditBalance: user.creditBalance})
        }

        const formData = new FormData
        formData.append('prompt' ,prompt)

        const {data} = await axios.post('https://clipdrop-api.co/text-to-image/v1',formData,{headers: {
            'x-api-key': 'bf15d188beb2dabb4d083b92efbc84c4316b789c2b12ddcf3bd2b34ba1fe524642ac4e94eebde21a297bedfc9c637c8e',
          },
          responseType:"arraybuffer"
        })

        const base64Image = Buffer.from(data,'binary').toString('base64')

        const resultImage = `data:image/png;base64,${base64Image}`

        await userModel.findByIdAndUpdate(user._id,{creditBalance:user.creditBalance-1})

        res.json({sucess:true,message:"Image Generated" , creditBalance:user.creditBalance-1 , resultImage})
    } catch (error) {
        console.log(error);
        res.json({sucess:false,message:error.message})
    }
}