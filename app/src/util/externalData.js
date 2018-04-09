/**
 * Funcionality for handling external API calls
 */
import fetch from 'node-fetch';
import logger from './logger';

export const getCurrentData = async (link) => {
  try {
    const data = await fetch(link);
    const stringifiedData = await data.text();
    return stringifiedData;
  } catch (e) {
    logger.write(e.message);
  }
  return null;
};

export default null;
