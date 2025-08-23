require("dotenv").config();
const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");

const app = express();
app.use(cors({origin: "http://localhost:5173"}));
app.use(express.json()); 
const serviceAccount = JSON.parse(
  Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT, "base64").toString("utf8")
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore(); 

//app.get("/", (req, res) => res.send("Server is running"));

app.post("/api/clicks", async (req, res) => {
  const idToken = req.headers.authorization?.split("Bearer ")[1];

  if (!idToken) return res.status(401).json({ error: "No token provided" });

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const uid = decodedToken.uid;
    var updatedClicks = 0;
    const userDocRef = db.collection("userClicks").doc(uid);

    await db.runTransaction(async (transaction) => {
      const doc = await transaction.get(userDocRef);
      const currentClicks = doc.exists ? doc.data().clicks : 0;
      transaction.set(userDocRef, { clicks: currentClicks + 1 });
      updatedClicks = doc.exists ? doc.data().clicks : 0;
    });

    res.json({ 
      count: updatedClicks
    });
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: "Invalid token or database error" });
  }
});

app.get("/api/clicks", async (req, res) => {
  const idToken = req.headers.authorization?.split("Bearer ")[1];

  if (!idToken) return res.status(401).json({ error: "No token provided" });

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const uid = decodedToken.uid;

    const doc = await db.collection("userClicks").doc(uid).get();
    const clicks = doc.exists ? doc.data().clicks : 0;

    res.json({ clicks });
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: "Invalid token or database error" });
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});