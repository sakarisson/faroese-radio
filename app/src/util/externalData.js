/**
 * Funcionality for handling external API calls
 */
import fetch from 'node-fetch';

export const getCurrentData = async (link) => {
  const data = await fetch(link);
  const stringifiedData = await data.text();
  return stringifiedData;
};

export default null;
