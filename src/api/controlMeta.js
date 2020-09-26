const nodeID3 = window.require('node-id3');
const fs = window.require('fs');

let artist = '';
const checkMeta = async (songPath) => {
  artist = await nodeID3.read(songPath, (err, tags) => {
    if (err) console.log(err);
    // image 추출
    fs.writeFileSync(`./src/assets/images/${tags.title}.jpg`, tags.image.imageBuffer, 'binary', err => {
      if (err) console.log(err);
    });
  });
  return artist;
};

// const checkMeta2 = (songPath) => {
//   return new Promise((res, rej) => {
//     nodeID3.read(songPath, (err, tags) => {
//       if (err) console.log(err);
//       // image 추출
//       fs.writeFileSync(`./src/assets/images/${tags.title}.jpg`, tags.image.imageBuffer, 'binary', err => {
//         if (err) console.log(err);
//       });
//     });
//   });
// };

export { checkMeta };
