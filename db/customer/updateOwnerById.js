import { getDBConnection } from '../dbConnector.js';

/**
 * Function to update an customer's owner id in the database
 * @param {number} customer_id id of the customer to update
 * @param {number} owner_id id of the owner to update
 * @returns {Promise<Object>} updated customer object
 */
export async function updateOwnerById(customer_id, owner_id) {
  console.log('update customer owner', customer_id, owner_id);

  const db = await getDBConnection();

  const sql = `
      UPDATE customer
      SET
        owner_id = @owner_id
      WHERE
        customer_id = @customer_id;
    `;

  const params = {
    '@owner_id': owner_id,
    '@customer_id': customer_id,
  };

  try {
    const stmt = await db.prepare(sql);
    const result = await stmt.run(params);
    console.log('update', result);
    await stmt.finalize();
    return result;
  } catch (error) {
    console.error('Error updating customer by id:', error);
    throw error;
  } finally {
    db.close();
  }
}

export default updateOwnerById;
