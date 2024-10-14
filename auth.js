const NodeCache = require("node-cache");
const myCache = new NodeCache();

const fetchData = async (key, fetchFunction) => {
  let value = myCache.get(key);
  if (value) {
    return Promise.resolve(value);
  } else {
    try {
      const data = await fetchFunction();
      myCache.set(key, data);
      return data;
    } catch (error) {
      console.error("Error fetching data with key:", key, error);
      throw error;
    }
  }
}

const getCachedData = async () => {
  try {
    const data = await fetchData('uniqueKeyForData', async () => {
      return await getDataFromAPI();
    });
    console.log(data);
  } catch (error) {
    console.error("Failed to fetch data", error);
  }
};

async function getDataFromAPI() {
  try {
  } catch (error) {
    console.error("Error in getDataFromAPI", error);
    throw error;
  }
}