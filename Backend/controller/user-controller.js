import userModel from "../models/user-model.js";

// Register Controller
export const registerController = async (req, res) => {
  try {
    const {
      name,
      surname,
      email,
      password,
      address,
      city,
      country,
      phone,
      answer,
    } = req.body;

    // Validation
    const missingField = [
      name,
      surname,
      email,
      password,
      address,
      city,
      country,
      phone,
      answer,
    ].find((value, index) => !value && Object.keys(req.body)[index]);

    if (missingField) {
      return res.status(400).json({
        success: false,
        message: `${missingField.charAt(0).toUpperCase() + missingField.slice(1)} is required`,
      });
    }

    // Check existing user
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email is already taken",
      });
    }

    // Create user
    const user = await userModel.create({
      name,
      surname,
      email,
      password,
      address,
      city,
      country,
      phone,
      answer,
    });
    res.status(201).json({
      success: true,
      message: "Registration successful, please login",
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error in Register API",
      error,
    });
  }
};

// Login Controller
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide both email and password",
      });
    }

    // Check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Generate token
    const token = user.generateToken();
    res
      .status(200)
      .cookie("token", token, {
        expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        sameSite: "Strict",
      })
      .json({
        success: true,
        message: "Login successful",
        token,
        user,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error in Login API",
      error,
    });
  }
};

// Get User Profile Controller
export const getUserProfileController = async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id).select("-password");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "User profile fetched successfully",
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error in Profile API",
      error,
    });
  }
};

// Logout Controller
export const logoutController = async (req, res) => {
  try {
    res
      .status(200)
      .cookie("token", "", {
        expires: new Date(Date.now()),
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        sameSite: "Strict",
      })
      .json({
        success: true,
        message: "Logout successful",
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error in Logout API",
      error,
    });
  }
};

// Update User Profile Controller
export const updateProfileController = async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id);
    const { name, email, address, city, country, phone } = req.body;

    if (name) user.name = name;
    if (email) user.email = email;
    if (address) user.address = address;
    if (city) user.city = city;
    if (country) user.country = country;
    if (phone) user.phone = phone;

    await user.save();
    res.status(200).json({
      success: true,
      message: "User profile updated",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error in update profile API",
      error,
    });
  }
};

// Update User Password Controller
export const updatePasswordController = async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id);
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Please provide both old and new password",
      });
    }

    const isMatch = await user.comparePassword(oldPassword);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid old password",
      });
    }

    user.password = newPassword;
    await user.save();
    res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error in update password API",
      error,
    });
  }
};

// Forgot Password Controller
export const passwordResetController = async (req, res) => {
  try {
    const { email, newPassword, answer } = req.body;

    if (!email || !newPassword || !answer) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    const user = await userModel.findOne({ email, answer });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Invalid user or answer",
      });
    }

    user.password = newPassword;
    await user.save();
    res.status(200).json({
      success: true,
      message: "Password has been reset, please login",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error in password reset API",
      error,
    });
  }
};
