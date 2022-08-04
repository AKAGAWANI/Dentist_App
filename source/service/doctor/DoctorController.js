const Response  = require("../../commons/responses/EcomResponseManager");
const logger    = require("../../commons/logger/logger");
const service   = require("./DoctorService");
const mongoose  = require('mongoose');


function Controller() {}

/*****************************  DOCTOR'S APIS *******************************/
//adding doctors
Controller.prototype.add = async function (req, res, next) {
  try {
    //Validating problem and test details
    let { _id, firstName, lastName, location, qualifications, problem, test } = req.body;
    let temp = [];
    //checking problem array
    let arrayLength = problem.length;
    if (arrayLength) {
      for (let i = 0; i < arrayLength; i++) {
        let isProblemExist = await service.findProblemById(problem[i]._id);
        if (isProblemExist) temp.push(problem[i]);
      }
    }
    problem = temp;
    temp = [];
    //checking test array
    arrayLength = test.length;
    if (arrayLength) {
      for (let i = 0; i < arrayLength; i++) {
        let isTestExist = await service.findTestById({ _id: test[i]._id });
        if (isTestExist) temp.push(test[i]);
      }
    }
    test = temp;

    //Adding doctors information
    let isDoctorAdded = await service.addDetails(
      { _id, firstName, lastName, location, qualifications, problem, test },
      "Doctor"
    );

    return res.status(Response.success.Ok.code).json(
      Response.success.Ok.json({
        data: {
          firstName: isDoctorAdded.firstName,
          lastName: isDoctorAdded.lastName,
          location: isDoctorAdded.location,
          qualifications: isDoctorAdded.qualifications,
          problem: isDoctorAdded.problem,
          test: isDoctorAdded.test,
        },
      })
    );
  } catch (e) {
    console.log(e);
    logger.error(e.message);
    res.status(Response.error.InternalError.code).json(Response.error.InternalError.json());
  }
};

//getting doctors
Controller.prototype.getCityDoctors=async function (req, res, next) {
  try {
    let city = req.params.city;
    let doctors = await service.getDoctorByCity(city);
    return res.status(Response.success.Ok.code).json(
      Response.success.Ok.json({
        data: doctors,
      })
    );
  } catch (e) {
    logger.error(e.message);
    console.log(e);
    res.status(Response.error.InternalError.code).json(Response.error.InternalError.json());
  }
};

/******************************  PROBLEMS'S APIS *******************************/
//Adding problems
Controller.prototype.problemAdd = async function (req, res, next) {
  try {
    //Getting details from the body
    let { _id, problemName, displayName, icons } = req.body;

    let isCreated = await service.addDetails({ _id, problemName, displayName, icons }, "Problem");
    if (isCreated) {
      return res.status(Response.success.Ok.code).json(
        Response.success.Ok.json({
          data: {
            problemId: isCreated._id,
            problemName: isCreated.problemName,
            icons: isCreated.icons,
            displayName: isCreated.displayName,
          },
        })
      );
    }
  } catch (e) {
    logger.error(e.message);
    console.log(e);
    res.status(Response.error.InternalError.code).json(Response.error.InternalError.json());
  }
};

//Listing all problems
Controller.prototype.getProblems = async function (req, res, next) {
  try {
    let allProblem = await service.getAllProblems("Problem");
    return res.status(Response.success.Ok.code).json(
      Response.success.Ok.json({
        data: allProblem,
      })
    );
  } catch (e) {
    logger.error(e.message);
    console.log(e);
    res.status(Response.error.InternalError.code).json(Response.error.InternalError.json());
  }
};

//List one problem
Controller.prototype.getProblem = async function (req, res, next) {
  try {
    let id = req.params.id;
    let oneProblem = await service.findProblemById(id, "Problem");
    return res.status(Response.success.Ok.code).json(
      Response.success.Ok.json({
        data: oneProblem,
      })
    );
  } catch (e) {
    logger.error(e.message);
    console.log(e);
    res.status(Response.error.InternalError.code).json(Response.error.InternalError.json());
  }
};

/*****************  TEST'S APIS *********************/
//Adding Tests
Controller.prototype.testAdd = async function (req, res, next) {
  try {
    //Getting details from the body
    let { testName, displayName, icons, description, _id } = req.body;

    let isCreated = await service.addDetails(
      { _id, testName, displayName, icons, description },
      "Test"
    );
    if (isCreated) {
      return res.status(Response.success.Ok.code).json(
        Response.success.Ok.json({
          data: {
            testId: isCreated._id,
            testName: isCreated.problemName,
            icons: isCreated.icons,
            displayName: isCreated.displayName,
            description: isCreated.description,
          },
        })
      );
    }
  } catch (e) {
    console.log(e);
    logger.error(e.message);
    res.status(Response.error.InternalError.code).json(Response.error.InternalError.json());
  }
};

//Listing all tests
Controller.prototype.getTests = async function (req, res, next) {
  try {
    let allTests = await service.getAllTests();
    return res.status(Response.success.Ok.code).json(
      Response.success.Ok.json({
        data: allTests,
      })
    );
  } catch (e) {
    logger.error(e.message);
    console.log(e);
    res.status(Response.error.InternalError.code).json(Response.error.InternalError.json());
  }
};

//List one test
Controller.prototype.getTest = async function (req, res, next) {
  try {
    let id = req.params.id;
    let oneTest = await service.findTestById(id, "Test");
    return res.status(Response.success.Ok.code).json(
      Response.success.Ok.json({
        data: oneTest,
      })
    );
  } catch (e) {
    logger.error(e.message);
    console.log(e);
    res.status(Response.error.InternalError.code).json(Response.error.InternalError.json());
  }
};

/******************************  PROBLEMS'S APIS *******************************/
//Adding Reviews

Controller.prototype.addReview = async function(req,res, next){
  try {
    //Getting review details from body
    let {doctorId, reviewDescription, reviewRating, reviewedUserId, reviewedUserName, reviewedUserMobile, reviewedUserMail, reviewedDate } = req.body;
    let reviewObj = {};
    reviewObj = {
      _id : new mongoose.Types.ObjectId().toHexString(),
      reviewDescription: reviewDescription,
      reviewRating: reviewRating,
      reviewedUserId: reviewedUserId,
      reviewedUserName:reviewedUserName,
      reviewedUserMail:reviewedUserMail,
      reviewedUserMobile:reviewedUserMobile,
      reviewedDate: Date.now(reviewedDate),
      comments:[ ]
    }

    let data = await service.findDoctorByIdAndAddReview(doctorId,reviewObj);
    return res.status(Response.success.Ok.code).json(
      Response.success.Ok.json({
        data: data,
      })
    );
  } catch (e) {
    logger.error(e.message);
    console.log(e);
    res.status(Response.error.InternalError.code).json(Response.error.InternalError.json());
  }

}


//Listing all the reviews for a particular doctor
Controller.prototype.getReviews = async function (req, res, next) {
  try {
    let id = req.params.doctorId;
    // console.log(id);
    let allReviews = await service.findAllReviews(id);
    return res.status(Response.success.Ok.code).json(
      Response.success.Ok.json({
        data: allReviews,
      })
    );
  } catch (e) {
    logger.error(e.message);
    console.log(e);
    res.status(Response.error.InternalError.code).json(Response.error.InternalError.json());
  }
};

//Adding Comment for a review

Controller.prototype.addComment = async function(req, res, next){
  try {
    //Getting review details from body
    let {doctorId, reviewId, commentDescription, commentedUserId, commentedUserName, commentedUserMail, commentedDate } = req.body;
    let commentObj = {};
    commentObj = {
      _id : new mongoose.Types.ObjectId().toHexString(),
      commentDescription: commentDescription,
      commentedUserId: commentedUserId,
      commentedUserName: commentedUserName,
      commentedUserMail: commentedUserMail,
      commentedDate: Date.now(commentedDate)
    }

    let data = await service.findReviewByIdAndAddComment(doctorId, reviewId, commentObj);
    return res.status(Response.success.Ok.code).json(
      Response.success.Ok.json({
        data: data,
      })
    );
  } catch (e) {
    logger.error(e.message);
    console.log(e);
    res.status(Response.error.InternalError.code).json(Response.error.InternalError.json());
  }

}

Controller.prototype.getReviewComments = async function(req, res, next){
  try{
    let doctorId = req.params.doctorId;
    let reviewId = req.params.reviewId;
    // console.log(id);
    let allReviews = await service.findAllReviewComments(doctorId, reviewId);
    return res.status(Response.success.Ok.code).json(
      Response.success.Ok.json({
        data: allReviews,
      })
    );

  }catch(e){
    logger.error(e.message);
    console.log(e);
    res.status(Response.error.InternalError.code).json(Response.error.InternalError.json());
  }
}

module.exports = new Controller();
