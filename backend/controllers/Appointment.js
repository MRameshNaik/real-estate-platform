const express = require("express");
const router = express.Router();

const Appointments = require("../models/Appointment");

router.post("/appointments", async(req,res) => {

    try{
        const {firstName, lastName, email, phone} = req.body;

        const appointment = new Appointments({
            firstName,
            lastName,
            email,
            PhoneNumber: phone
        });

        await appointment.save();

        return res.status(200).json({success: true, message: "Booked Successfully"});
    }
    catch(error){
        console.log("Failed here while booking appointments")
        return res.status(500).json({ success: false, message: "Internal Server Error" , error: error});
    }
});

router.get("/appointments", async(req,res) => {
    try{
        const appointments = await Appointments.find();
        return res.status(200).json({success: true, appointments: appointments});
    }
    catch(error){
        console.log("Failed here while Fetching Booked appointments")
        return res.status(500).json({ success: false, message: "Internal Server Error" , error: error});
    }
});

module.exports = router;