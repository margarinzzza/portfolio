//mongodb+srv://userbuser:afc__0013wdRQ3R@purrweb-task.8ejwpsc.mongodb.net/?retryWrites=true&w=majority

var express = require('express');
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'
import cors from 'cors';
import mongoose from 'mongoose';
import { registerValidator, redactUserInfoValidator } from './validations/validators'
import { RegisterController, LoginController, ProfileController, RedactUserInfoConroller} from './controllers/Controllers';
import UserModel from './models/User'
import checkAuth from './utils/checkAuth';
const port = 4000;

mongoose
  .connect('mongodb+srv://userbuser:afc__0013wdRQ3R@purrweb-task.8ejwpsc.mongodb.net/purrweb-task?retryWrites=true&w=majority')
  .then(() => console.log('db ok'))
  .catch((err) => console.log('db error', err));

const app = express();
app.use(cors());
app.use(express.json());
app.listen(port, (err: any) => {
  err ? console.log(err) : console.log(`server work on http://localhost:${port}`)
});

app.post('/register', registerValidator, RegisterController);
app.post('/login', LoginController);
app.get('/profile', checkAuth, ProfileController); 
app.post('/redact_profile', checkAuth, redactUserInfoValidator, RedactUserInfoConroller), async (req: any, res: any) => {

};
