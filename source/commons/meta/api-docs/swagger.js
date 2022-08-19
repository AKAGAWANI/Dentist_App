require('dotenv');
const errors = require('./error');

function getConfig({ 
  method, tags, summary, operationId, consumes, produces, successDescription, 
  parameters, requestExamplePath, responseExamplePath }) {
  return {
    [method]: {
      tags, summary, operationId, consumes: [consumes], produces: [produces],
      "requestBody": requestExamplePath ? {
        "required": true,
        "content": {
          [consumes]: {
            "schema": {
              "type": "object"
            },
            "example": require(requestExamplePath)
          }
        }
      } : null,
      "parameters": parameters ? require(parameters) : null,
      "responses": {
        "success": {
          successDescription,
          "content": {
            [produces]: {
              "examples": [
                {
                  "summary": "200 - DDA APP",
                  "value": require(responseExamplePath)
                }
              ]
            }
          }
        },
        "error": {
          "description": "Error",
          "content": {
            "application/json": {
              "examples": errors
            }
          }
        }
      }
    }
  }
}

const swagger = {
  "openapi": "3.0.3",
  "info": {
    "title": "Gateway",
    "description": "Updated: [20220629] | All req must have Authorization[:accessToken] in headers { exceptions: [/login/*] }",
    "contact": {
      "email": "pranav.sinha@graymatter.co.in"
    },
    "version": "3.0.0"
  },
  "servers": [
    {
      "name": "DDA AWS",
      "url": `http://13.232.208.184:9091`
    }
  ],
  "tags": [
    {
      "name": "Logout",
      "description": "DDA : logout APIs"
    },
    {
      "name": "Login",
      "description": "DDA : login APIs"
    },
    {
      "name": "User",
      "description": "DDA : user/profile APIs"
    },
  ],
  "paths": {
    "/logout": getConfig({ 
      method: 'put', tags: ['Logout'], 
      "summary": "Initiates logout process; revokes access and refresh token; pass both Authorization[:accessToken] and RefreshToken[:refreshToken] in headers",
      operationId: 'logout', produces: 'application/json', 
      successDescription: "Logout",
      responseExamplePath: '../sample-data/api/logout/signoff/success.json',  
    }),
    "/login/guest": {
      "get": {
        "tags": [
          "Login"
        ],
        "summary": "Initiates login process for guest user",
        "operationId": "guest-login",
        "consumes": [
          "application/json"
        ],
        "produces": [
          "application/json"
        ],
        "responses": {
          "success": {
            "description": "Login Success",
            "content": {
              "application/json": {
                "examples": [
                  {
                    "summary": "200 - GATEWAY",
                    "value": require('../sample-data/api/login/localLogin/success.json')
                  }
                ]
              }
            }
          },
          "error": {
            "description": "Error",
            "content": {
              "application/json": {
                "examples": errors
              }
            }
          }
        }
      }
    },
    "/login/local": {
      "patch": {
        "tags": [
          "Login"
        ],
        "summary": "Initiates login process using username:password",
        "operationId": "local-login",
        "consumes": [
          "application/json"
        ],
        "produces": [
          "application/json"
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object"
              },
              "examples": {
                "200 - ECOM-V2 - Mobile-OTP": {
                  "summary": "200 - ECOM-V2 - Mobile-OTP",
                  "value": require('../sample-data/api/login/localLogin/request.json')
                },
                "200 - ECOM-V2 - Email-Password": {
                  "summary": "200 - ECOM-V2 - Email-Password",
                  "value": require('../sample-data/api/login/localLogin/request2.json')
                }
              }
            }
          }
        },
        "responses": {
          "success": {
            "description": "Login Success",
            "content": {
              "application/json": {
                "examples": [
                  {
                    "summary": "200 - GATEWAY",
                    "value": require('../sample-data/api/login/localLogin/success.json')
                  }
                ]
              }
            }
          },
          "error": {
            "description": "Error",
            "content": {
              "application/json": {
                "examples": errors
              }
            }
          }
        }
      }
    },
    "/login/otp": {
      "patch": {
        "tags": [
          "Login"
        ],
        "summary": "Generates OTP against mobile/email provided",
        "operationId": "otp-login",
        "consumes": [
          "application/json"
        ],
        "produces": [
          "application/json"
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object"
              },
              "examples": {
                "200 - ECOM-V2 - Generate Email/Mobile-OTP": {
                  "summary": "200 - ECOM-V2 - Generate Email/Mobile-OTP",
                  "value": require('../sample-data/api/login/localLogin/request3.json')
                }
              }
            }
          }
        },
        "responses": {
          "success": {
            "description": "OTP Generated",
            "content": {
              "application/json": {
                "examples": [
                  {
                    "summary": "200 - GATEWAY",
                    "value": require('../sample-data/api/login/localLogin/success2.json')
                  }
                ]
              }
            }
          },
          "error": {
            "description": "Error",
            "content": {
              "application/json": {
                "examples": errors
              }
            }
          }
        }
      }
    },
    "/login/reset/password": {
      "put": {
        "tags": [
          "Login"
        ],
        "summary": "Resets password. Works in tandem with /login/otp",
        "operationId": "reset-password",
        "consumes": [
          "application/json"
        ],
        "produces": [
          "application/json"
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object"
              },
              "examples": {
                "200 - GATEWAY - Reset Profile Password": {
                  "summary": "200 - GATEWAY - Reset Profile Password",
                  "value": require('../sample-data/api/login/localLogin/request4.json')
                }
              }
            }
          }
        },
        "responses": {
          "success": {
            "description": "OTP Generated",
            "content": {
              "application/json": {
                "examples": [
                  {
                    "summary": "200 - GATEWAY",
                    "value": require('../sample-data/api/login/localLogin/success3.json')
                  }
                ]
              }
            }
          },
          "error": {
            "description": "Error",
            "content": {
              "application/json": {
                "examples": errors
              }
            }
          }
        }
      }
    },
    "/login/google": {
      "get": {
        "tags": [
          "Login"
        ],
        "summary": "Initiates login process using Google auth",
        "operationId": "google-login",
        "responses": {
          "success": {
            "description": "Login Params embedded in URL { userId, accessToken, refreshToken, expiresAt }",
            "content": {}
          }
        }
      }
    },
    "/login/facebook": {
      "get": {
        "tags": [
          "Login"
        ],
        "summary": "Initiates login process using Facebook auth",
        "operationId": "facebook-login",
        "responses": {
          "success": {
            "description": "Login Params embedded in URL { userId, accessToken, refreshToken, expiresAt }",
            "content": {}
          }
        }
      }
    },
    "/login/twitter": {
      "get": {
        "tags": [
          "Login"
        ],
        "summary": "Initiates login process using Twitter auth",
        "operationId": "twitter-login",
        "responses": {
          "success": {
            "description": "Login Params embedded in URL { userId, accessToken, refreshToken, expiresAt }",
            "content": {}
          }
        }
      }
    },
    "/login/refresh": {
      "put": {
        "tags": [
          "Login"
        ],
        "summary": "Generates fresh access-token by passing refresh-token [:RefreshToken] in headers",
        "operationId": "refresh-login",
        "responses": {
          "success": {
            "description": "Access Token Refresh",
            "content": {
              "application/json": {
                "examples": [
                  {
                    "summary": "200 - GATEWAY",
                    "value": require('../sample-data/api/login/localLogin/success.json')
                  }
                ]
              }
            }
          },
          "error": {
            "description": "Error",
            "content": {
              "application/json": {
                "examples": errors
              }
            }
          }
        }
      }
    },
    "/gw/api/user/permissions/:appType": {
      "get": {
        "tags": [
          "Login"
        ],
        "summary": "@DEPRECATED : Returns hierarchical component wise configuration of front-end UAC",
        "parameters": [{
          "in": "path",
          "name": "appType",
          "schema": {
            "type": "string"
          },
          "required": true,
          "description": "AppType -> [pax, storeportal, serviceportal, airportportal, commandcenter, helpdesk]"
        }],
        "operationId": "user-permission-config",
        "responses": {
          "success": {
            "description": "UAC config for front-end applications",
            "content": {
              "application/json": {
                "examples": [
                  {
                    "summary": "200 - ECOM-V2",
                    "value": require('../sample-data/api/login/permissions/success.json')
                  }
                ]
              }
            }
          }
        }
      }
    },
    "/gw/api/user/permissions/v2/:appType": {
      "get": {
        "tags": [
          "Login"
        ],
        "summary": "Returns flat permissions config for UAC; overrides already taken care of",
        "parameters": [{
          "in": "path",
          "name": "appType",
          "schema": {
            "type": "string"
          },
          "required": true,
          "description": "Suggestions for parameter : AppType -> [pax, storeportal, serviceportal, airportportal, commandcenter, helpdesk]"
        }],
        "operationId": "user-permissionv2-config",
        "responses": {
          "success": {
            "description": "UAC config for front-end applications",
            "content": {
              "application/json": {
                "examples": [
                  {
                    "summary": "200 - ECOM-V2",
                    "value": require('../sample-data/api/login/permissionsV2/success.json')
                  }
                ]
              }
            }
          }
        }
      }
    },
    "/gw/api/user/info": getConfig({ 
      method: 'get', tags: ['User'], 
      "summary": "Basic user information",
      operationId: 'basicUserInfo', produces: 'application/json', 
      successDescription: "User Info",
      responseExamplePath: '../sample-data/api/user/info/success.json',
    }),
    "/gw/api/user/request/update/email/:email": getConfig({ 
      method: 'get', tags: ['User'], 
      "summary": "Initiates email change process. Will send OTP to registered mobile number and new Email ID (which is expected to be set)",
      operationId: 'requestEmailUpdate', produces: 'application/json', 
      successDescription: "Request Email Update",
      parameters: '../sample-data/api/user/emailUpdate/request1.json',
      responseExamplePath: '../sample-data/api/user/emailUpdate/success1.json',
    }),
    "/gw/api/user/update/email": getConfig({ 
      method: 'put', tags: ['User'], 
      "summary": "Updates Email iff OTP from mobile and new Email ID match",
      operationId: 'updateUserEmail', produces: 'application/json', 
      successDescription: "Update Email",
      requestExamplePath: '../sample-data/api/user/emailUpdate/request2.json',
      responseExamplePath: '../sample-data/api/user/emailUpdate/success2.json',
    }),
    "/gw/api/user/request/update/mobile/:mobile": getConfig({ 
      method: 'get', tags: ['User'], 
      "summary": "Initiates Mobile change process. Will send OTP to registered Email ID and new Mobile number (which is expected to be set)",
      operationId: 'requestMobileUpdate', produces: 'application/json', 
      successDescription: "Request Mobile Update",
      parameters: '../sample-data/api/user/mobileUpdate/request1.json',
      responseExamplePath: '../sample-data/api/user/mobileUpdate/success1.json',
    }),
    "/gw/api/user/update/mobile": getConfig({ 
      method: 'put', tags: ['User'], 
      "summary": "Updates Mobile iff OTP from Email ID and new Mobile match",
      operationId: 'updateUserMobile', produces: 'application/json', 
      successDescription: "Update Email",
      requestExamplePath: '../sample-data/api/user/mobileUpdate/request2.json',
      responseExamplePath: '../sample-data/api/user/mobileUpdate/success2.json',
    }),
    "/gw/api/user/delete": getConfig({ 
      method: 'post', tags: ['User'], 
      "summary": "Delete Accound Permanently",
      operationId: 'deleteAccount', produces: 'application/json', 
      successDescription: "Delete Account - Not Reversible",
      requestExamplePath: '../sample-data/api/user/delete/request.json',
      responseExamplePath: '../sample-data/api/user/delete/success.json',
    }),
  },
  "securityDefinitions": {
    "ecomv2_auth": {
      "type": "oauth2",
      "flow": "implicit"
    }
  },
  "definitions": {
    "ApiResponse": {
      "type": "object",
      "properties": {
        "status": {
          "type": "integer",
          "format": "int32"
        },
        "type": {
          "type": "string"
        },
        "message": {
          "type": "string"
        },
        "data": {
          "type": "object"
        },
        "metadata": {
          "type": "object"
        }
      }
    }
  }
  
}

module.exports = swagger;