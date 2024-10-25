import { getDBConnection } from '../dbConnector.js';

/**
 * Function to get customer by id from the database
 * @param {number} customer_id the customer id to search for.
 * @returns {Promise<Object>} an customer object
 */
export async function getCustomerById(customer_id) {
  console.log('get customer by id', customer_id);
  const db = await getDBConnection();

  const sql = `
    SELECT *
    FROM customer
    WHERE customer_id = @customer_id;
    `;

  const params = {
    '@customer_id': customer_id,
  };

  try {
    const stmt = await db.prepare(sql);
    const result = await stmt.get(params);
    await stmt.finalize();
    return result;
  } catch (error) {
    console.error('Error fetching customer by id:', error);
    throw error;
  } finally {
    await db.close();
  }
}

export default getCustomerById;
