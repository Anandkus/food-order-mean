const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwtProvider = require("../confiq/jwtProvider");
// User registration function
const userRegistration = async (req, res) => {
  const { fullname, email, mobile, password, role } = req.body;
  // Basic input validation (ensure all fields are provided)
  if (!fullname || !email || !mobile || !password) {
    return res.status(400).send({ message: "All fields are required!" });
  }

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).send({ message: "User already exists!" }); // 409 Conflict
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 8);
    // Create a new user in the database
    const newUser = await User.create({
      email,
      mobile,
      password: hashedPassword,
      fullname,
      role
    });

    // Return success message and the created user (without password)
    // const { password: _, ...userWithoutPassword } = newUser.toObject(); // Remove password from response
    return res.status(201).send({
      message: "Registration successful!",
      // user: userWithoutPassword // Return user data without password
    });

  } catch (error) {
    console.error("Error during registration:", error);
    return res.status(500).send({ error: error.message }); // General server error
  }
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send({ message: "All fields are required!" });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({ message: "User not found!" });
    }
    // Check if the user is an admin, and reject login for admins via this route
    if (user.role === 'admin') {
      return res.status(403).send({ message: "Admins must use the admin login route!" });
    }
    const isPassword = await bcrypt.compare(password, user.password)
    if (!isPassword) {
      return res.status(400).send({ message: "Invalid credentials!" });
    }
    //to send user data but without password 
    const { password: _, ...userDataWithoutPassword } = user.toObject()
    const token = jwtProvider.generateToken(user._id);
    return res.status(200).send({
      message: "Login successful!",
      token,
      user: userDataWithoutPassword
    })
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
}

module.exports = { userRegistration, userLogin };
