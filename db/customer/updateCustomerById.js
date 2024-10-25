import { getDBConnection } from '../dbConnector.js';

/**
 * Function to update an customer by id in the database
 * @param {number} customer_id id of the customer to update
 * @param {Object} customer customer object containing updated details
 * @returns {Promise<Object>} updated customer object
 */
export async function updateCustomerById(customer_id, customer) {
  console.log('update customer by id', customer_id, customer);

  const db = await getDBConnection();

  const sql = `
      UPDATE customer
      SET
        legal_entity_name = @legal_entity_name,
        country = @country,
        address = @address,
        industry = @industry,
        type = @type,
        status = @status,
        date_created = @date_created
      WHERE
        customer_id = @customer_id;
    `;

  const params = {
    '@legal_entity_name': customer.legal_entity_name,
    '@country': customer.country,
    '@address': customer.address,
    '@industry': customer.industry,
    '@type': customer.type,
    '@status': customer.status,
    '@date_created': customer.date_created,
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

export default updateCustomerById;
