const request = require('request');
const apiOptions = {
    server: 'http://localhost:3000'
}

/* GET 'home' page */
const homeList = (req, res) => {
    const path = '/api/locations';
    const requestOptions = {
        url: `${apiOptions.server}${path}`,
        method: 'GET',
        json: {},
        qs: {
            lng: 3,
            lat: 2,
            maxDistance: 20000000000
        }
    };
    request(
        requestOptions,
        (err, {statusCode}, body) => {
            let data = [];
            if (statusCode===200 && body.length) {
                data = body.map((loc) => {
                    loc.distance = formatDistance(loc.distance);
                    return loc;
                });
            }else{
                // bug: cant diff API lookup error & no loc nearby for now
                data = body===[]?{}:body;
            }
            renderHomepage(req,res,data);
        }
    );
};

const renderHomepage = (req, res, responseBody) => {
    let message = null;
    if(!(responseBody instanceof Array)){
        message = "API Lookup error";
        responseBody = [];
    }else{
        if(!responseBody.length){
            message = "No places found nearby";
        }
    }
    res.render('location-list', {
            title: 'Loc8r - find a place to work with wifi',
            pageHeader: {
                title: 'Loc8r',
                strapline: 'Find places to work with wifi near you!'
            },
            sidebar: "Looking for wifi and a seat? Loc8r helps you find places\n" +
                "to work when out and about. Perhaps with coffee, cake or a pint?\n" +
                "Let Loc8r help you find the place you're looking for.",
            locations: responseBody,
            message
        }
    );
};

const formatDistance = (distance) => {
    let thisDistance = 0;
    let unit = 'm';
    if(distance > 1000){
        thisDistance = parseFloat(distance/1000).toFixed(1);
        unit = 'km'
    }else{
        thisDistance = Math.floor(distance);
    }
    return thisDistance+ unit;
}


/* GET 'Location info' page */
const getLocationInfo = (req, res, callback) => {
    const path = `/api/locations/${req.params.locationid}`;
    const requestOptions = {
        url: `${apiOptions.server}${path}`,
        method: 'GET',
        json: {}
    }
    request(
        requestOptions,
        (err, {statusCode}, body) =>{
            const data = body;
            if(statusCode===200) {
                data.coords = {
                    lng: body.coords[0],
                    lat: body.coords[1]
                }
                callback(req, res, data);
            }else{
                showError(req, res, statusCode);
            }
        }
    )
};

const locationInfo = (req, res) => {
    getLocationInfo(req, res,
        (req, res, responseData) => renderDetailsPage(req, res, responseData));
}

const showError = (req, res, status) => {
    let title = '';
    let content = '';
    if (status === 404) {
        title = '404, page not found';
        content = 'Oh dear. Looks like you can\'t find this page. Sorry.';
    } else {
        title = `${status}, something's gone wrong`;
        content = 'Something, somewhere, has gone just a little bit wrong.';
    }
    res.status(status);
    res.render('generic-text',{title,content});
}

const renderDetailsPage = (req, res, location) => {
    res.render('location-info', {
        title: location.name,
        pageHeader: {title: location.name},
        sidebar: {
            context: 'Starcups is on Loc8r because it has accessible wifi and space to sit down with your laptop and get some work done.',
            callToAction: 'If you\'ve been and you like it - or if you don\'t - please leave a review to help other people just like you.',
        },
        location
    })
        };

/* GET 'Add review' page */
const addReview = (req, res) => {
    getLocationInfo(req, res,
        (req, res, responseData) => renderReviewForm(req, res, responseData));
};

const renderReviewForm = (req, res, {name}) => {
    res.render('location-review-form',{
        title: `Review ${name} on Loc8r`,
        pageHeader: {title:`Review ${name}`},
        error: req.query.err
    });
}

const doAddReview = (req, res) => {
    const locationid = req.params.locationid;
    const path = `/api/locations/${locationid}/reviews`;
    const postdata = {
        author: req.body.name,
        rating: parseInt(req.body.rating,10),
        reviewText: req.body.review
    }
    console.log(postdata);
    const requestOptions = {
        url: `${apiOptions.server}${path}`,
        method: 'POST',
        json: postdata
    }
    request(
        requestOptions,
        (err, {statusCode}, {name}) => {
            if(statusCode===201){
                res.redirect(`/location/${locationid}`);
            }else if(statusCode===400 && name && name==="ValidationError"){
                console.log(err);
                res.redirect(`/location/${locationid}/review/new?err=val`);
            }
            else{
                console.log(err);
                showError(req,res,statusCode);
            }
        }
    )
}

module.exports = {
    homeList,
    locationInfo,
    addReview,
    doAddReview
}



