const CronJob = require('node-cron');

const dailyUpdate = () => {
    const job = CronJob.schedule('02 13 * * *', ()=>{
        console.log("logger")
    });
    job.start();
};

module.exports = {dailyUpdate};
