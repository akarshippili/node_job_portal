const { Router } = require('express');
const createController = require('../controllers/createControllers');
const { reqAuth, curUser } = require('../middleware/authMiddleware');

const router = Router();

router.get('/create',reqAuth,createController.create_get);
router.post('/create',createController.create_post);
router.get('/created',createController.created_get);


router.get('/apply',reqAuth,createController.apply_get);
router.get('/apply/:id',createController.apply_details_get);
router.get('/details',createController.details_get);
router.post('/details',createController.details_post);

router.get('/sucessfully_applied',createController.sucessfully_applied_get);
router.get('/applied',createController.applied_get);

router.post('/apply/:id',createController.apply_post);

//router.post('/create',createController.create_post);
router.get('/response/:id',createController.response_get);


module.exports = router;