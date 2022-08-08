const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');




router.get('/', indexController.homepage);

router.get('/admin', indexController.login);
router.post('/admin', indexController.loginpost);

router.get('/hero-data', indexController.parallax);
router.post('/hero-data', indexController.parallaxpost);

router.get('/keyinitiative-data', indexController.keyinitiatives);
router.post('/keyinitiative-data', indexController.keyinitiativespost);

router.get('/superhero-data', indexController.superheros);
router.post('/superhero-data', indexController.superherospost);

router.get('/project-data', indexController.project);
router.post('/project-data', indexController.projectpost);

router.get('/text-data', indexController.textdata);
router.post('/text-data', indexController.textdatapost);

router.get('/journeysofar-data', indexController.journeySoFar);
router.post('/journeysofar-data', indexController.journeySoFarpost);


module.exports = router;