// Import Firebase Admin SDK

import admin from '../firebase/firebaseAdmin.js';


const db = admin.firestore();

// Sample user data
const users =  [
    { "_id": "Bd1Nsv6JaCRyNScRNWSIYFxw1Gv12", "createdAt": "2024-12-01T11:15:12.120Z", "email": "charles.hall@example.com", "name": "Charles Hall" },
    { "_id": "Bd1Nsv6JaCRyNScRNWSIYFxw1Gv13", "createdAt": "2024-12-01T13:40:35.993Z", "email": "mary.lee@example.com", "name": "Mary Lee" },
    { "_id": "Bd1Nsv6JaCRyNScRNWSIYFxw1Gv14", "createdAt": "2024-12-01T16:02:22.450Z", "email": "william.gonzalez@example.com", "name": "William Gonzalez" },
    { "_id": "Bd1Nsv6JaCRyNScRNWSIYFxw1Gv15", "createdAt": "2024-12-02T07:13:40.220Z", "email": "elizabeth.perez@example.com", "name": "Elizabeth Perez" },
    { "_id": "Bd1Nsv6JaCRyNScRNWSIYFxw1Gv16", "createdAt": "2024-12-02T09:50:10.995Z", "email": "john.sanchez@example.com", "name": "John Sanchez" },
    { "_id": "Bd1Nsv6JaCRyNScRNWSIYFxw1Gv17", "createdAt": "2024-12-02T12:18:25.843Z", "email": "joseph.clark@example.com", "name": "Joseph Clark" },
    { "_id": "Bd1Nsv6JaCRyNScRNWSIYFxw1Gv18", "createdAt": "2024-12-02T15:30:47.582Z", "email": "lisa.wright@example.com", "name": "Lisa Wright" },
    { "_id": "Bd1Nsv6JaCRyNScRNWSIYFxw1Gv19", "createdAt": "2024-12-02T18:42:55.112Z", "email": "richard.walker@example.com", "name": "Richard Walker" },
    { "_id": "Bd1Nsv6JaCRyNScRNWSIYFxw1Gv20", "createdAt": "2024-12-03T02:05:31.894Z", "email": "patricia.morris@example.com", "name": "Patricia Morris" },
    { "_id": "Bd1Nsv6JaCRyNScRNWSIYFxw1Gv21", "createdAt": "2024-12-03T04:30:29.220Z", "email": "joseph.rodriguez@example.com", "name": "Joseph Rodriguez" },
    { "_id": "Bd1Nsv6JaCRyNScRNWSIYFxw1Gv22", "createdAt": "2024-12-03T08:50:10.997Z", "email": "nancy.james@example.com", "name": "Nancy James" },
    { "_id": "Bd1Nsv6JaCRyNScRNWSIYFxw1Gv23", "createdAt": "2024-12-03T11:05:57.520Z", "email": "kevin.taylor@example.com", "name": "Kevin Taylor" },
    { "_id": "Bd1Nsv6JaCRyNScRNWSIYFxw1Gv24", "createdAt": "2024-12-03T14:25:47.893Z", "email": "susan.hughes@example.com", "name": "Susan Hughes" },
    { "_id": "Bd1Nsv6JaCRyNScRNWSIYFxw1Gv25", "createdAt": "2024-12-03T17:10:15.680Z", "email": "george.king@example.com", "name": "George King" },
    { "_id": "Bd1Nsv6JaCRyNScRNWSIYFxw1Gv26", "createdAt": "2024-12-03T19:55:20.462Z", "email": "dorothy.scott@example.com", "name": "Dorothy Scott" },
    { "_id": "Bd1Nsv6JaCRyNScRNWSIYFxw1Gv27", "createdAt": "2024-12-04T01:12:39.710Z", "email": "steven.green@example.com", "name": "Steven Green" },
    { "_id": "Bd1Nsv6JaCRyNScRNWSIYFxw1Gv28", "createdAt": "2024-12-04T03:30:17.983Z", "email": "barbara.adams@example.com", "name": "Barbara Adams" },
    { "_id": "Bd1Nsv6JaCRyNScRNWSIYFxw1Gv29", "createdAt": "2024-12-04T06:45:40.241Z", "email": "paul.robinson@example.com", "name": "Paul Robinson" },
    { "_id": "Bd1Nsv6JaCRyNScRNWSIYFxw1Gv30", "createdAt": "2024-12-04T09:20:25.672Z", "email": "nancy.evans@example.com", "name": "Nancy Evans" }
  ];
// Add users to Firestore
async function addUsersToFirestore() {
  const userCollection = db.collection('users');  // Assuming the collection name is 'users'

  try {
    for (const user of users) {
      // Add each user document to Firestore with their _id as the document ID
      await userCollection.doc(user._id).set({
        createdAt: admin.firestore.Timestamp.fromDate(new Date(user.createdAt)),
        email: user.email,
        name: user.name
      });

      console.log(`User ${user.name} added successfully`);
    }
  } catch (error) {
    console.error('Error adding user:', error);
  }
}

// Call the function to add users
addUsersToFirestore();
