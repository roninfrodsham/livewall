const express = require('express');
const router = express.Router();

const newsController = require('./../controllers/newsController');
const dowController = require('./../controllers/dowController');
const flightController = require('./../controllers/flightController');
const weatherController = require('./../controllers/weatherController');
const clocksController = require('./../controllers/clocksController');
const twitterController = require('./../controllers/twitterController');
const instagramController = require('./../controllers/instagramController');
const facebookController = require('./../controllers/facebookController');
const trendsController = require('./../controllers/trendsController');
const stocksController = require('./../controllers/stocksController');
const templateController = require('./../controllers/templateController');
const heritageController = require('./../controllers/heritageController');
const vipController = require('./../controllers/vipController');
const storyController = require('./../controllers/storyController');
const userController = require('./../controllers/userController');
const globalsController = require('./../controllers/globalsController');
const holidaysController = require('./../controllers/holidaysController');
const historyController = require('./../controllers/historyController');
const imagesController = require('./../controllers/imagesController');
const videosController = require('./../controllers/videosController');
const touchscreenController = require('./../controllers/touchscreenController');
const touchscreensController = require('./../controllers/touchscreensController');
const touchscreenSaverController = require('./../controllers/touchscreenSaverController');
const plinthController = require('./../controllers/plinthController');
const plinthsController = require('./../controllers/plinthsController');
const plinthSaverController = require('./../controllers/plinthSaverController');
const earningsController = require('./../controllers/earningsController');
const dowConnectController = require('./../controllers/dowConnectController');

/**
 * API ROUTES
 */
router.get('/api/news', newsController.getNewsApi);
router.get('/api/downews', dowController.getDowNewsApi);
router.get('/api/flights', flightController.getFlightsApi);
router.get('/api/weather', weatherController.getWeatherApi);
router.get('/api/clocks', clocksController.getClocksApi);
router.get('/api/holidays', holidaysController.getHolidayApi);
router.get('/api/twitter', twitterController.getTwitterApi);
router.get('/api/instagram', instagramController.getInstagramApi);
router.get('/api/facebook', facebookController.getFacebookApi);
router.get('/api/trends', trendsController.getTrendsApi);
router.get('/api/stocks', stocksController.getStocksApi);
router.get('/api/stockprice', stocksController.getStockPriceApi);
router.get('/api/onthisday', historyController.getHistoryApi);
router.get('/api/template/:id', templateController.getTemplate);
router.get('/api/heritage/:id', heritageController.getHeritage);
router.get('/api/touchscreen/:id', touchscreenController.getLandingJsonData);
router.get('/api/touchscreen/:id/:_id', touchscreenController.getInternalJsonData);
router.get('/api/touchscreenSaver/:id', touchscreenSaverController.getJsonData);
router.get('/api/plinth/:id', plinthController.getLandingJsonData);
router.get('/api/plinth/:id/:_id', plinthController.getInternalJsonData);
router.get('/api/plinthSaver/:id', plinthSaverController.getJsonData);
router.get('/api/vip', vipController.getVipApi);
router.get('/api/story', storyController.getStoryApi);
router.get('/api/mediaplayer', videosController.getMediaPlayerApi);
router.get('/api/earnings', earningsController.getEarningsApi);
router.get('/api/dowconnect', dowConnectController.getApi);

/**
 * ADMIN ROUTES
 */
router.get('/', (req, res) => {
	res.render('index', { title: 'Dow LiveWall', message: 'Dow LiveWall' });
});
router.get('/login', userController.loginForm);
router.get('/globals', globalsController.getGlobals);
router.post('/globals', globalsController.addGlobals);
router.post('/globals/:id', globalsController.updateGlobals);

router.get('/holidays', holidaysController.holidays);
router.get('/holidays/:id', holidaysController.getHoliday);
router.post('/holidays', holidaysController.addHoliday);
router.post('/holidays/:id', holidaysController.updateHoliday);
router.get('/holidays/delete/:id', holidaysController.deleteHoliday);

router.get('/history', historyController.history);
router.get('/history/:id', historyController.getHistory);
router.post('/history', historyController.addHistory);
router.post('/history/:id', historyController.updateHistory);
router.get('/history/delete/:id', historyController.deleteHistory);

router.get('/images', imagesController.images);
router.get('/images/:id', imagesController.getImage);
router.get('/images/delete/:id', imagesController.deleteImage);
router.post('/images', imagesController.uploadPhoto, imagesController.addImage);
router.post('/images/:id', imagesController.uploadPhoto, imagesController.updateImage);

router.get('/videos', videosController.videos);
router.get('/videos/:id', videosController.getVideo);
router.get('/videos/delete/:id', videosController.deleteVideo);
router.post('/videos/:id', videosController.uploadVideo, videosController.updateVideo);
router.post('/videos', videosController.uploadVideo, videosController.addVideo);

router.get('/heritage/:id', heritageController.getHeritageFeed);
router.post('/heritage/:id', heritageController.uploadPhoto, heritageController.addHeritage);
router.get('/heritage/:id/:_id', heritageController.getHeritageFeed);
router.post('/heritage/:id/:_id', heritageController.uploadPhoto, heritageController.updateHeritage);

router.get('/vip', vipController.vip);
router.post('/vip/globals/:id', vipController.uploadMedia, vipController.updateGlobals);
router.get('/vip/:id', vipController.getVip);
router.post('/vip/:id', vipController.uploadMedia, vipController.updateVip);
router.post('/vip', vipController.uploadMedia, vipController.addVip);
router.get('/vip/delete/:id', vipController.deleteVip);
router.get('/vip/globals/delete/:id/:_id', vipController.deleteGlobalTitleImage);

router.get('/touchscreens', touchscreensController.getData);
router.get('/touchscreens/:id', touchscreensController.getData);
router.get('/touchscreens/:id/:_id', touchscreensController.getData);
router.get('/touchscreens/delete/:id/:_id', touchscreensController.deleteItem);
router.post('/touchscreens/:id', touchscreensController.addItem);
router.post('/touchscreens/:id/:_id', touchscreensController.updateItem);

router.get('/touchscreen/:id', touchscreenController.getDataStandard);
router.get('/touchscreen/add/:id', touchscreenController.getData);
router.get('/touchscreen/:id/:_id', touchscreenController.getData);
router.get('/touchscreen/delete/:id/:_id', touchscreenController.deleteItem);
router.post('/touchscreen/:id', touchscreenController.uploadMedia, touchscreenController.addItem);
router.post('/touchscreen/:id/:_id', touchscreenController.uploadMedia, touchscreenController.updateItem);

router.get('/plinths', plinthsController.getData);
router.get('/plinths/:id', plinthsController.getData);
router.get('/plinths/:id/:_id', plinthsController.getData);
router.get('/plinths/delete/:id/:_id', plinthsController.deleteItem);
router.post('/plinths/:id', plinthsController.addItem);
router.post('/plinths/:id/:_id', plinthsController.updateItem);

router.get('/plinth/:id', plinthController.getDataStandard);
router.get('/plinth/add/:id', plinthController.getData);
router.get('/plinth/:id/:_id', plinthController.getData);
router.get('/plinth/delete/:id/:_id', plinthController.deleteItem);
router.post('/plinth/:id', plinthController.uploadMedia, plinthController.addItem);
router.post('/plinth/:id/:_id', plinthController.uploadMedia, plinthController.updateItem);

router.get('/dowconnect', dowConnectController.getData);
router.get('/dowconnect/:_id', dowConnectController.getData);
router.get('/dowconnect/delete/:_id', dowConnectController.deleteItem);
router.post('/dowconnect/', dowConnectController.uploadMedia, dowConnectController.addItem);
router.post('/dowconnect/:_id', dowConnectController.uploadMedia, dowConnectController.updateItem);

router.get('/earnings', earningsController.earnings);
router.get('/earnings/:id', earningsController.getEarning);
router.get('/earnings/delete/:id', earningsController.deleteEarning);
router.post('/earnings', earningsController.addEarning);
router.post('/earnings/:id', earningsController.updateEarning);

module.exports = router;