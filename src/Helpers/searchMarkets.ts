import axios from 'axios';
const searchMarkets = async function (queryString: string) {
  try {
    const userInfo = await axios.get(
      `${import.meta.env.VITE_API_ENDPOINT}/search/market/${queryString}`
    );
    return userInfo;
  } catch (e) {
    return null;
  }
};

export default searchMarkets;
