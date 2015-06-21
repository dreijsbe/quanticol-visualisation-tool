/**
 * Created by ManasB on 6/14/2015.
 */

var express = require('express');
var router = express.Router();
var Service = require("../models/service");
var VehicleLocation = require("../models/vehicle_location");
var async = require("async");

router.get("/services", function (req, res, next) {
    Service
        .find({}, function (err, services) {
            if (err) return next(err);

            res.json(services);
        });
});

router.get("/vehicles/:filter", function (req, res, next) {
    var filter = req.params.filter;
    var selectedServices = req.query["service"] || [];
    var selectedVehicles = req.query["vehicle"] || [];
    var startTime = req.query["startTime"] ? req.query["startTime"] : 0;
    var endTime = req.query["endTime"] ? req.query["endTime"] : ((new Date()).getTime() / 1000).toFixed(0);

    switch (filter) {
        case "unique":
            VehicleLocation
                .where("service_name")
                .in(selectedServices)
                .distinct("vehicle_id")
                .exec(function (err, vehicleIDs) {
                    if (err) return next(err);

                    // now that we have the distinct vehicle ids, we will find one vehicle for each of these ids
                    var uniqueVehicles = [];
                    async.each(
                        vehicleIDs,
                        function (vehicleID, cb) {
                            VehicleLocation.findOne({vehicle_id: vehicleID, service_name: {$ne: null}}, function (err, vehicle) {
                                uniqueVehicles.push(vehicle);
                                cb();
                            });
                        },
                        function () {
                            res.json(uniqueVehicles);
                        }
                    )
                });
            break;

        case "all":
            VehicleLocation
                .where({
                    service_name: {$in: selectedServices},
                    vehicle_id: {$in: selectedVehicles},
                    last_gps_fix: {
                        $gte: startTime,
                        $lte: endTime
                    }
                })
                .exec(function (err, vehicles) {
                    if (err) return next(err);

                    res.json(vehicles);
                });
            break;

        default:
            return next(new Error("Filter can only be 'unique' or 'all'."));
            break;
    }
});


module.exports = router;