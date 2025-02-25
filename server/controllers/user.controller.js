import User from "../models/user.model.js"


export const getCurrentUser = async (req,res) => {
    try {
        const userId = req.userId
        const user = await User.findById(userId)
        if(!user) {
