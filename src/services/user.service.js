const { User } = require("../models");
const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const bcrypt = require("bcryptjs");

// TODO: CRIO_TASK_MODULE_UNDERSTANDING_BASICS - Implement getUserById(id)
/**
 * Get User by id
 * - Fetch user object from Mongo using the "_id" field and return user object
 * @param {String} id
 * @returns {Promise<User>}
 */
 const getUserById = async (id) => {
      const result = await User.findOne({"_id":id});
      // console.log(result,"userById")
      return result;

  }; 


// TODO: CRIO_TASK_MODULE_UNDERSTANDING_BASICS - Implement getUserByEmail(email)

/**
 * Get user by email
 * - Fetch user object from Mongo using the "email" field and return user object
 * @param {string} email
 * @returns {Promise<User>}
 */
 const getUserByEmail = async (email) => {
    // try {
      const result = await User.findOne({ email });
      // console.log("result..",result);
      if(!result || result==null){
        throw new ApiError(httpStatus.UNAUTHORIZED, "Email not found");
      }
      return result;
    
  }; 

// TODO: CRIO_TASK_MODULE_UNDERSTANDING_BASICS - Implement createUser(user)

/**
 * Create a user
 *  - check if the user with the email already exists using `User.isEmailTaken()` method
 *  - If so throw an error using the `ApiError` class. Pass two arguments to the constructor,
 *    1. “200 OK status code using `http-status` library
 *    2. An error message, “Email already taken”
 *  - Otherwise, create and return a new User object
 *
 * @param {Object} userBody
 * @returns {Promise<User>}
 * @throws {ApiError}
 *
 * userBody example:
 * {
 *  "name": "crio-users",
 *  "email": "crio-user@gmail.com",
 *  "password": "usersPasswordHashed"
 * }
 *
 * 200 status code on duplicate email - https://stackoverflow.com/a/53144807
 */
 const createUser = async (user) => {
  const isEmailTaken = await User.isEmailTaken(user.email);
  if (isEmailTaken) {
    throw new ApiError(httpStatus.OK, "Email already taken");
  } else {
    // const hashedPassword = await bcrypt.hash(user.password, 10);
    // const newDoc = await User.create({ ...user, password: hashedPassword });
    const newDoc = await User.create(user);
    return newDoc;
  }
    // if(await User.isEmailTaken(user.email)){

        
    //     throw new ApiError(httpStatus.OK, "\"\"userId\"\" must be a valid mongo id")

    // }
    // if(!user.email){
    //   throw new ApiError(httpStatus.BAD_REQUEST, "\"\"email\"\" email is required")
    // }
    // if(!user.name){
    //   throw new ApiError(httpStatus.BAD_REQUEST, "\"\"name\"\" name is required")
    // }
    // if(!user.password){
    //   throw new ApiError(httpStatus.BAD_REQUEST, "\"\"password\"\" password is required")
    // }
    // const { name, email, password } = user;
    // try {
    //     const { name, email, password } = user;
    //   const newUser = new User({ name, email, password });
    //   const result = await newUser.save();
    //   return result;
    // } catch (error) {
    //   throw error;
    // }
    // const Createduser = await User.create({...user});
    // return Createduser
  };  


// TODO: CRIO_TASK_MODULE_CART - Implement getUserAddressById()
/**
 * Get subset of user's data by id
 * - Should fetch from Mongo only the email and address fields for the user apart from the id
 *
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getUserAddressById = async (id) => {
  const address = await User.findOne({_id: id}, { address:1, email:1 }); 
  // console.log('address..',address);
  return address;
};


/**
 * Set user's shipping address
 * @param {String} email
 * @returns {String}
 */
const setAddress = async (user, newAddress) => {
  user.address = newAddress;
  await user.save();

  return user.address;
};

module.exports = {
  getUserById,
  getUserByEmail,
  createUser,
  getUserAddressById,
  setAddress
};
