require('dotenv');
const errors = require('./error');

function getConfig({
  method,
  tags,
  summary,
  operationId,
  consumes,
  produces,
  successDescription,
  parameters,
  requestExamplePath,
  responseExamplePath
}) {
  return {
    [method]: {
      tags,
      summary,
      operationId,
      consumes: [consumes],
      produces: [produces],
      requestBody: requestExamplePath
        ? {
          required: true,
          content: {
            [consumes]: {
              schema: {
                type: 'object'
              },
              example: require(requestExamplePath)
            }
          }
        }
        : null,
      parameters: parameters ? require(parameters) : null,
      responses: {
        success: {
          successDescription,
          content: {
            [produces]: {
              examples: [
                {
                  summary: '200 - DDA APP',
                  value: require(responseExamplePath)
                }
              ]
            }
          }
        },
        error: {
          description: 'Error',
          content: {
            'application/json': {
              examples: errors
            }
          }
        }
      }
    }
  };
}

const swagger = {
  openapi: '3.0.3',
  info: {
    title: 'Gateway',
    description:
      'Updated: [20220629] | All req must have Authorization[:accessToken] in headers { exceptions: [/login/*] }',
    contact: {
      email: 'pranav.sinha@graymatter.co.in'
    },
    version: '3.0.0'
  },
  servers: [
    {
      name: 'DDA AWS',
      url: `http://13.232.208.184:9091`
    }
  ],
  tags: [
    {
      name: 'Logout',
      description: 'DDA : logout APIs'
    },
    {
      name: 'Login',
      description: 'DDA : login APIs'
    },
    {
      name: 'User',
      description: 'DDA : user/profile APIs'
    },
    {
      name: 'Doctor',
      description: 'DDA : doctor APIs'
    },
    {
      name: 'Problem',
      description: 'DDA : Problems APIs'
    },
    {
      name: 'Test',
      description: 'DDA : Tests APIs'
    },
    {
      name: 'Appointment',
      description: 'DDA : Appointment APIs'
    }
  ],
  paths: {
    '/logout': getConfig({
      method: 'put',
      tags: ['Logout'],
      summary:
        'Initiates logout process; revokes access and refresh token; pass both Authorization[:accessToken] and RefreshToken[:refreshToken] in headers',
      operationId: 'logout',
      produces: 'application/json',
      successDescription: 'Logout',
      responseExamplePath: '../sample-data/api/logout/signoff/success.json'
    }),
    //test
    '/terms/createTerms': {
      post: {
        tags: ['Terms and Condition'],
        summary: 'Creating Terms and Condition',
        operationId: 'termsandcondition',
        consumes: ['application/json'],
        produces: ['application/json'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object'
              },
              examples: {
                'Terms and Condition': {
                  summary: '200 - Terms and Condition',
                  value: require('../sample-data/api/terms/createTerms/request.json')
                }
              }
            }
          }
        },
        responses: {
          success: {
            description: 'Success',
            content: {
              'application/json': {
                examples: [
                  {
                    summary: '200 - GATEWAY',
                    value: require('../sample-data/api/terms/createTerms/success.json')
                  }
                ]
              }
            }
          },
          error: {
            description: 'Error',
            content: {
              'application/json': {
                examples: errors
              }
            }
          }
        }
      }
    },
    '/terms/getTerms': {
      get: {
        tags: ['Terms and Condition'],
        summary: 'Get Terms and Condition',
        operationId: 'TermsandCondition',
        responses: {
          success: {
            description: 'Success',
            content: {
              'application/json': {
                examples: [
                  {
                    summary: '200 - GATEWAY',
                    value: require('../sample-data/api/terms/getTerms/success.json')
                  }
                ]
              }
            }
          }
        }
      }
    },
    '/terms/acceptTerms': {
      patch: {
        tags: ['Terms and Condition'],
        summary: 'Accept Terms and Condition',
        operationId: 'termsandcondition',
        consumes: ['application/json'],
        produces: ['application/json'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object'
              },
              examples: {
                'Terms and Condition': {
                  summary: '200 - Terms and Condition',
                  value: require('../sample-data/api/terms/acceptTerms/request.json')
                }
              }
            }
          }
        }
      }
    },
    '/login/guest': {
      get: {
        tags: ['Login'],
        summary: 'Initiates login process for guest user',
        operationId: 'guest-login',
        consumes: ['application/json'],
        produces: ['application/json'],
        responses: {
          success: {
            description: 'Login Success',
            content: {
              'application/json': {
                examples: [
                  {
                    summary: '200 - GATEWAY',
                    value: require('../sample-data/api/login/localLogin/success.json')
                  }
                ]
              }
            }
          },
          error: {
            description: 'Error',
            content: {
              'application/json': {
                examples: errors
              }
            }
          }
        }
      }
    },
    '/login/local': {
      patch: {
        tags: ['Login'],
        summary: 'Initiates login process using username:password',
        operationId: 'local-login',
        consumes: ['application/json'],
        produces: ['application/json'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object'
              },
              examples: {
                '200 - ECOM-V2 - Mobile-OTP': {
                  summary: '200 - ECOM-V2 - Mobile-OTP',
                  value: require('../sample-data/api/login/localLogin/request.json')
                },
                '200 - ECOM-V2 - Email-Password': {
                  summary: '200 - ECOM-V2 - Email-Password',
                  value: require('../sample-data/api/login/localLogin/request2.json')
                }
              }
            }
          }
        },
        responses: {
          success: {
            description: 'Login Success',
            content: {
              'application/json': {
                examples: [
                  {
                    summary: '200 - GATEWAY',
                    value: require('../sample-data/api/login/localLogin/success.json')
                  }
                ]
              }
            }
          },
          error: {
            description: 'Error',
            content: {
              'application/json': {
                examples: errors
              }
            }
          }
        }
      }
    },
    '/login/otp': {
      patch: {
        tags: ['Login'],
        summary: 'Generates OTP against mobile/email provided',
        operationId: 'otp-login',
        consumes: ['application/json'],
        produces: ['application/json'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object'
              },
              examples: {
                '200 - ECOM-V2 - Generate Email/Mobile-OTP': {
                  summary: '200 - ECOM-V2 - Generate Email/Mobile-OTP',
                  value: require('../sample-data/api/login/localLogin/request3.json')
                }
              }
            }
          }
        },
        responses: {
          success: {
            description: 'OTP Generated',
            content: {
              'application/json': {
                examples: [
                  {
                    summary: '200 - GATEWAY',
                    value: require('../sample-data/api/login/localLogin/success2.json')
                  }
                ]
              }
            }
          },
          error: {
            description: 'Error',
            content: {
              'application/json': {
                examples: errors
              }
            }
          }
        }
      }
    },
    '/login/reset/password': {
      put: {
        tags: ['Login'],
        summary: 'Resets password. Works in tandem with /login/otp',
        operationId: 'reset-password',
        consumes: ['application/json'],
        produces: ['application/json'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object'
              },
              examples: {
                '200 - GATEWAY - Reset Profile Password': {
                  summary: '200 - GATEWAY - Reset Profile Password',
                  value: require('../sample-data/api/login/localLogin/request4.json')
                }
              }
            }
          }
        },
        responses: {
          success: {
            description: 'OTP Generated',
            content: {
              'application/json': {
                examples: [
                  {
                    summary: '200 - GATEWAY',
                    value: require('../sample-data/api/login/localLogin/success3.json')
                  }
                ]
              }
            }
          },
          error: {
            description: 'Error',
            content: {
              'application/json': {
                examples: errors
              }
            }
          }
        }
      }
    },
    '/login/google': {
      get: {
        tags: ['Login'],
        summary: 'Initiates login process using Google auth',
        operationId: 'google-login',
        responses: {
          success: {
            description:
              'Login Params embedded in URL { userId, accessToken, refreshToken, expiresAt }',
            content: {}
          }
        }
      }
    },
    '/login/facebook': {
      get: {
        tags: ['Login'],
        summary: 'Initiates login process using Facebook auth',
        operationId: 'facebook-login',
        responses: {
          success: {
            description:
              'Login Params embedded in URL { userId, accessToken, refreshToken, expiresAt }',
            content: {}
          }
        }
      }
    },
    '/login/twitter': {
      get: {
        tags: ['Login'],
        summary: 'Initiates login process using Twitter auth',
        operationId: 'twitter-login',
        responses: {
          success: {
            description:
              'Login Params embedded in URL { userId, accessToken, refreshToken, expiresAt }',
            content: {}
          }
        }
      }
    },
    '/login/refresh': {
      put: {
        tags: ['Login'],
        summary:
          'Generates fresh access-token by passing refresh-token [:RefreshToken] in headers',
        operationId: 'refresh-login',
        responses: {
          success: {
            description: 'Access Token Refresh',
            content: {
              'application/json': {
                examples: [
                  {
                    summary: '200 - GATEWAY',
                    value: require('../sample-data/api/login/localLogin/success.json')
                  }
                ]
              }
            }
          },
          error: {
            description: 'Error',
            content: {
              'application/json': {
                examples: errors
              }
            }
          }
        }
      }
    },
    '/gw/api/user/permissions/:appType': {
      get: {
        tags: ['Login'],
        summary:
          '@DEPRECATED : Returns hierarchical component wise configuration of front-end UAC',
        parameters: [
          {
            in: 'path',
            name: 'appType',
            schema: {
              type: 'string'
            },
            required: true,
            description:
              'AppType -> [pax, storeportal, serviceportal, airportportal, commandcenter, helpdesk]'
          }
        ],
        operationId: 'user-permission-config',
        responses: {
          success: {
            description: 'UAC config for front-end applications',
            content: {
              'application/json': {
                examples: [
                  {
                    summary: '200 - ECOM-V2',
                    value: require('../sample-data/api/login/permissions/success.json')
                  }
                ]
              }
            }
          }
        }
      }
    },
    '/gw/api/user/permissions/v2/:appType': {
      get: {
        tags: ['Login'],
        summary:
          'Returns flat permissions config for UAC; overrides already taken care of',
        parameters: [
          {
            in: 'path',
            name: 'appType',
            schema: {
              type: 'string'
            },
            required: true,
            description:
              'Suggestions for parameter : AppType -> [pax, storeportal, serviceportal, airportportal, commandcenter, helpdesk]'
          }
        ],
        operationId: 'user-permissionv2-config',
        responses: {
          success: {
            description: 'UAC config for front-end applications',
            content: {
              'application/json': {
                examples: [
                  {
                    summary: '200 - ECOM-V2',
                    value: require('../sample-data/api/login/permissionsV2/success.json')
                  }
                ]
              }
            }
          }
        }
      }
    },
    '/gw/api/user/info': getConfig({
      method: 'get',
      tags: ['User'],
      summary: 'Basic user information',
      operationId: 'basicUserInfo',
      produces: 'application/json',
      successDescription: 'User Info',
      responseExamplePath: '../sample-data/api/user/info/success.json'
    }),
    '/gw/api/user/request/update/email/:email': getConfig({
      method: 'get',
      tags: ['User'],
      summary:
        'Initiates email change process. Will send OTP to registered mobile number and new Email ID (which is expected to be set)',
      operationId: 'requestEmailUpdate',
      produces: 'application/json',
      successDescription: 'Request Email Update',
      parameters: '../sample-data/api/user/emailUpdate/request1.json',
      responseExamplePath: '../sample-data/api/user/emailUpdate/success1.json'
    }),
    '/gw/api/user/update/email': getConfig({
      method: 'put',
      tags: ['User'],
      summary: 'Updates Email iff OTP from mobile and new Email ID match',
      operationId: 'updateUserEmail',
      produces: 'application/json',
      successDescription: 'Update Email',
      requestExamplePath: '../sample-data/api/user/emailUpdate/request2.json',
      responseExamplePath: '../sample-data/api/user/emailUpdate/success2.json'
    }),
    '/gw/api/user/request/update/mobile/:mobile': getConfig({
      method: 'get',
      tags: ['User'],
      summary:
        'Initiates Mobile change process. Will send OTP to registered Email ID and new Mobile number (which is expected to be set)',
      operationId: 'requestMobileUpdate',
      produces: 'application/json',
      successDescription: 'Request Mobile Update',
      parameters: '../sample-data/api/user/mobileUpdate/request1.json',
      responseExamplePath: '../sample-data/api/user/mobileUpdate/success1.json'
    }),
    '/gw/api/user/update/mobile': getConfig({
      method: 'put',
      tags: ['User'],
      summary: 'Updates Mobile iff OTP from Email ID and new Mobile match',
      operationId: 'updateUserMobile',
      produces: 'application/json',
      successDescription: 'Update Email',
      requestExamplePath: '../sample-data/api/user/mobileUpdate/request2.json',
      responseExamplePath: '../sample-data/api/user/mobileUpdate/success2.json'
    }),
    '/gw/api/user/delete': getConfig({
      method: 'post',
      tags: ['User'],
      summary: 'Delete Accound Permanently',
      operationId: 'deleteAccount',
      produces: 'application/json',
      successDescription: 'Delete Account - Not Reversible',
      requestExamplePath: '../sample-data/api/user/delete/request.json',
      responseExamplePath: '../sample-data/api/user/delete/success.json'
    }),
    '/api/doctor/create': {
      post: {
        tags: ['Doctor'],
        summary: "Add doctor's details",
        operationId: 'doctor-add',
        consumes: ['application/json'],
        produces: ['application/json'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object'
              },
              examples: {
                '200 - Add Doctor': {
                  summary: '200 - Add doctor',
                  value: require('../sample-data/api/doctor/add/request.json')
                }
              }
            }
          }
        },
        responses: {
          success: {
            description: 'Doctor details added',
            content: {
              'application/json': {
                examples: [
                  {
                    summary: '200 - GATEWAY',
                    value: require('../sample-data/api/doctor/add/success.json')
                  }
                ]
              }
            }
          },
          error: {
            description: 'Error',
            content: {
              'application/json': {
                examples: errors
              }
            }
          }
        }
      }
    },
    '/api/doctor/get': getConfig({
      method: 'get',
      tags: ['Doctor'],
      summary: "Get all doctor's information",
      operationId: 'allDoctorInfo',
      produces: 'application/json',
      successDescription: 'Doctors Info',
      responseExamplePath: '../sample-data/api/doctor/get/success.json'
    }),
    '/api/doctor/get/:id': getConfig({
      method: 'get',
      tags: ['Doctor'],
      summary: "Get doctor's information by Id",
      operationId: 'BasicDoctorInfo',
      produces: 'application/json',
      successDescription: 'Doctor Info',
      responseExamplePath: '../sample-data/api/doctor/get/success1.json'
    }),
    '/api/doctor/list/:city': getConfig({
      method: 'get',
      tags: ['Doctor'],
      summary: "Get doctor's information by city",
      operationId: 'BasicDoctorInfo',
      produces: 'application/json',
      successDescription: 'Doctor Info',
      responseExamplePath: '../sample-data/api/doctor/get/success2.json'
    }),
    '/api/doctor/problem/add': {
      post: {
        tags: ['Problem'],
        summary: 'Add problem details',
        operationId: 'problem-add',
        consumes: ['application/json'],
        produces: ['application/json'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object'
              },
              examples: {
                '200 - Add Problem': {
                  summary: '200 - Add problem',
                  value: require('../sample-data/api/problem/add/request.json')
                }
              }
            }
          }
        },
        responses: {
          success: {
            description: 'Problem added',
            content: {
              'application/json': {
                examples: [
                  {
                    summary: '200 - GATEWAY',
                    value: require('../sample-data/api/problem/add/success.json')
                  }
                ]
              }
            }
          }
        }
      }
    },
    '/api/doctor/problem/list': getConfig({
      method: 'get',
      tags: ['Problem'],
      summary: 'Get all problems information',
      operationId: 'allProblemInfo',
      produces: 'application/json',
      successDescription: 'Problems Info',
      responseExamplePath: '../sample-data/api/problem/get/success.json'
    }),
    '/api/doctor/problem/list/:id': getConfig({
      method: 'get',
      tags: ['Problem'],
      summary: 'Get problem by id',
      operationId: 'ProblemInfo',
      produces: 'application/json',
      successDescription: 'Problem Info by Id',
      responseExamplePath: '../sample-data/api/problem/get/success1.json'
    }),
    '/api/doctor/test/add': {
      post: {
        tags: ['Test'],
        summary: 'Add Test details',
        operationId: 'test-add',
        consumes: ['application/json'],
        produces: ['application/json'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object'
              },
              examples: {
                '200 - Add Test': {
                  summary: '200 - Add test',
                  value: require('../sample-data/api/test/add/request.json')
                }
              }
            }
          }
        },
        responses: {
          success: {
            description: 'Test added',
            content: {
              'application/json': {
                examples: [
                  {
                    summary: '200 - GATEWAY',
                    value: require('../sample-data/api/test/add/success.json')
                  }
                ]
              }
            }
          }
        }
      }
    },
    '/api/doctor/test/list': getConfig({
      method: 'get',
      tags: ['Test'],
      summary: 'Get all tests',
      operationId: 'allTestInfo',
      produces: 'application/json',
      successDescription: 'Tests Info',
      responseExamplePath: '../sample-data/api/test/get/success.json'
    }),
    '/api/doctor/test/list/:id': getConfig({
      method: 'get',
      tags: ['Test'],
      summary: 'Get test by id',
      operationId: 'TestInfo',
      produces: 'application/json',
      successDescription: 'Test Info by Id',
      responseExamplePath: '../sample-data/api/test/get/success1.json'
    }),

    '/api/appointment/bookAppointment': {
      post: {
        tags: ['Appointment'],
        summary: "Add user's Appointment with doctor",
        operationId: 'appointment-add',
        consumes: ['application/json'],
        produces: ['application/json'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object'
              },
              examples: {
                '200 - Add appointment': {
                  summary: '200 - Add appointment',
                  value: require('../sample-data/api/appointment/add/request.json')
                }
              }
            }
          }
        },
        responses: {
          success: {
            description: 'appointment added',
            content: {
              'application/json': {
                examples: [
                  {
                    summary: '200 - GATEWAY',
                    value: require('../sample-data/api/appointment/add/success.json')
                  }
                ]
              }
            }
          }
        }
      }
    },
    '/api/appointment/listAppointments': getConfig({
      method: 'get',
      tags: ['Appointment'],
      summary: 'Get all appointment',
      operationId: 'allAppointmentInfo',
      produces: 'application/json',
      successDescription: 'Appointment Info',
      responseExamplePath: '../sample-data/api/appointment/get/success.json'
    }),
    '/api/appointment/list': getConfig({
      method: 'get',
      tags: ['Appointment'],
      summary: 'Get users appointment by its token',
      operationId: 'UsersAppointmentInfo',
      produces: 'application/json',
      successDescription: "User's Appointment by its token",
      responseExamplePath: '../sample-data/api/appointment/get/success1.json'
    }),
    '/api/appointment/cancel': {
      patch: {
        tags: ['Appointment'],
        summary: 'cancel users appointment by its token',
        operationId: 'CancelUsersAppointment',
        produces: 'application/json',
        consumes: ['application/json'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object'
              },
              examples: {
                '200 - ECOM-V2 - Cancel appointment': {
                  summary: '200 - ECOM-V2 - Cancel appointment',
                  value: require('../sample-data/api/appointment/cancel/request.json')
                }
              }
            }
          }
        },
        responses: {
          success: {
            description: 'Appointment cancelled',
            content: {
              'application/json': {
                examples: [
                  {
                    summary: '200 - GATEWAY',
                    value: require('../sample-data/api/appointment/cancel/success.json')
                  }
                ]
              }
            }
          },
          error: {
            description: 'Error',
            content: {
              'application/json': {
                examples: errors
              }
            }
          }
        }
      }
    },
    '/api/appointment/reschedule': {
      patch: {
        tags: ['Appointment'],
        summary: 'reschedule users appointment by its token',
        operationId: 'RescheduleUsersAppointment',
        produces: 'application/json',
        consumes: ['application/json'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object'
              },
              examples: {
                '200 - ECOM-V2 - Reschedule appointment': {
                  summary: '200 - ECOM-V2 - Reschedule appointment',
                  value: require('../sample-data/api/appointment/reschedule/request.json')
                }
              }
            }
          }
        },
        responses: {
          success: {
            description: 'Appointment rescheduled',
            content: {
              'application/json': {
                examples: [
                  {
                    summary: '200 - GATEWAY',
                    value: require('../sample-data/api/appointment/reschedule/success.json')
                  }
                ]
              }
            }
          },
          error: {
            description: 'Error',
            content: {
              'application/json': {
                examples: errors
              }
            }
          }
        }
      }
    },
    '/api/user/consultation/create': {
      post: {
        tags: ['Consultation'],
        summary: 'create consultation',
        operationId: 'createConsultation',
        produces: 'application/json',
        consumes: ['application/json'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object'
              },
              examples: {
                '200 - ECOM-V2 - create consultation': {
                  summary: '200 - ECOM-V2 - Create consultation',
                  value: require('../sample-data/api/consultation/add/request.json')
                }
              }
            }
          }
        },
        responses: {
          success: {
            description: 'Create consultation',
            content: {
              'application/json': {
                examples: [
                  {
                    summary: '200 - GATEWAY',
                    value: require('../sample-data/api/consultation/add/success.json')
                  }
                ]
              }
            }
          },
          error: {
            description: 'Error',
            content: {
              'application/json': {
                examples: errors
              }
            }
          }
        }
      }
    },
    '/api/user/consultation/list': getConfig({
      method: 'get',
      tags: ['Consultation'],
      summary: 'Get users consultation by its token',
      operationId: 'UsersConsultationInfo',
      produces: 'application/json',
      successDescription: "User's consultation by its token",
      responseExamplePath: '../sample-data/api/consultation/get/success.json'
    }),
    '/api/user/consultation/edit': {
      patch: {
        tags: ['Consultation'],
        summary: 'edit consultation',
        operationId: 'editConsultation',
        produces: 'application/json',
        consumes: ['application/json'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object'
              },
              examples: {
                '200 - ECOM-V2 - edit consultation': {
                  summary: '200 - ECOM-V2 - Edit consultation',
                  value: require('../sample-data/api/consultation/edit/request.json')
                }
              }
            }
          }
        },
        responses: {
          success: {
            description: 'Edit consultation',
            content: {
              'application/json': {
                examples: [
                  {
                    summary: '200 - GATEWAY',
                    value: require('../sample-data/api/consultation/edit/success.json')
                  }
                ]
              }
            }
          },
          error: {
            description: 'Error',
            content: {
              'application/json': {
                examples: errors
              }
            }
          }
        }
      }
    },
    "/gw/api/doctor/review/add": getConfig({
      method: 'post', tags: ['Doctor'],
      "summary": "Add Review For A Doctor",
      operationId: 'addReview', produces: 'application/json',
      successDescription: "Added Review For A Doctor",
      requestExamplePath: '../sample-data/api/doctor/review/addReview/request.json',
      responseExamplePath: '../sample-data/api/doctor/review/addReview/success.json',
    }),
    "/api/doctor/review/list/:doctorId": getConfig({
      method: 'get', tags: ['Doctor'],
      "summary": "List Reviews For A Doctor",
      operationId: 'listReview', produces: 'application/json',
      successDescription: "Got All Reviews For A Doctor",
      requestExamplePath: '../sample-data/api/doctor/review/listReview/request.json',
      responseExamplePath: '../sample-data/api/doctor/review/listReview/success.json',
    }),
    "/api/doctor/review/comment/add": getConfig({
      method: 'post', tags: ['Doctor'],
      "summary": "Add Comment For a Review Of A Doctor",
      operationId: 'addCommentToReview', produces: 'application/json',
      successDescription: "Added a Review For a Doctor",
      requestExamplePath: '../sample-data/api/doctor/review/addComment/request.json',
      responseExamplePath: '../sample-data/api/doctor/review/addComment/success.json',
    }),
    "/api/doctor/review/comment/list/:doctorId/:reviewId": getConfig({
      method: 'get', tags: ['Doctor'],
      "summary": "List Comment For a Review Of A Doctor",
      operationId: 'listCommentsOfAReview', produces: 'application/json',
      successDescription: "Got The Comments Of A Review For a Doctor",
      responseExamplePath: '../sample-data/api/doctor/review/listComment/success.json',
    }),
    "/api/app/review/create": getConfig({
      method: 'post', tags: ['App'],
      "summary": "Post a Review For The Application",
      operationId: 'addAppReview', produces: 'application/json',
      successDescription: "Added a App Review",
      requestExamplePath: '../sample-data/api/app/review/addReview/request.json',
      responseExamplePath: '../sample-data/api/app/review/addReview/success.json',
    }),
    "/api/app/review/list": getConfig({
      method: 'get', tags: ['App'],
      "summary": "List All Reviews Of The Application",
      operationId: 'listAppReview', produces: 'application/json',
      successDescription: "Got all App Review",
      responseExamplePath: '../sample-data/api/app/review/listReview/success.json',
    }),
    "/api/app/review/like": getConfig({
      method: 'post', tags: ['App'],
      "summary": "Like The Review",
      operationId: 'likeAppReview', produces: 'application/json',
      successDescription: "Liked The Review",
      requestExamplePath: '../sample-data/api/app/review/likeReview/request.json',
      responseExamplePath: '../sample-data/api/app/review/likeReview/success1.json',
      // responseExamplePath: '../sample-data/api/app/review/likeReview/success2.json',
    }),
    "/api/app/review/dislike": getConfig({
      method: 'post', tags: ['App'],
      "summary": "Remove Like From The Review",
      operationId: 'dislikeAppReview', produces: 'application/json',
      successDescription: "Removed The Like For The Review",
      requestExamplePath: '../sample-data/api/app/review/dislikeReview/request.json',
      responseExamplePath: '../sample-data/api/app/review/dislikeReview/success1.json',
      // responseExamplePath: '../sample-data/api/app/review/likeReview/success2.json',
    })
  },
  "securityDefinitions": {
    "ecomv2_auth": {
      "type": "oauth2",
      "flow": "implicit"
    }
  },
  securityDefinitions: {
    ecomv2_auth: {
      type: 'oauth2',
      flow: 'implicit'
    }
  },
  definitions: {
    ApiResponse: {
      type: 'object',
      properties: {
        status: {
          type: 'integer',
          format: 'int32'
        },
        type: {
          type: 'string'
        },
        message: {
          type: 'string'
        },
        data: {
          type: 'object'
        },
        metadata: {
          type: 'object'
        }
      }
    }
  }
}

module.exports = swagger
