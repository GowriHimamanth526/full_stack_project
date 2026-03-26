// Payment Controller
const Payment = require('../models/Payment');
const Course = require('../models/Course');
const Enrollment = require('../models/Enrollment');
const User = require('../models/User');

// Initiate payment (Simulated)
exports.initiatePayment = async (req, res) => {
  try {
    const { courseId } = req.params;
    const studentId = req.user.userId;

    // Check if course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found.',
      });
    }

    // Check if already enrolled
    const existingEnrollment = await Enrollment.findOne({
      student: studentId,
      course: courseId,
    });

    if (existingEnrollment) {
      return res.status(400).json({
        success: false,
        message: 'You are already enrolled in this course.',
      });
    }

    // Create payment record
    const transactionId = `TXN_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const payment = new Payment({
      transactionId,
      student: studentId,
      course: courseId,
      amount: course.price,
      currency: course.currency,
      status: 'pending',
      paymentMethod: 'simulation',
    });

    await payment.save();

    res.status(201).json({
      success: true,
      message: 'Payment initiated',
      data: payment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error initiating payment',
      error: error.message,
    });
  }
};

// Process payment (Simulated Success)
exports.processPayment = async (req, res) => {
  try {
    const { transactionId } = req.params;

    const payment = await Payment.findOne({ transactionId });
    if (!payment) {
      return res.status(404).json({
        success: false,
        message: 'Payment not found.',
      });
    }

    if (payment.status !== 'pending') {
      return res.status(400).json({
        success: false,
        message: 'Payment already processed.',
      });
    }

    // Simulate successful payment
    payment.status = 'successful';
    payment.processedAt = new Date();
    payment.gatewayTransactionId = `STRIPE_${Date.now()}`;

    await payment.save();

    // Create enrollment
    const enrollment = new Enrollment({
      student: payment.student,
      course: payment.course,
      status: 'active',
    });

    await enrollment.save();

    // Update course
    const course = await Course.findByIdAndUpdate(
      payment.course,
      {
        $push: { students: payment.student },
        $inc: { enrollmentCount: 1 },
      },
      { new: true }
    );

    // Update user
    await User.findByIdAndUpdate(
      payment.student,
      { $push: { enrolledCourses: payment.course } },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: 'Payment processed successfully and course enrolled',
      data: {
        payment,
        enrollment,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error processing payment',
      error: error.message,
    });
  }
};

// Verify payment status
exports.verifyPayment = async (req, res) => {
  try {
    const { transactionId } = req.params;

    const payment = await Payment.findOne({ transactionId })
      .populate('student', 'firstName lastName')
      .populate('course', 'title');

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: 'Payment not found.',
      });
    }

    res.status(200).json({
      success: true,
      data: payment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error verifying payment',
      error: error.message,
    });
  }
};

// Get student's payment history
exports.getPaymentHistory = async (req, res) => {
  try {
    const payments = await Payment.find({ student: req.user.userId })
      .populate('course', 'title thumbnail')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: payments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching payment history',
      error: error.message,
    });
  }
};

// Refund payment
exports.refundPayment = async (req, res) => {
  try {
    const { transactionId } = req.params;

    const payment = await Payment.findOne({ transactionId });
    if (!payment) {
      return res.status(404).json({
        success: false,
        message: 'Payment not found.',
      });
    }

    if (payment.status !== 'successful') {
      return res.status(400).json({
        success: false,
        message: 'Only successful payments can be refunded.',
      });
    }

    payment.status = 'refunded';
    payment.refundedAt = new Date();

    await payment.save();

    // Remove enrollment
    await Enrollment.deleteOne({
      student: payment.student,
      course: payment.course,
    });

    // Update course
    await Course.findByIdAndUpdate(
      payment.course,
      {
        $pull: { students: payment.student },
        $inc: { enrollmentCount: -1 },
      }
    );

    // Update user
    await User.findByIdAndUpdate(
      payment.student,
      { $pull: { enrolledCourses: payment.course } }
    );

    res.status(200).json({
      success: true,
      message: 'Payment refunded successfully',
      data: payment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error refunding payment',
      error: error.message,
    });
  }
};
