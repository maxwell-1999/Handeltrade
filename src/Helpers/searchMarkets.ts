import axios from 'axios';
const searchMarkets = async function (queryString: string) {
  try {
    const userInfo = await axios.get(
      `https://api-production-4b67.up.railway.app/search/market/${queryString}`
    );
    return userInfo;
  } catch (e) {
    return null;
  }
};

export default searchMarkets;
