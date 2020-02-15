'use strict'

//nodemailer是nodejs中的邮件发送模块
const mailer = require('nodemailer');
////使用激活需引入的模块
const smtpTransport = require('nodemailer-smtp-transport');
//  util模块是一类包罗万象的模块。它提供了实用函数来格式化字符串，将对象转换为字符串，检查对象的类型，并执行对输出流的同步写入，以及一些对象继承的增强。
const util = require('util');
// 写自己的邮箱
const mail_opts = {
    host: 'smtp.163.com',
    port: 25,
    auth: {
        user: 'xxxx@163.com', // 邮箱账号
        pass: 'xxxx' // 密码
    }
};
//// 开启一个 SMTP 连接池
const transport = mailer.createTransport(smtpTransport(mail_opts));
//域名domain没有的时留空，devMode下读取host

/**
 * 邮件发送
 * @param {Object} data 邮件对象
 */
function sendMail(data) {
    transport.sendMail(data, function (err) {
        if (err) {
            // 写为日志
            console.error(err);
        }
    });
}


/**
 * 发送通知邮件
 * @param {String} who 接收人的邮件地址
 */
function sendAlertMail(who) {
    var from = util.format('%s <%s>','ziroom-crawler', mail_opts.auth.user);
    var to = who;
    var subject = '自如租房房源开放了！！！';
    var html = '<p>亲爱的用户xxxxx您好：</p>' +
    '<p>您关注的房源可以付款，登录App抢购自如租房的房源</p>';
    sendMail({
        from: from,
        to: to,
        subject: subject,
        html: html
    });
}

module.exports = { sendMail, sendAlertMail };