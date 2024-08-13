const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserModel = require('./models/User');
const TodoModel = require('./models/Todo');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

const app = express();
app.use(express.json());
app.use(cors());

// mongoose.connect("mongodb+srv://andynguyen4267:QPSFI39SaFXvunic@agendae.qlzavce.mongodb.net/user?retryWrites=true&w=majority");
mongoose.connect("mongodb+srv://andynguyen4267:QPSFI39SaFXvunic@agendae.qlzavce.mongodb.net/user?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'agendae.verify@gmail.com',
        pass: 'vkcq yzvy tjqx ckmu'
    }
});

const sendVerificationEmail = (user, req, res) => {
    const token = crypto.randomBytes(32).toString('hex');
    user.verificationToken = token;
    user.isVerified = false;
    user.save()
        .then(() => {
            const verificationUrl = `http://${req.headers.host}/confirmation/${token}`;
            const mailOptions = {
                to: user.email,
                subject: 'Confirm Email',
                html: `Please click this link to confirm your email: <a href="${verificationUrl}">${verificationUrl}</a>`
            };

            transporter.sendMail(mailOptions, (err, info) => {
                if (err) {
                    console.error("Error sending email:", err);
                    return res.status(500).json({ message: 'Email sending failed', error: err });
                }
                res.status(200).json({ message: 'Verification email sent. Please check your email.', userId: user._id });
            });
        })
        .catch(saveErr => {
            console.error("Error saving user:", saveErr);
            res.status(500).json({ message: 'User saving failed', error: saveErr });
        });
};

app.get('/', function (req, res) {
    res.render('index', {});
  });
  
app.post("/login", (req, res) => {
    const { email, password } = req.body;
    UserModel.findOne({ email: email })
        .then(user => {
            if (user) {
                if (!user.isVerified) {
                    return res.json({ status: "Please verify your email before logging in." });
                }
                if (user.password === password) {
                    res.json({ status: "Success", userId: user._id });
                } else {
                    res.json({ status: "The password is incorrect." });
                }
            } else {
                res.json({ status: "No record exists." });
            }
        })
        .catch(err => res.json(err));
});

app.post('/register', (req, res) => {
    const { email, password, name } = req.body;
    UserModel.findOne({ email: email })
        .then(user => {
            if (user) {
                res.json({ status: "Email already exists." });
            } else {
                const newUser = new UserModel({ email, password, name, isVerified: false });
                newUser.save()
                    .then(() => {
                        try {
                            res.json({ status: "Success" });
                            sendVerificationEmail(newUser, req, res);
                        } catch (err) {
                            console.error("Error sending verification email:", err);
                            res.status(500).json({ status: "Error sending verification email.", error: err });
                        }
                    })
                    .catch(err => {
                        console.error("Error saving user:", err);
                        res.status(500).json({ status: "Error saving user.", error: err });
                    });
            }
        })
        .catch(err => {
            console.error("Error checking email:", err);
            res.status(500).json({ status: "Error checking email.", error: err });
        });
});


app.get('/confirmation/:token', (req, res) => {
    UserModel.findOne({ verificationToken: req.params.token })
        .then(user => {
            if (!user) {
                return res.status(400).json({ message: 'Invalid token' });
            }

            user.isVerified = true;
            user.verificationToken = undefined; // Clear the token after verification
            user.save()
                .then(() => res.status(200).json({ message: 'Email verified successfully' }))
                .catch(err => res.status(500).json({ message: 'Error verifying email', error: err }));
        })
        .catch(err => res.status(500).json({ message: 'Error finding user', error: err }));
});

app.get('/todos/:userId', (req, res) => {
    const { userId } = req.params;
    TodoModel.find({ userId: userId })
        .then(todos => res.json(todos))
        .catch(err => res.json(err));
});

app.post('/todos', (req, res) => {
    const { userId, task } = req.body;
    const newTodo = new TodoModel({ userId, task, completed: false });
    newTodo.save()
        .then(todo => res.json(todo))
        .catch(err => res.json(err));
});

app.put('/todos/:id', (req, res) => {
    const { id } = req.params;
    const { task, completed } = req.body;
    TodoModel.findByIdAndUpdate(id, { task, completed }, { new: true })
        .then(todo => res.json(todo))
        .catch(err => res.json(err));
});

app.delete('/todos/:id', (req, res) => {
    const { id } = req.params;
    TodoModel.findByIdAndDelete(id)
        .then(() => res.json({ message: "Todo deleted successfully" }))
        .catch(err => res.json(err));
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log("Server is running on port 3001");
});