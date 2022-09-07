const CronJob = require('node-cron');
const {mailSenderService} = require("../services/mail.service");
const ejs = require("ejs");
const {getTodaysItems} = require("../services/getTodaysItems.service");
const {getTodaysItemsDTO} = require("../dto/todaysItems.dto");

const dailyUpdate = () => {
    const job = CronJob.schedule('58 16 16 * * *', async () => {
        const mailOptions = {
            from: '20bec101@iiitdmj.ac.in',
            to: '20bec101@iiitdmj.ac.in',
            subject: 'Daily Update on Lost and Found Items',
        };
        const dir = __dirname.split('/');
        dir.pop();
        const data = await getTodaysItems(getTodaysItemsDTO);
        data.map(item => {
            item.date = new Date(item.dateTime).toDateString();
        });

        if (data.length === 0)
            return;

        ejs.renderFile(dir.join('/') + '/views/newsletter.ejs', {items: data}, (err, data) => {
            if (err)
                console.log(err);
            else
                mailOptions.html = data;
            mailSenderService(mailOptions, data);
        });
    });
    job.start();
};

module.exports = {dailyUpdate};
