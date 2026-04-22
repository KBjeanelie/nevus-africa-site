const bcrypt = require('bcryptjs');
const password = 'root@2020';
bcrypt.hash(password, 10, (err, hash) => {
  console.log('Hash for root@2020:', hash);
});
