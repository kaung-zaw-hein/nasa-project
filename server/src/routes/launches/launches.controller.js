const { 
    getAllLaunches,
    addNewLaunch,
 } = require('../../models/launches.model');

function httpgetAllLaunches(req, res){
    return res.status(200).json(getAllLaunches());
}

function httpAddNewLaunch(req,res){
    const launch = req.body;

    if(!launch.mission || !launch.rocket || !launch.launchDate || !launch.destination){
        return res.status(404).json({
            error: 'Missing required launch property'
        });
    }

    launch.launchDate = new Date( launch.launchDate);
    if(isNaN(launch.launchDate)){
        return res.status(404).json({
            error: 'Invalide launch date'
        })
    }

    addNewLaunch(launch);
    res.status(201).json(launch);
}

module.exports = {
    httpgetAllLaunches,
    httpAddNewLaunch
}

