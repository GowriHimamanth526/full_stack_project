// Enrollment Controller
const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');
const User = require('../models/User');
const Payment = require('../models/Payment');

// Enroll in course
exports.enrollCourse = async (req, res) => {
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

    // Create enrollment
    const enrollment = new Enrollment({
      student: studentId,
      course: courseId,
      totalLessons: course.modules?.length || 0,
    });

    await enrollment.save();

    // Update course enrollment count and add student
    course.enrollmentCount += 1;
    course.students.push(studentId);
    await course.save();

    // Update user's enrolled courses
    await User.findByIdAndUpdate(
      studentId,
      { $push: { enrolledCourses: courseId } },
      { new: true }
    );

    res.status(201).json({
      success: true,
      message: 'Enrolled in course successfully',
      data: enrollment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error enrolling in course',
      error: error.message,
    });
  }
};

// Get student's enrollments
exports.getStudentEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ student: req.user.userId })
      .populate('course', 'title thumbnail price category instructor')
      .sort({ enrolledAt: -1 });

    res.status(200).json({
      success: true,
      data: enrollments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching enrollments',
      error: error.message,
    });
  }
};

// Get course enrollments (Instructor only)
exports.getCourseEnrollments = async (req, res) => {
  try {
    const { courseId } = req.params;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found.',
      });
    }

    // Check if user is the instructor
    if (course.instructor.toString() !== req.user.userId) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view enrollments.',
      });
    }

    const enrollments = await Enrollment.find({ course: courseId })
      .populate('student', 'firstName lastName email')
      .sort({ enrolledAt: -1 });

    res.status(200).json({
      success: true,
      data: enrollments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching enrollments',
      error: error.message,
    });
  }
};

// Update progress
exports.updateProgress = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { progress, completedModules, currentModule, timeSpent } = req.body;

    const enrollment = await Enrollment.findOne({
      student: req.user.userId,
      course: courseId,
    });

    if (!enrollment) {
      return res.status(404).json({
        success: false,
        message: 'Enrollment not found.',
      });
    }

    if (progress !== undefined) enrollment.progress = progress;
    if (completedModules) enrollment.completedModules = completedModules;
    if (currentModule !== undefined) enrollment.currentModule = currentModule;
    if (timeSpent !== undefined) enrollment.timeSpent += timeSpent;
    enrollment.lastAccessedAt = new Date();

    // Check if course is completed
    if (progress === 100 && enrollment.status !== 'completed') {
      enrollment.status = 'completed';
      enrollment.completedAt = new Date();
      enrollment.certificateIssued = true;
      enrollment.certificateIssuedAt = new Date();
    }

    await enrollment.save();

    res.status(200).json({
      success: true,
      message: 'Progress updated successfully',
      data: enrollment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating progress',
      error: error.message,
    });
  }
};

// Get enrollment details
exports.getEnrollmentDetails = async (req, res) => {
  try {
    const { courseId } = req.params;

    const enrollment = await Enrollment.findOne({
      student: req.user.userId,
      course: courseId,
    }).populate('course');

    if (!enrollment) {
      return res.status(404).json({
        success: false,
        message: 'Enrollment not found.',
      });
    }

    res.status(200).json({
      success: true,
      data: enrollment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching enrollment',
      error: error.message,
    });
  }
};
