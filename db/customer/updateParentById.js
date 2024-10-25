import { getDBConnection } from '../dbConnector.js';

/**
 * Function to update an customer's owner id in the database
 * @param {number} customer_id id of the customer to update
 * @param {number} parent_entity_id id of the parent entity to update
 * @returns {Promise<Object>} updated customer object
 */
export async function updateParentById(customer_id, parent_entity_id) {
  console.log('update customer parent entity', customer_id, parent_entity_id);

  const db = await getDBConnection();

  const sql = `
      UPDATE customer
      SET
        parent_entity_id = @parent_entity_id
      WHERE
        customer_id = @customer_id;
    `;

  const params = {
    '@parent_entity_id': parent_entity_id,
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

export default updateParentById;
