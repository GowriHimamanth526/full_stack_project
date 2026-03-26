// Course Controller
const Course = require('../models/Course');
const User = require('../models/User');
const Enrollment = require('../models/Enrollment');

// Create course (Instructor only)
exports.createCourse = async (req, res) => {
  try {
    const { title, description, shortDescription, category, level, price, modules, duration, learningOutcomes } = req.body;

    const course = new Course({
      title,
      description,
      shortDescription,
      category,
      level,
      price,
      modules,
      duration,
      learningOutcomes,
      instructor: req.user.userId,
    });

    await course.save();

    res.status(201).json({
      success: true,
      message: 'Course created successfully',
      data: course,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating course',
      error: error.message,
    });
  }
};

// Get all courses
exports.getAllCourses = async (req, res) => {
  try {
    const { category, level, search, page = 1, limit = 10 } = req.query;

    // Build filter
    const filter = { isPublished: true };
    if (category) filter.category = category;
    if (level) filter.level = level;
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    // Calculate pagination
    const skip = (page - 1) * limit;

    const courses = await Course.find(filter)
      .populate('instructor', 'firstName lastName expertise')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Course.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: courses,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching courses',
      error: error.message,
    });
  }
};

// Get course by ID
exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId)
      .populate('instructor', 'firstName lastName bio expertise')
      .populate('reviews.studentId', 'firstName lastName')
      .exec();

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found.',
      });
    }

    res.status(200).json({
      success: true,
      data: course,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching course',
      error: error.message,
    });
  }
};

// Update course (Instructor only)
exports.updateCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found.',
      });
    }

    // Check if user is the course instructor
    if (course.instructor.toString() !== req.user.userId) {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to update this course.',
      });
    }

    // Update fields
    const { title, description, category, level, price, modules, duration, learningOutcomes, isPublished } = req.body;
    if (title) course.title = title;
    if (description) course.description = description;
    if (category) course.category = category;
    if (level) course.level = level;
    if (price !== undefined) course.price = price;
    if (modules) course.modules = modules;
    if (duration) course.duration = duration;
    if (learningOutcomes) course.learningOutcomes = learningOutcomes;
    if (isPublished !== undefined) course.isPublished = isPublished;

    await course.save();

    res.status(200).json({
      success: true,
      message: 'Course updated successfully',
      data: course,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating course',
      error: error.message,
    });
  }
};

// Delete course (Instructor only)
exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found.',
      });
    }

    // Check if user is the course instructor
    if (course.instructor.toString() !== req.user.userId) {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to delete this course.',
      });
    }

    await Course.findByIdAndDelete(req.params.courseId);

    res.status(200).json({
      success: true,
      message: 'Course deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting course',
      error: error.message,
    });
  }
};

// Get instructor's courses
exports.getInstructorCourses = async (req, res) => {
  try {
    const courses = await Course.find({ instructor: req.user.userId });

    res.status(200).json({
      success: true,
      data: courses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching courses',
      error: error.message,
    });
  }
};

// Add review to course
exports.addReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;

    const course = await Course.findById(req.params.courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found.',
      });
    }

    // Check if student is enrolled
    const enrollment = await Enrollment.findOne({
      student: req.user.userId,
      course: req.params.courseId,
    });

    if (!enrollment) {
      return res.status(403).json({
        success: false,
        message: 'You must be enrolled in this course to leave a review.',
      });
    }

    // Add review
    const review = {
      studentId: req.user.userId,
      rating,
      comment,
    };

    course.reviews.push(review);

    // Update rating
    const totalRating = course.reviews.reduce((sum, r) => sum + r.rating, 0);
    course.rating = totalRating / course.reviews.length;

    await course.save();

    res.status(201).json({
      success: true,
      message: 'Review added successfully',
      data: course,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error adding review',
      error: error.message,
    });
  }
};
