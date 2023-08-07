const functions = require("firebase-functions");
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

const db = admin.firestore()

exports.addCiti = functions.https.onRequest(async(req,res) => {
    const citiRef = db.collection('Aug23');
    await citiRef.doc('Pune').set({
        "name":"Pune","country":"India","Population":35346434
    })
    res.send('Data Added')
})


exports.getCiti = functions.https.onRequest(async(req,res) => {
    const citiRef = db.collection('Aug23');
    const snapshot = await citiRef.get('data');
    const out = [];
    snapshot.forEach(doc => {
        out.push(doc.data())
    })
    res.send(out)
})