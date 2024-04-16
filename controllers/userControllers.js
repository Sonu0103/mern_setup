// Make a function (logic)

// 1. Creating user function
const createUser = (req, res) => {
  // 1. Get data from the user(fname, lname, email, pp)
  console.log(req.body);
  // #. Destructuring
  // 2. validation
  // Try - Catch (Error Handling)
  // 2.1 if not : Send the response and stop the process
  // 3. if proper data
  // 4. Check existing user
  // 4.1 if yes : Srend the response and stop the process
  // if not:
  // 5. Save in the database
  // 6. Sdend the sucesss response
};

// Expoting
module.exports = { createUser };
