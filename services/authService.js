const { verify, sign } = require('jsonwebtoken');
const jwtSecret =
  '53PPTX06%iZFp^NDD7U2W3gdQk%qposR0!B@p1onKz33fRVPKYx#HRAeLY*6kigyMN^s1OZ2P7!t@lu6p%3KvQQfd3hjWTPSPcH5';

const isTokenValid = token => {
  if (token === undefined || !token.startsWith('Bearer ')) {
    return false;
  }
  const encodedJwt = token.split(' ')[1];
  try {
    verify(encodedJwt, jwtSecret);
  } catch (e) {
    return false;
  }

  return true;
};

const generateToken = () => {
  return 'Bearer ' + sign({ data: 'foobar' }, jwtSecret, { expiresIn: '15m' });
};

module.exports = {
  isTokenValid,
  generateToken
};
