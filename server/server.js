const express = require('express');
const multer = require('multer');
const { Storage } = require('@google-cloud/storage');
const cors = require('cors');
const admin = require('firebase-admin');

const app = express();
const port = 4000;

// Initialize Google Cloud Storage
const storage = new Storage({
  keyFilename: 'gcloudKey.json'
});
const bucket = storage.bucket('novacode'); // Your bucket name

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert('firebaseKey.json')
});
const db = admin.firestore();

// Configure multer
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB limit
});

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded.' });
    }

    // Extract metadata from the request body
    const { name, description, organization } = req.body;

    // Add metadata to Firestore
    const docRef = await db.collection('projects').add({
      name,
      description,
      organization,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });

    const docId = docRef.id;
    console.log('Document written with ID: ', docId);

    // Create a file path within the folder named with the document ID
    const filePath = `${docId}/${req.file.originalname}`;
    const blob = bucket.file(filePath);
    const blobStream = blob.createWriteStream();

    blobStream.on('error', (err) => {
      console.error('Error during file upload:', err);
      return res.status(500).json({ message: 'Error uploading file.', error: err.message });
    });

    blobStream.on('finish', async () => {
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${filePath}`;

      try {
        // Update Firestore with the file URL
        await docRef.update({ fileUrl: publicUrl });

        return res.status(200).json({ 
          message: 'File uploaded and project added successfully.',
          url: publicUrl,
          projectId: docId
        });
      } catch (firestoreError) {
        console.error('Error updating document: ', firestoreError);
        return res.status(500).json({ message: 'Error updating project in database.', error: firestoreError.message });
      }
    });

    blobStream.end(req.file.buffer);
  } catch (error) {
    console.error('Unexpected error during file upload:', error);
    return res.status(500).json({ message: 'Unexpected error occurred.', error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
