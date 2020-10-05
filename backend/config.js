import dotenv from 'dotenv'

dotenv.config()

export default {
    MONGODB_URL: process.env.MONGODB_URL || 'mongodb://localhost/quickshop',
    JWT_SECRET: process.env.JWT_SECRET || 'somethingsecretetet42',
    PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID || 'sb',
    PORT: process.env.PORT || 5000
}