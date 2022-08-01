const express = require("express");
const router = express.Router();
const ServiceManager = require("../../service/ServiceManager");

router.use(express.json());


router.post("/bookAppointment", ServiceManager.appointment.bookAppointment);

router.get("listAppointments",ServiceManager.appointment.listAppointments)


module.exports = router;
