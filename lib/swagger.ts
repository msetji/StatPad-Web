import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'StatPad API',
      version: '1.0.0',
      description: 'API documentation for StatPad basketball stats tracking application',
      contact: {
        name: 'StatPad Support',
        email: 'support@statpad.com'
      }
    },
    servers: [
      {
        url: process.env.NODE_ENV === 'production' 
          ? 'https://statpad-web.vercel.app' 
          : 'http://localhost:3000',
        description: process.env.NODE_ENV === 'production' ? 'Production server' : 'Development server'
      }
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Supabase JWT token'
        }
      },
      schemas: {
        Stats: {
          type: 'object',
          properties: {
            waitlistCount: {
              type: 'integer',
              description: 'Number of users on waitlist',
              example: 150
            },
            betaUsersCount: {
              type: 'integer',
              description: 'Number of beta users',
              example: 25
            },
            clipsCount: {
              type: 'integer',
              description: 'Total number of clips/posts',
              example: 1250
            }
          }
        },
        FileUploadResponse: {
          type: 'object',
          properties: {
            fileUrl: {
              type: 'string',
              format: 'uri',
              description: 'Public URL of uploaded file',
              example: 'https://example.supabase.co/storage/v1/object/public/post-files/user123-1234567890.mp4'
            },
            fileName: {
              type: 'string',
              description: 'Generated filename',
              example: 'user123-1234567890.mp4'
            },
            fileType: {
              type: 'string',
              description: 'MIME type of uploaded file',
              example: 'video/mp4'
            }
          }
        },
        Error: {
          type: 'object',
          properties: {
            error: {
              type: 'string',
              description: 'Error message',
              example: 'Invalid request'
            }
          }
        }
      }
    },
    security: [],
    paths: {
      '/api/stats': {
        get: {
          tags: ['Statistics'],
          summary: 'Get application statistics',
          description: 'Retrieve public statistics including waitlist count, beta users, and clips count',
          responses: {
            200: {
              description: 'Statistics retrieved successfully',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Stats'
                  }
                }
              }
            },
            500: {
              description: 'Internal server error',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Error'
                  }
                }
              }
            }
          }
        }
      },
      '/api/upload': {
        post: {
          tags: ['File Upload'],
          summary: 'Upload media file',
          description: 'Upload image or video file for posts. Requires authentication.',
          security: [
            {
              BearerAuth: []
            }
          ],
          requestBody: {
            required: true,
            content: {
              'multipart/form-data': {
                schema: {
                  type: 'object',
                  properties: {
                    file: {
                      type: 'string',
                      format: 'binary',
                      description: 'Media file to upload (max 50MB)'
                    },
                    userId: {
                      type: 'string',
                      description: 'User ID (UUID)',
                      example: 'user-uuid-123'
                    }
                  },
                  required: ['file', 'userId']
                }
              }
            }
          },
          responses: {
            200: {
              description: 'File uploaded successfully',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/FileUploadResponse'
                  }
                }
              }
            },
            400: {
              description: 'Bad request - invalid file or missing parameters',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Error'
                  },
                  examples: {
                    noFile: {
                      summary: 'No file provided',
                      value: {
                        error: 'No file provided'
                      }
                    },
                    noUserId: {
                      summary: 'User ID required',
                      value: {
                        error: 'User ID required'
                      }
                    },
                    fileTooLarge: {
                      summary: 'File too large',
                      value: {
                        error: 'File too large. Maximum size is 50MB.'
                      }
                    },
                    unsupportedType: {
                      summary: 'Unsupported file type',
                      value: {
                        error: 'Unsupported file type'
                      }
                    }
                  }
                }
              }
            },
            401: {
              description: 'Unauthorized - valid JWT token required'
            },
            500: {
              description: 'Internal server error',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Error'
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  apis: []
};

export const swaggerSpec = swaggerJsdoc(options);