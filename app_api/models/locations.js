const mongoose = require('mongoose');

const openingTimeSchema = new mongoose.Schema({
    days:{
        type: String,
        required: true
    },
    opening: String,
    closing: String,
    closed: {
        type: String,
        required: true
    }
})

const reviewSchema = new mongoose.Schema({
    author: {
        type:String,
        required: true
    }, rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5
    },
    reviewText: {
        type: String,
        required: true
    },
    timestamp:{
        type: Date,
        'default': Date.now
    }
})

const locationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: String,
    rating: {
        type: Number,
        'default':0,
        min: 0,
        max: 5
    },
    facilities: [String],
    coords: {
        type: { type: String},
        coordinates: [Number]
    },
    openingTimes: [openingTimeSchema],
    reviews: [reviewSchema]
});

locationSchema.index({coords: '2dsphere'})

m = mongoose.model('Location',locationSchema)

m.find(({},(err,doc)=>{
    if(doc.length!==0){
        return;
    }
    newLoc = new m({
    name: 'Costy',
    address: '125 High Street, Reading, RG6 1PS',
    rating: 3,
    facilities: ['Hot drinks', 'Food', 'Premium wifi'],
    coords: { type: "Point", coordinates: [-0.9690884, 51.455041] },
    openingTimes: [{
        days: 'Monday - Friday',
        opening: '7:00am',
        closing: '7:00pm',
        closed: false
    }, {
days: 'Saturday',
    opening: '8:00am',
    closing: '5:00pm',
    closed: false
}, {
    days: 'Sunday',
        closed: true
}],
        reviews: {
            author: 'Simon Holmes',
            rating: 5,
            timestamp: new Date("Mar 12, 2012"),
            reviewText: "Cool place."
        }
})
    newLoc.save();

    newLoc2 = new m(
    {
        name: 'Cafe Hero',
        address: '62 High Way, San Francisco',
        rating: 4,
        facilities: ['Hot drinks', 'Food', 'Premium wifi'],
        coords: { type: "Point", coordinates: [-6.9650884, 51.455041] },
        openingTimes: [{
            days: 'Tuesday - Friday',
            opening: '10:00am',
            closing: '9:00pm',
            closed: false
        }, {
            days: 'Saturday',
            opening: '8:00am',
            closing: '5:00pm',
            closed: false
        }, {
            days: 'Sunday',
            closed: true
        }],
        reviews: {
            author: 'Simon Holmes',
            rating: 5,
            timestamp: new Date("Mar 12, 2017"),
            reviewText: "What a great place."
        }
    })
    newLoc2.save();

    newLoc3 = new m({
        name: 'Burger Queen',
        address: '78 Sip road, California',
        rating: 2,
        facilities: ['Food', 'Premium wifi'],
        coords: { type: "Point", coordinates: [-3.9890884, 51.455041] },
        openingTimes: [{
            days: 'Monday - Friday',
            opening: '7:00am',
            closing: '7:00pm',
            closed: false
        }, {
            days: 'Saturday',
            opening: '8:00am',
            closing: '5:00pm',
            closed: false
        }, {
            days: 'Sunday',
            closed: true
        }],
        reviews: {
            author: 'Simon Holmes',
            rating: 5,
            timestamp: new Date("Mar 12, 2017"),
            reviewText: "What a great place."
        }
    })
    newLoc3.save();

}))