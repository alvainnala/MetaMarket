const NodeCache = require( "node-cache" );
const myCache = new NodeCache();

const fetchData = async (key, fetchFunction) => {
  const value = myCache.get(key);
  if (value) {
    return Promise.resolve(value);
  } else {
    const data = await fetchFunction();
    myCache.set(key, data);
    return data;
  }
}

const getCachedData = async () => {
  try {
    const data = await fetchData('uniqueKeyForData', async () => {
      return getDataFromAPI();
    });
    console.log(data);
  } catch (error) {
    console.error("Failed to fetch data", error);
  }
};