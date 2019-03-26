var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CrimeSchema = new Schema(
    {
        //Enter model information here
        category: {
            code: String,
            name: String
        },
        "date": String,
        "person_id": String,
        "crime": {
            "category": String,
            "location_type": String,
            "location": {
                "latitude": Number,
                "street": {
                    "id": Number,
                    "name": String
                },
                "longitude": Number
            },
            "context": String,
            "persistent_id": String,
            "id": Number,
            "location_subtype": String,
            "month": String
        }
    });

//Export model
module.exports = mongoose.model('UKCrime', CrimeSchema);
