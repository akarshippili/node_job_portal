const { Router } = require('express');
const authController = require('../controllers/authControllers');

const router = Router();

//done
router.get('/com/signin',authController.company_signin_get);
//doing
router.post('/com/signin',authController.company_signin_post);
//done
router.get('/com/login',authController.company_login_get);
//doing
router.post('/com/login',authController.company_login_post);


//done
router.get('/student/signin',authController.student_signin_get);
//done
router.post('/student/signin',authController.student_signin_post);
//done
router.get('/student/login',authController.student_login_get);
//done
router.post('/student/login',authController.student_login_post);
router.get('/logout',authController.logout_get);



module.exports = router;