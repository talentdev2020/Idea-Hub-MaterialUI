const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");
const cors = require("cors")({ origin: true });

const firebase = require("firebase/app");
require("firebase/firestore");
/**
 * Here we're using Gmail to send
 */
const firebaseConfig = {
  apiKey: "AIzaSyDZHd-IVZVPMKt1O594nY11tU8IXhkc9FE",
  authDomain: "idea-hub-56602.firebaseapp.com",
  databaseURL: "https://idea-hub-56602.firebaseio.com",
  projectId: "idea-hub-56602",
  storageBucket: "idea-hub-56602.appspot.com",
  messagingSenderId: "466151177261",
  appId: "1:466151177261:web:53ecbe21a4ddcb9e3fcca4",
  measurementId: "G-ZJ5RBDED83",
};
admin.initializeApp();
firebase.initializeApp(firebaseConfig);
const store = firebase.firestore();

let transporter = nodemailer.createTransport({
  service: "gmail",
  maxConnections: 100,
  maxMessages: 100,
  auth: {
    user: "nexusideahub@gmail.com",
    pass: "DONT4get_",
  },
});

async function getEmails() {
  let res = await store
    .collection("users")
    .get()
    .then((querySnapshot) => {
      let result = querySnapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });

      //result = result.filter((item) => item.isRegistered);
      result = result.map((item) => item.email);
      return result;
    });
  return res;
}

exports.sendMail = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    const emails = await getEmails();
    let text = "";
    const title = req.query.title;
    const status = req.query.status;
    const fromstatus = req.query.fromstatus;
    const username = req.query.username;
    const useremail = req.query.email;
    const hubname = req.query.hub;
    if (status === "new")
      text =
        username + " created new idea '" + title + "' in " + hubname + " hub";
    else if (status === "change")
      text =
        username +
        " has modified the idea '" +
        title +
        "' in " +
        hubname +
        "hub";
    else
      text =
        username +
        " has changed the status of the idea '" +
        title +
        "' from " +
        fromstatus +
        " to " +
        status +
        " in " +
        hubname +
        " hub";
    text =
      text +
      "<br><br><div>if you want to sign in or sign up, please click <a href='https://idea-hub-56602.web.app/user/login'>SignIn</a><span>&nbsp;|&nbsp;</span><a href='https://idea-hub-56602.web.app/user/register'>SignUp</a></div><br>contact <a href='mailto:nexusideahub@gmail.com'>Roshan Vani</a> if you are having issues";

    emails.forEach((email) => {
      const mailOptions = {
        from: "Admin ", // Something like: Jane Doe <janedoe@gmail.com>
        to: email,
        subject: "New Idea in Nexus Lab", // email subject
        html: text, // email content in HTML
      };

      transporter.sendMail(mailOptions);
    });

    return res.send("Sended" + emails[0]);
  });
});
