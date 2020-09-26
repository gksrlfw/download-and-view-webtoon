// 그림요청이 오면 네이버 웹툰 홈페이지에서 요청한건지 확인한다. referer는 현재 요청된 페이지의 링크 이전의 웹페이지 주소를 포함한다
// 페이지의 headers에서 referer부분을 보면 나와있다

const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const fsPromises = require('fs').promises;
const download = async (path, url, titleId, title, currentIndex, retryCount) => {
  try {
    const config = {
      // https://github.com/axios/axios/issues/943
      headers: {
        // https://medium.com/@rumsantech/using-axios-to-programmatically-login-to-a-website-and-requesting-a-secure-page-using-cookies-c1bfd7ef852f : 이거 함 보자...
        // Cookie: 'NID_AUT=7Oxgy0R0dWaeZ6N7qPF29viuw8rvBbSgylLkkV6p6dfhA5ft0ltbcRxgaOnb2mUH; NID_SES=AAABd5O6ttkCeGc3zPdcTAC3znchAWX2AuFumh9dh5gteCb/GT4VoUkNznK/bl6cUp6vZbqW/XJHZ94JrzhyEAobjyxFXI3Y4rwpNhR2jv6QGor/Phhwg8bKhl8y74kTwfCypnQ4tG82z5hZHw7IprH7NZGr+lC2byD4ixS51pzf+sopoKKftaoPsxJxu5iruN/FOF6RDH5JQN+nBZX5JLNGfmyLV7LON9JZ+RWDZFy35OmO8kHoXFsoH3Oc6tSCOiyTNtuTIjfgYA/lI5Y4NOP8E4V5MgrvXrIH6DisBm2bhbLqeEAPPBAwLy4g7fFh4HsieYrmL7hhxkNAHlv8bZ/oTRtN0RBCvidr1sp49h1gSRNqTMwrRQ43ba2np33UecGy2fw2BoWntRqKv8FO0C3j+sLJfQaCD9cbYtBI19o1S+D1iua7QXqtU2f88MhGbq2IsQMpPGHJKSAf/OijHHfWEIRjnDI/4wo6pgMyNLmxj11aZhHI4UVKXLARwdtQuJCiXg==;',
        referer: `https://comic.naver.com/webtoon/detail.nhn?titleId=${titleId}&no=${currentIndex}&weekday=thu`
      },
      responseType: 'arraybuffer'
    };
    // 0000 네자리라 하자..
    // 1부터 시작하면 정렬이 1 > 11 이렇게됨 >> 01로 시작하게 한다
    if (Number(currentIndex) < 10) currentIndex = '000' + currentIndex;
    if (Number(currentIndex) >= 10 && Number(currentIndex) < 100) currentIndex = '00' + currentIndex;
    if (Number(currentIndex) >= 100 && Number(currentIndex) < 1000) currentIndex = '0' + currentIndex;
    const res = await axios.get(url, config);
    if (res.status !== 200 && retryCount) { return download(path, url, titleId, title, currentIndex, --retryCount); }
    if (!fs.existsSync(`${path}/${title}`)) { await fsPromises.mkdir(`${path}/${title}`); }
    if (!fs.existsSync(`${path}/${title}/${currentIndex}`)) { await fsPromises.mkdir(`${path}/${title}/${currentIndex}`); }

    let page = url.split('_IMAG01_')[1].split('.')[0];
    if (Number(page) < 10) page = '000' + page;
    if (Number(page) >= 10 && Number(page) < 100) page = '00' + page;
    if (Number(page) >= 100 && Number(page) < 1000) page = '0' + page;
    await fsPromises.writeFile(`${path}/${title}/${currentIndex}/${titleId}_${currentIndex}_${page}.jpg`, res.data);
  } catch (err) {
    if (err) console.log(err);
  }
};

const getImageUrls = async (titleId, title, currentIndex) => {
  try {
    const res = await axios.get(`https://comic.naver.com/webtoon/detail.nhn?titleId=${titleId}&no=${currentIndex}&weekday=thu`);
    if (res.status !== 200) console.log('error');
    const $ = cheerio.load(res.data);
    const array = $('.wt_viewer img');
    for (let i = 0; i < array.length; i++) { download('./src/assets/wtImages', array[i].attribs.src, titleId, title, currentIndex, 5); }
  } catch (err) {
    console.log(err);
  }
};

const NaverCrawler = (titleId, title, from, to) => {
  for (let i = from, j = 0; i <= to; i++, j++) {
    setTimeout(() => {
      getImageUrls(titleId, title, i);
    }, j * 1000);
  }
};

export default NaverCrawler;
