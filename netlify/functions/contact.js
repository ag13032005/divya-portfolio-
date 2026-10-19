const { Client } = require('pg');

const DATABASE_URL = process.env.DATABASE_URL || "postgresql://netlifydb_owner:npg_5goAxkOK0yXU@ep-dark-paper-b5bf5cgt.c-7.us-east-2.db.netlify.com/netlifydb?sslmode=require";

exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  let data = {};
  try {
    const contentType = event.headers['content-type'] || event.headers['Content-Type'] || '';
    if (contentType.includes('application/json')) {
      data = JSON.parse(event.body || '{}');
    } else {
      const params = new URLSearchParams(event.body || '');
      data = Object.fromEntries(params.entries());
    }
  } catch (err) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: 'Failed to parse request body', details: err.message })
    };
  }

  const name = (data.name || '').trim();
  const email = (data.email || '').trim();
  const projectType = (data.projectType || data['project-type'] || '').trim();
  const message = (data.message || '').trim();

  if (!name || !email || !message) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: 'Name, email, and message are required fields.' })
    };
  }

  const client = new Client({
    connectionString: DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();

    // Auto-create table if needed
    await client.query(`
      CREATE TABLE IF NOT EXISTS contact_submissions (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        project_type VARCHAR(100),
        message TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Insert record
    const result = await client.query(
      `INSERT INTO contact_submissions (name, email, project_type, message) VALUES ($1, $2, $3, $4) RETURNING id, created_at;`,
      [name, email, projectType, message]
    );

    await client.end();

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Thank you! Your message has been saved to the database.',
        id: result.rows[0].id,
        created_at: result.rows[0].created_at
      })
    };
  } catch (dbErr) {
    console.error('Database connection / query error:', dbErr);
    try {
      await client.end();
    } catch (_) {}

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Database connection failed',
        details: dbErr.message
      })
    };
  }
};
