'use strict';

const CronJob = require('cron').CronJob;
const crawler = require('./crawler');
const mail = require('./mail');
const CRAWER_URL = 'http://www.ziroom.com/x/758212028.html'; //你需要的自如租房的房源链接地址

// 定时执行
//在linux下使用crontab来进行任务调度十分方便，你可以指定每隔一段时间执行指定的程序、也可以指定每天的某个时刻执行某个程序、还可以按照星期、月份来指定。
//在nodejs中也有类似的cron模块，可以实现同样的功能，时间语法也一样。
//第一个参数就是隔着多少时间执行
//第二个参数是要在指定时间触发的函数
//第三个参数是一个函数，当任务完成时，当它停止时将触发
//第四个参数指定是否在退出构造函数之前启动作业。默认设置为false。如果保留默认值，则需要调用job.start()来启动作业(假设作业是您将cronjob设置为的变量)。这不会立即触发onTick函数，它只是让您对作业的行为有更多的控制。
//第五个参数是指定执行的时区。这将修改相对于您的时区的实际时间。如果时区无效，则抛出错误。您可以在即时时区网站上查看所有可用的时区。
//下面表示每两分钟执行一次
let job2 = new CronJob('*/2 * * * * *', function () {
    crawlering();
}, null, true, 'Asia/Shanghai');

job2.start();

let count=0;

// 爬取城市数据
function crawlering() {
    crawler.fetchInfo(CRAWER_URL).then((result) => {
        if (result) {
            console.log('房源配置中……');
        } else {
            console.log('可以抢购');
            mail.sendAlertMail('xxxxx@qq.com'); // 改为你要通知的邮件
            count = count+1;
            if(count==2)
            {
                job2.stop();
            }
        }
    }).catch(e => {
        console.log(e)
    });
}

