//Import express
import express from 'express';

import discountCodesRoutes from './src/routes/discountCodes.js';
import marketingCampaingsRoutes from './src/routes/marketingCampaings.js';
import brandRoutes from './src/routes/brand.js';
import categoriesRoutes from './src/routes/categories.js';
import productsRoutes from './src/routes/products.js';
import customerRoutes from './src/routes/customer.js';
import loginCustomerRoutes from './src/routes/loginCustomer.js';
import customerRecoveryPasswordRoutes from './src/routes/customerRecoveryPassword.js';
import registersCustomersRoutes from './src/routes/registerCustomers.js';
import logoutRoutes from './src/routes/logout.js';
import cartRoutes from './src/routes/cart.js';
import ordersRoutes from './src/routes/orders.js';
import administratorsRoutes from './src/routes/administrators.js';
import loginAdminRoutes from './src/routes/loginAdmin.js';
import registerAdminRoutes from './src/routes/registerAdmin.js';
import limiter from './src/middlewares/limiter.js';

import cors from 'cors'; 
//Important 
import cookieParser from 'cookie-parser';

//Execute express
const app = express();

//Use cors is for allow cross-origin requests, which is necessary when the frontend and backend are hosted on different domains or ports. It enables the frontend to make API calls to the backend without being blocked by the browser's same-origin policy.
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174'], // Permite el admin (5174) y el cliente (5173)
    //Allows the sending of cookies and other credentials in cross-origin requests, which is necessary for authentication and session management.
    credentials: true
}));
 
//Cookie parser allows us to parse the cookies sent by the client in the request headers and make them easily accessible in our route handlers.
app.use(cookieParser());

//Accept JSON 
app.use(express.json());

app.use(limiter);

//Create the endpoints
app.use('/api/discountCodes', discountCodesRoutes);
app.use('/api/marketingCampaings', marketingCampaingsRoutes);
app.use('/api/brands', brandRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/login', loginCustomerRoutes);
app.use('/api/recoveryPassword', customerRecoveryPasswordRoutes);
app.use('/api/logout', logoutRoutes);
app.use('/api/registerCustomers', registersCustomersRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/administrators', administratorsRoutes);
app.use('/api/loginAdmin', loginAdminRoutes);
app.use('/api/registerAdmin', registerAdminRoutes);

export default app;
