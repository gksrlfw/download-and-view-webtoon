// http://webtoon.daum.net/data/pc/webtoon/view/bugplayer?timeStamp=1600584735792 api를 통해 웹툰 이미지를 받아온다

const axios = require('axios');
const fs = require('fs');
const fsPromises = require('fs').promises;

const downloadImages = async (url, currentIndex, title, titleId, imageNumber, retryCount) => {
  try {
    const config = {
      responseType: 'arraybuffer'
    };
    const path = './src/assets/wtImages';
    // 0000 네자리라 하자..
    // 1부터 시작하면 정렬이 1 > 11 이렇게됨 >> 01로 시작하게 한다
    if (Number(currentIndex) < 10) currentIndex = '000' + currentIndex;
    if (Number(currentIndex) >= 10 && Number(currentIndex) < 100) currentIndex = '00' + currentIndex;
    if (Number(currentIndex) >= 100 && Number(currentIndex) < 1000) currentIndex = '0' + currentIndex;

    const res = await axios.get(url, config);
    if (res.status !== 200 && retryCount) { return downloadImages(url, currentIndex, imageNumber, --retryCount); }
    if (!fs.existsSync(`${path}/${title}`)) { await fsPromises.mkdir(`${path}/${title}`); }
    if (!fs.existsSync(`${path}/${title}/${currentIndex}`)) { await fsPromises.mkdir(`${path}/${title}/${currentIndex}`); }

    let page = imageNumber;
    if (Number(page) < 10) page = '000' + page;
    if (Number(page) >= 10 && Number(page) < 100) page = '00' + page;
    if (Number(page) >= 100 && Number(page) < 1000) page = '0' + page;
    console.log(page);
    await fsPromises.writeFile(`${path}/${title}/${currentIndex}/${titleId}_${currentIndex}_${page}.jpg`, res.data);
  } catch (err) {
    if (err) console.log(err);
  }
};
const getImageUrls = async (title, titleId, currentIndex) => {
  try {
    console.log(222);
    const res = await axios.get(`http://webtoon.daum.net/data/pc/webtoon/viewer_images/${titleId}`);
    for (let i = 0; i < res.data.data.length; i++) {
      console.log(res.data.data[i].url);
      downloadImages(res.data.data[i].url, currentIndex, title, titleId, i, 5);
    }
  } catch (err) {
    if (err) console.log(err);
  }
};
const DaumCrawler = async (titleForWeb, title, from, to) => {
  try {
    console.log(title, titleForWeb, from, to);
    const res = await axios.get(`http://webtoon.daum.net/data/pc/webtoon/view/${titleForWeb}`);
    if (res.status !== 200) console.log('error');
    if (res.data.data.webtoon.webtoonEpisodes.length < to) return;
    for (let i = from, j = 0; i <= to; i++, j++) {
      console.log(res.data.data.webtoon.webtoonEpisodes[i].serviceType);
      if (res.data.data.webtoon.webtoonEpisodes[i].serviceType === 'free') {
        setTimeout(() => {
          getImageUrls(title, res.data.data.webtoon.webtoonEpisodes[i].id, res.data.data.webtoon.webtoonEpisodes[i].episode);
        }, j * 1000);
      }
    }
  } catch (err) {
    if (err) console.log(err);
  }
};

export default DaumCrawler;
// DaumCrawler('버그맨', 'bugplayer');
