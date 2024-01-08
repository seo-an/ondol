import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

import bcrypt from 'bcrypt';

import envSetting from './env.js'; // env.js를 env.ts로 변경하고 export default를 사용해야 함
import externalRequestTo from './https-request.js'; // https-request.js를 https-request.ts로 변경하고 export default를 사용해야 함
import { pool, getConnect, postConnect, deleteConnect, putConnect, serverConnect } from './database.js'; 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Node.js express server용 port
const PORT = envSetting.NODE_SERVER_PORT || 1991;

// json body parser
app.use(express.json());

const dbConnection = pool(envSetting.mysqlServerConf);

// Define API route (internal API)
// post to database
// app.post('/api/guestbook/data', (req, res) => {
//   // console.log('Node.js server post to (/api/guestbook/data) : ', req.body);
//   const data = (req.body) ? req.body : null;

//   if (data === null) {
//     res.status(422).send({
//       message: 'Unprocessable Entity: 올바른 값을 입력해주세요',
//       data: data
//     });
//     return;
//   }

//   const prefix = String(new Date().getTime());
//   const isEncoded = false;

//   const INSERT_DATA = `
//     INSERT INTO ${envSetting.API_INPUT_DATA_TO_THIS_TABLE} (uniqueId, name, simple_password, title, comment, isPublic, isEncoded)
//     SELECT
//       CONCAT(IFNULL(1 + MAX(id), 1),'_${data.name}','${prefix}') AS uniqueID,
//       '${data.name}' AS name,
//       '${data.simple_password}' AS simple_password,
//       '${data.title}' AS title,
//       '${data.comment}' AS comment,
//       '${data.isPublic}' AS isPublic,
//       '${isEncoded}' AS isEncoded
//     FROM ${envSetting.API_INPUT_DATA_TO_THIS_TABLE};
//   `;

//   console.info(INSERT_DATA);
//   postConnect(res, dbConnection, INSERT_DATA);
// });
app.post('/api/guestbook/data', async (req, res) => {
  // console.log('Node.js server post to (/api/guestbook/data) : ', req.body);
  const data = (req.body) ? req.body : null;

  if (data === null) {
    res.status(422).send({
      message: 'Unprocessable Entity: 올바른 값을 입력해주세요',
      data: data
    });
    return;
  }

  try {
    const prefix = String(new Date().getTime());
    const isEncoded = true;

    // 비밀번호 해싱
    const bcryptSaltRounds = 10;
    const hashedPassword = await bcrypt.hash(data.simple_password, bcryptSaltRounds);
    console.log('simple', data.simple_password, 'hashed', hashedPassword);
    // 쿼리 스트링 준비 (해시된 비밀번호 사용)
    const INSERT_DATA = `
      INSERT INTO ${envSetting.API_INPUT_DATA_TO_THIS_TABLE} (uniqueId, name, simple_password, title, comment, isPublic, isEncoded)
      SELECT
        CONCAT(IFNULL(1 + MAX(id), 1),'_${data.name}','${prefix}') AS uniqueID,
        '${data.name}' AS name,
        '${hashedPassword}' AS simple_password,
        '${data.title}' AS title,
        '${data.comment}' AS comment,
        '${data.isPublic}' AS isPublic,
        '${isEncoded}' AS isEncoded
      FROM ${envSetting.API_INPUT_DATA_TO_THIS_TABLE};
    `;

    console.info(INSERT_DATA);
    postConnect(res, dbConnection, INSERT_DATA);
  } catch (err) {
    console.error(err);
    res.status(500).send({
      message: 'FAILED : Server error during password hashing',
      data: err
    });
  }
});

// get from database
app.get('/api/guestbook/data', (req, res) => {
  const select = req.query.select;
  const from = envSetting.API_INPUT_DATA_TO_THIS_TABLE;
  const where = req.query.where;

  const READ_DATA = (where !== '') ? `SELECT ${select} FROM ${from} WHERE ${where}` : `SELECT ${select} FROM ${from}`;

  getConnect(res, dbConnection, READ_DATA);
});

// delete in database
// app.delete('/api/guestbook/data/:id', (req, res) => {
//   const uniqueId = req.params.id;
//   const password = req.body.password;
//   // console.log('😤', req.params, req.body);
  
//   const DELETE_DATA = `DELETE FROM ${envSetting.API_INPUT_DATA_TO_THIS_TABLE} WHERE uniqueId = '${uniqueId}' AND simple_password = '${password}';`;

//   deleteConnect(res, dbConnection, DELETE_DATA);
// });
app.delete('/api/guestbook/data/:id', async (req, res) => {
  const uniqueId = req.params.id;
  const password = req.body.password;
  // console.log('😤', req.params, req.body);
  
  const FIND_USER_QUERY = `SELECT simple_password FROM ${envSetting.API_INPUT_DATA_TO_THIS_TABLE} WHERE uniqueId = '${uniqueId}'`;

  try {
    const user = await serverConnect(dbConnection, FIND_USER_QUERY);
    
    if (user.length === 0) {
      res.status(404).send({
        message: '사용자를 찾을 수 없습니다.'
      });
      return;
    }

    const hashedPassword = user[0].simple_password;
    // 입력된 비밀번호와 해시된 비밀번호를 비교
    // bcrypt를 사용하여 비밀번호 확인
    const isMatch = await bcrypt.compare(password, hashedPassword);
    
    if (!isMatch) {
      return res.status(401).send('비밀번호가 틀렸습니다.');
    }

    // 비밀번호가 일치하는 경우, 데이터 삭제 처리
    const DELETE_DATA = `DELETE FROM ${envSetting.API_INPUT_DATA_TO_THIS_TABLE} WHERE uniqueId = '${uniqueId}'`;
    deleteConnect(res, dbConnection, DELETE_DATA);
  } catch (err) {
    console.error('! CAN NOT CONNECT TO DATABASE ::', err);
    res.status(500).send({
      message: 'Server error : can not connect to database',
      data: err
    });
  }
});


// put to database
app.put('/api/guestbook/data/:id', (req, res) => {
  // console.log('😤', req.params, req.body);
  
  const uniqueId = req.params.id;
  const username = req.body.modifiedUsername;
  const title = req.body.modifiedTitle;
  const comment = req.body.modifiedComment;

  const PUT_DATA = `
    UPDATE ${envSetting.API_INPUT_DATA_TO_THIS_TABLE}
    SET name = '${username}', title = '${title}', comment = '${comment}'
    WHERE uniqueId = '${uniqueId}'
  `

  putConnect(res, dbConnection, PUT_DATA);
});


// const http = require('http');
// const https = require('https');
// const querystring = require('querystring');

app.post('/api/papago', async (req, res) => {
  // 내부 경로로 온 POST 요청을 처리
  const CLIENT_ID = process.env.NAVER_API_PAPAGO_CLIENT_ID_A;
  const CLIENT_SECRET = process.env.NAVER_API_PAPAGO_CLIENT_SECRET_A;

  const NAVER_API_HOSTNAME = 'openapi.naver.com';
  const PAPAGO_PATH = '/v1/papago/n2mt';

  const data = {
    source: req.body.source,
    target: req.body.target,
    text: req.body.text
  };
  
  const externalOptions = {
    method: 'POST',
    hostname: NAVER_API_HOSTNAME,
    path: PAPAGO_PATH,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'X-Naver-Client-Id': CLIENT_ID,
      'X-Naver-Client-Secret': CLIENT_SECRET,
    },
  };

  const responses = await externalRequestTo(externalOptions, data);

  res.status(200).json({ internal: 'GET External Response: SUCCESS', responses });

});

// app.use(express.static(path.resolve(__dirname, 'build', 'index.html')));
app.use(express.static(path.join(__dirname, 'build', 'index.html')));
// '*' 으로 설정하면 react가 route의 전권을 가져갈 수 있음
// react가 route의 전권을 가져가게 되면 여기서 routing endpoint를 결정하는 것은 의미가 없음
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// 가장 마지막에
app.listen(PORT, () => {
    console.log(`Node.js server on :: Server listening on port ${PORT}`);
    console.log(`Now running environment :: ${process.env.NODE_ENV}`);

    // const http = require('http');
    // process.send('ready');
});





// "dev2": "webpack --config ./webpack.config.js",
// "ts": "tsc"