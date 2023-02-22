const express = require('express')
const router = express.Router();

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, User } = require('../../db/models');


//My code here
//-------------------------------------------------------------------
//README.md file on 251 Line 
//### Get all Spots
//Returns all the spots.
//-------------------------------------------------------------------
router.get(
  '/getspots',
  async (req, res) => {
    const spots = await Spots.findAll({});

    res.status(200);
    res.json(spots)
  });

//-------------------------------------------------------------------
//README.md file on 291 Line 
//### Get all Spots owned by the Current User
//Returns all the spots owned (created) by the current user.
//-------------------------------------------------------------------
router.get(
  '/getspotsbycurrentUser',
  requireAuth,
  async (req, res) => {

    if (req.user) {
      const spots = await Spots.findAll({
        where: { ownerId: req.user.id },
      });
      res.status(200);
      res.json(spots);
    }
  });

//-------------------------------------------------------------------
//README.md file on 331 Line 
//### Get details of a Spot from an id
//Returns the details of a spot specified by its id.
//-------------------------------------------------------------------
router.get(
  '/getspotsbyid/:id',
  //requireAuth,-----------Require Authentication: false
  async (req, res, next) => {
    let spot;

    spot = await Spot.findByPk(req.params.id);
    ////!!!!!
    //这个返回没有外联SpotImages和Owner信息。以后再补充

    if (spot) {
      res.status(200);
      res.json(spot);
    } else {
      res.status(404);
      res.json({
        statusCode: 404,
        message: 'Spot couldn\'t be found',
      });
    }
  });

//-------------------------------------------------------------------
//README.md file on 397 Line 
//### Create a Spot
//Creates and returns a new spot.
//-------------------------------------------------------------------
router.post(
  '/createspot',
  requireAuth,
  async (req, res, next) => {
    try {
      const { address, city, state, country, lat, lng, name, description, price } = req.body;

      let errorResult = { message: 'Validation error', statusCode: 400, errors: [] };

    

    //check input validity
    if (!(address)) {
      errorResult.errors.push('Street address is required');
    }
    if (!(city)) {
      errorResult.errors.push( 'City is required');
    }
    if (!(state)) {
      errorResult.errors.push( 'State is required');
    }
    if (!(country)) {
      errorResult.errors.push( 'City is required');
    }
    if (!(lat)) {
      errorResult.errors.push( 'Latitude is not valid');
    }
    if (!(lng)) {
      errorResult.errors.push( 'Longitude is not valid');
    }
    if (!(name) || name.length>50 ) {
      errorResult.errors.push( 'Name must be less than 50 characters');
    }
    if (!(description)) {
      errorResult.errors.push( 'Description is required');
    }
    if (!(price)) {
      errorResult.errors.push( 'Price per day is required');
    }


    if (errorResult.errors.length > 0) {
      res.status(400);
      return res.json(errorResult);
    }








      const newSpot = await Spot.create({
        "address": address,
        "city": city,
        "state": state,
        "country": country,
        "lat": lat,
        "lng": lng,
        "name": name,
        "description": description,
        "price": price
      });

      res.status(201);
      res.json(newSpot);

    } catch (err) {
      next({
        status: "error",
        message: 'Could not create new tree',
        details: err.errors ? err.errors.map(item => item.message).join(', ') : err.message
      });
    }
  });


//end my code----------------------------------------------------------


module.exports = router;
