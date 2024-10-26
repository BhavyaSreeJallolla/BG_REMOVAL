import { Webhook } from "svix"
import userModel from "../Models/userModel.js"

//ApI Controller function to manage clerk user with database
//http://localhost:4000/api/user/webhooks
const clerkWebhooks = async (req, res) => {

    try {

        //Create a Svix instance with clerk secret.
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)

        await whook.verify(JSON.stringify(req.body), {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"]
        })
        const { data, type } = req.body
        switch (type) {

            case "user.created": {
                const userData = {
                    ClerkId: data.id,
                    email: data.email_addresses[0].email_address,
                    firstName: data.first_name,
                    lastName: data.last_name,
                    photo: data.image_url
                }

                await userModel.create(userData)
                res.json({})
                break;
            }
            case "user.updated": {
                const userData = {
                    email: data.email_addresses[0].email_address,
                    firstName: data.first_name,
                    lastName: data.last_name,
                    photo: data.image_url
                }
                await userModel.findOneAndUpdate({ClerkId: data.id},userData)
                res.json({})

                break;
            }
            case "user.deleted": {

                await userModel.findByIdAndDelete({ ClerkId:data.id })
                res.json({})
                break;
            }

            default:
                break;

        }

    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })

    }


}
export { clerkWebhooks }