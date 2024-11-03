import pg from 'pg';

const TABLES = {
  users: {
    id: 'INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY',
    full_name: 'VARCHAR(50) NOT NULL',
    username: 'VARCHAR(50) NOT NULL UNIQUE',
    password: 'VARCHAR(128) NOT NULL',
    create_date: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP',
    is_member: 'BOOLEAN DEFAULT FALSE',
    is_admin: 'BOOLEAN DEFAULT FALSE',
  },
  posts: {
    id: 'INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY',
    user_id: 'INTEGER NOT NULL',
    title: 'VARCHAR(100) NOT NULL',
    content: 'VARCHAR(500) NOT NULL',
    create_date: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP',
    foreign_keys:
      'FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL',
  },
};

/**
 * Generate CREATE TABLE query. Make it easier to change during development
 * @param {Object} tables Object with key as table name value as nested object with key as column name and value as sql data type
 * @returns {Array<string>} Array of sql query string
 */
function generateTableQueries(tables) {
  const queries = [];

  for (const [tableName, columns] of Object.entries(tables)) {
    const columnQuery = Object.entries(columns)
      .filter(([key]) => key !== 'foreign_keys')
      .map(([colName, colType]) => `${colName} ${colType}`)
      .join(', ');

    const foreignKeys = columns.foreign_keys ? `, ${columns.foreign_keys}` : '';
    queries.push(
      `CREATE TABLE IF NOT EXISTS ${tableName} (${columnQuery}${foreignKeys});`,
    );
  }

  return queries;
}

async function _main() {
  try {
    const client = new pg.Client({
      connectionString: process.argv[2],
    });

    await client.connect();
    for (const q of generateTableQueries(TABLES)) {
      await client.query(q);
    }
    await client.end();

    console.log('SUCCESS');
  } catch (error) {
    console.error(error);
  }
}

_main();
