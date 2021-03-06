/**
 * Created by ManasB on 6/8/2015.
 */

var mongoose = require("mongoose");

var vehicleLocationSchema = new mongoose.Schema({
    vehicle_id: {type: String, index: true},
    last_gps_fix: {type: Number, index: true},
    location: {type: [Number], index: '2d'},
    speed: Number, // The speed (in miles per hour) of the vehicle
    heading: Number, // The heading (in degrees, 0-360) of the vehicle
    service_name: {type: String, index: true},
    destination: String
});

module.exports = mongoose.model('VehicleLocation', vehicleLocationSchema);