import swaggerJsdoc from 'swagger-jsdoc';
import {
    authEndpoints,
    postEndpoints,
    userEndpoints,
    notificationEndpoints,
    reportEndpoints
} from './swagger-endpoints.js';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'SelamY Blog API',
            version: '1.0.0',
            description: 'RESTful API for SelamY Blog Platform',
            contact: {
                name: 'Ben'
            },
            license: {
                name: 'MIT'
            }
        },
        servers: [
            {
                url: 'https://salih-blog-api-server.onrender.com',
                description: 'Production Server'
            }
        ],
        components: {
            securitySchemes: {
                BearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                    description: 'Enter your JWT token'
                }
            },
            schemas: {
                User: {
                    type: 'object',
                    properties: {
                        _id: { type: 'string', example: '507f1f77bcf86cd799439011' },
                        username: { type: 'string', example: 'john_doe' },
                        email: { type: 'string', example: 'john@example.com' },
                        displayName: { type: 'string', example: 'John Doe' },
                        profilePicture: { type: 'string', example: 'https://res.cloudinary.com/image.jpg' },
                        bio: { type: 'string', example: 'I love blogging' },
                        role: { type: 'string', enum: ['user', 'admin'], example: 'user' },
                        followers: { type: 'array', items: { type: 'string' } },
                        following: { type: 'array', items: { type: 'string' } },
                        isBanned: { type: 'boolean', example: false },
                        createdAt: { type: 'string', format: 'date-time' }
                    }
                },
                Post: {
                    type: 'object',
                    properties: {
                        _id: { type: 'string' },
                        title: { type: 'string', example: 'My First Blog Post' },
                        content: { type: 'string', example: 'This is the content...' },
                        author: { $ref: '#/components/schemas/User' },
                        slug: { type: 'string', example: 'my-first-blog-post' },
                        tags: { type: 'array', items: { type: 'string' }, example: ['javascript', 'nodejs'] },
                        statu: { type: 'string', enum: ['published', 'draft'], example: 'published' },
                        likeCount: { type: 'number', example: 5 },
                        commentCount: { type: 'number', example: 2 },
                        firstPublishDate: { type: 'string', format: 'date-time' },
                        createdAt: { type: 'string', format: 'date-time' }
                    }
                },
                Comment: {
                    type: 'object',
                    properties: {
                        _id: { type: 'string' },
                        text: { type: 'string', example: 'Great post!' },
                        author: { $ref: '#/components/schemas/User' },
                        likeCount: { type: 'number' },
                        createdAt: { type: 'string', format: 'date-time' }
                    }
                },
                Notification: {
                    type: 'object',
                    properties: {
                        _id: { type: 'string' },
                        type: { type: 'string', enum: ['mention', 'follow', 'like', 'comment', 'delete', 'unpublish'] },
                        recipient: { $ref: '#/components/schemas/User' },
                        sender: { $ref: '#/components/schemas/User' },
                        post: { type: 'string' },
                        message: { type: 'string' },
                        isRead: { type: 'boolean' },
                        createdAt: { type: 'string', format: 'date-time' }
                    }
                },
                Report: {
                    type: 'object',
                    properties: {
                        _id: { type: 'string' },
                        reporter: { type: 'string' },
                        target: { type: 'string' },
                        targetType: { type: 'string', enum: ['Post', 'Comment', 'User'] },
                        reason: { type: 'string' },
                        description: { type: 'string' },
                        status: { type: 'string', enum: ['pending', 'resolved', 'dismissed'] },
                        createdAt: { type: 'string', format: 'date-time' }
                    }
                },
                Error: {
                    type: 'object',
                    properties: {
                        message: { type: 'string' },
                        error: { type: 'string' }
                    }
                }
            }
        },
        security: [
            {
                BearerAuth: []
            }
        ],
        paths: {
        ...authEndpoints,
        ...postEndpoints,
        ...userEndpoints,
        ...notificationEndpoints,
        ...reportEndpoints
    },
    
    },
    apis: []
    
};

export const specs = swaggerJsdoc(options);