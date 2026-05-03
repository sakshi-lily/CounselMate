const mongoose = require("mongoose");

const CollegeSchema = new mongoose.Schema({
    collegeName: {
        type: String,
        required: true,
        trim: true
    },
    location: {
        city: String,
        state: String,
        district: String,
        address: String,
        pincode: String
    },
    establishmentDetails: {
        type: String,
        yearEstablished: Number,
        affiliation: String
    },
    coursesOffered: [
        {
            courseName: String,
            duration: String,
            eligibility: String
        }
    ],
    placementData: {
        placementPercentage: Number,
        averagePackage: String,
        highestPackage: String
    },
    infrastructure: {
        hostel: Boolean,
        library: Boolean,
        sportsComplex: Boolean
    },
    contactInformation: {
        phone: String,
        email: String,
        website: String
    },
    reviews: {
        overallRating: Number,
        totalReviews: Number
    },
    source: {
        type: String,
        required: true
    }
}, {

    timestamps: true 
});


const College = mongoose.model("College", CollegeSchema);

module.exports = College;
