'use strict'

const cheerio = require('cheerio');
const request = require('superagent');
const URL = 'http://www.ziroom.com/x/758212028.html';

//superagent是nodejs里一个非常方便的客户端请求代理模块，当你想处理get,post,put,delete,head请求时,你就应该想起该用它了
function fetchInfo(url) {
    //Promise的构造函数接收一个参数，是函数，并且传入两个参数：resolve，reject，分别表示异步操作执行成功后的回调函数和异步操作执行失败后的回调函数.
       //// resolve代表成功 reject失败 都是一个函数
    return new Promise((resolve, reject) => {
        request.get(url).end((err, res) => {
            if (err) {
                reject(err);
            } else {
                //cheerio是nodejs的抓取页面模块
                //var cheerio = require('cheerio'), $ = cheerio.load('<h2 class="title">Hello world</h2>');$('h2.title').text('Hello there!');$('h2').addClass('welcome');$.html();//=> <h2 class="title welcome">Hello there!</h2>
                const $ = cheerio.load(res.text);
                //找到class为.Z_slider的标签
                const ulElem = $('.Z_slider');
                //find函数获得一个在匹配的元素中由选择器滤过的后代，也就是去找img标签了
                const imgSrc = ulElem.find('img').attr('src');
                // 房源配置中页面会有的图片
                // http://pic.ziroom.com/static/images/slist_1207/defaultPZZ/mumian-loading.jpg
                //.find(selector)
                //获得一个在匹配的元素中由选择器滤过的后代。
                //$('#fruits').find('li').length
                if (imgSrc.indexOf('img.ziroom.com/pic/static/images/slist_1207/defaultPZZ/misu-canbook.jpg_C_800_600_Q100.jpg') !== -1) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            }
        });
    });
}

function test(url) {
    if (!url) {
        url = URL;
    }
    fetchInfo(url).then((result) => {
        console.log(result)
    }).catch(e => {
        console.log(e)
    });
}
// test();
module.exports = { fetchInfo };
