import * as UAParser from 'ua-parser-js';
import * as queryString from 'querystring';
import * as crypto from 'crypto';
import * as moment from 'moment';
import { IServiceResponse } from './interfaces';
import { isEqual, isObject } from 'lodash';

const getUserAgent = (req, isFullAgent = false) => {
  if (isFullAgent) return req.headers['user-agent'];
  if (req.headers['user-agent']) {
    const userAgentParsed = UAParser(req.headers['user-agent']);
    return userAgentParsed.browser.name ? 'WEB' : 'APP';
  }
  return null;
};

const getToken = (req) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(' ')[0] === 'Bearer'
  ) {
    return req.headers.authorization.split(' ')[1];
  }
  return null;
};

const parseHash = (value) => {
  return Object.keys(queryString.parse(value))[0];
};

const response = (
  status: number,
  message: string,
  data = null,
  errors = null,
): IServiceResponse => {
  const response: IServiceResponse = {
    status,
    message,
    data,
    errors,
  };
  return response;
};

const generateRequestId = () => {
  const time = Date.now().toString();
  const randomNumbers = Math.floor(Math.random() * (1000 - 100) + 100);
  return time + randomNumbers.toString();
};

const getLogMessage = (parameter) => {
  const { message, ...logMessage } = parameter;
  let patternLog = '';
  const systemKey = [
    'time',
    'level',
    'application',
    'source',
    'requestId',
    'reqUserId',
    'callerAddress',
  ];
  const getPatternLogSystem = (key, length) => {
    const offsetSize = length - (String(logMessage[key])?.length || length);
    const stringOffset = ''.padEnd(offsetSize, ' ');
    return `[\${this.${key}}] ${stringOffset}`;
  };
  systemKey.map((key) => {
    if (logMessage[key] == undefined) return;
    if (['application', 'source'].includes(key)) {
      return (patternLog += getPatternLogSystem(key, 20));
    }
    if (isEqual(key, 'level')) {
      return (patternLog += getPatternLogSystem(key, 5));
    }
    if (isEqual(key, 'reqUserId')) {
      return (patternLog += getPatternLogSystem(key, 5));
    }
    if (isEqual(key, 'callerAddress')) {
      return (patternLog += getPatternLogSystem(key, 21));
    }
    patternLog += `[\${this.${key}}] `;
  });
  const infoKey = [
    'method',
    'callPoint',
    'protocol',
    'status',
    'responseTime',
    'userAgent',
  ];
  infoKey.map((key) => {
    if (logMessage[key] == undefined) return;
    if (key == 'responseTime') {
      patternLog += `- \${this.${key}}ms `;
    }
    patternLog += `- \${this.${key}} `;
  });
  const log = new Function(`return \`${patternLog}\`;`).call(parameter);
  if (!message) return log;
  const logItemMes = isObject(message) ? JSON.stringify(message) : message;
  return log + ' ' + logItemMes;
};

const createDigest = (encodedData, format = undefined): any => {
  const secret = process.env.HASH_VERIFY_SECRRET_KEY;
  return crypto.createHmac('sha256', secret).update(encodedData).digest(format);
};

const encodeVerifyKey = (sourceData) => {
  const json = JSON.stringify(sourceData);
  const encodedData = Buffer.from(json).toString('hex');
  return `${encodedData}.${createDigest(encodedData, 'hex')}`;
};

const decodeVerifyKey = (value) => {
  const [encodedData, sourceDigest] = value.split('.');
  if (!encodedData || !sourceDigest) throw new Error('invalid value(s)');
  const json = Buffer.from(encodedData, 'hex').toString('utf8');
  const decodedData = JSON.parse(json);
  const checkDigest = createDigest(encodedData);
  const digestsEqual = crypto.timingSafeEqual(
    Buffer.from(sourceDigest, 'hex'),
    checkDigest,
  );
  if (!digestsEqual) throw new Error('invalid value(s)');
  return decodedData;
};

const getQueryPaging = ({ page = 1, limit = 20 }) => {
  const skip = page - 1 > 0 ? (page - 1) * limit : 0;
  const take = limit;
  return [skip, take];
};

const getArrNumber = (length) => {
  const arrayNum = Array.from({ length: Math.floor(length) }, (_, i) => i);
  arrayNum.shift();
  return arrayNum;
};

const getArrYear = (startYear, endDate) => {
  return Array.from(
    { length: (endDate - startYear + 1) / 1 },
    (_, index) => startYear + index * 1,
  );
};

const formatDate = (date) => {
  return moment(date).format('YYYY-MM-DD HH:mm:ss');
};

const compareDate = (dateOne, dateTwo) => {
  return formatDate(dateOne) == formatDate(dateTwo);
};

const betweenOfDay = (date) => {
  return {
    startDate: moment(date).startOf('day').format('YYYY-MM-DD HH:mm:ss'),
    endDate: moment(date).endOf('day').format('YYYY-MM-DD HH:mm:ss'),
  };
};

const betweenOfMonth = (date) => {
  return {
    startDate: moment(date)
      .startOf('month')
      .startOf('day')
      .format('YYYY-MM-DD HH:mm:ss'),
    endDate: moment(date)
      .endOf('month')
      .endOf('day')
      .format('YYYY-MM-DD HH:mm:ss'),
  };
};

const interpolate = (str, obj) => {
  return str.replace(/\${([^}]+)}/g, (_, prop) => obj[prop]);
};

const generateArrMonth = () => {
  const template = [];
  const size = 12;
  for (let index = 0; index < size; index++) {
    const date = moment()
      .subtract(size - 1 - index, 'months')
      .startOf('month')
      .startOf('day')
      .format('MM/YYYY');
    template.push(date);
  }
  return template;
};

export {
  generateRequestId,
  getLogMessage,
  response,
  encodeVerifyKey,
  decodeVerifyKey,
  getUserAgent,
  getToken,
  parseHash,
  getQueryPaging,
  getArrNumber,
  getArrYear,
  formatDate,
  compareDate,
  betweenOfDay,
  interpolate,
  generateArrMonth,
  betweenOfMonth,
};
