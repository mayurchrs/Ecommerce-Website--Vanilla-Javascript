import dotenv from 'dotenv';

dotenv.config();   //bycalling this function dotenv read .env file and process .env with content inside .env file

export default {
    MONGODB_URL: process.env.MONGODB_URL,   //value that you entered in .env file
    JWT_SECRET: process.env.JWT_SECRET,
    PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID,
}