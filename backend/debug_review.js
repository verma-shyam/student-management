const pool = require('./config/db');
(async () => {
  try {
    const t = await pool.query("SELECT table_schema, table_name FROM information_schema.tables WHERE table_schema NOT IN ('information_schema','pg_catalog') ORDER BY table_schema, table_name");
    console.log('tables', t.rows);
    const c = await pool.query("SELECT table_schema, table_name, column_name, data_type, is_nullable FROM information_schema.columns WHERE table_name='admin_reviews' ORDER BY table_schema, table_name, ordinal_position");
    console.log('admin_reviews columns', c.rows);
    try {
      const ins = await pool.query('INSERT INTO admin_reviews(student_id,rating,review,feedback) VALUES($1,$2,$3,$4) RETURNING *', [6, 0, '', 'test feedback']);
      console.log('insert result', ins.rows);
    } catch (e) {
      console.error('insert error', e.message);
      console.error(e.stack);
    }
  } catch (e) {
    console.error('error', e.message);
    console.error(e.stack);
  } finally {
    pool.end();
  }
})();
