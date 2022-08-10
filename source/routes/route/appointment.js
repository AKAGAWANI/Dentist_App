const express = require('express');
const router = express.Router();
const ServiceManager = require('../../service/ServiceManager');

router.use(express.json());

router.post('/bookAppointment', ServiceManager.appointment.bookAppointment);

router.get('/listAppointments', ServiceManager.appointment.listAppointments);

//get appointmnet Id using userId
router.get('/list', ServiceManager.appointment.getAppointmentDeatils);

<<<<<<< HEAD
router.get("/getPatient/:doctorId", ServiceManager.appointment.getPatients);
=======
//cancel appointmnet using appointmentId
router.patch('/cancel', ServiceManager.appointment.cancelAppointment);

//reschedule appointmnet using appointmentId
router.patch('/reschedule', ServiceManager.appointment.rescheduleAppointment);
>>>>>>> 061e1b2271de153f0d1a9a1412cc04a7e9cd9266

module.exports = router;
