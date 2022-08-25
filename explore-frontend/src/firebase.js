import { initializeApp } from "firebase/app"
import { getFirestore, getDoc, query, onSnapshot, collection, doc, updateDoc } from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyAyAd0nrX_gQ4h7SP2b13R20oGoSouKEkY",
    authDomain: "utflukt-8e4be.firebaseapp.com",
    projectId: "utflukt-8e4be",
    storageBucket: "utflukt-8e4be.appspot.com",
    messagingSenderId: "957956879112",
    appId: "1:957956879112:web:87866a974d9c1fcbe632bd",
    measurementId: "G-SGYBBZCQ88"
  };

// Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

const getTripIdMaps = async () => {
    const tripNameIdMap = {}
    const tripIdNameMap = {}
    const trips = query(collection(db, 'trips'))
    onSnapshot(trips, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
            tripNameIdMap[doc.data().Name] = doc.id
        } )
    } )
    // reverse map
    for (const [key, value] of Object.entries(tripNameIdMap)) {
        tripIdNameMap[value] = key
    }
    return [tripNameIdMap, tripIdNameMap]
}

const getUserIdMaps = async () => {
    const userNameIdMap = {}
    const userIdNameMap = {}
    const users = query(collection(db, 'users'))
    onSnapshot(users, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
            userNameIdMap[doc.data().Name] = doc.id
        } )
    } )
    for (const [key, value] of Object.entries(userNameIdMap)) {
        userIdNameMap[value] = key
    }
    return [userNameIdMap, userIdNameMap]
}

const registerUserOnTrip = async (userId, tripId) => {
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);

    const tripRef = doc(db, "trips", tripId);
    const tripSnap = await getDoc(tripRef);

    if ( !(userSnap.exists() && tripSnap.exists()) ) {
        return null
    }

    const trip = tripSnap.data()

    if (trip.registered.length >= trip.Seats) {
        await updateDoc(tripRef, {
            waitlist : [...trip.waitlist, userId]
          });
        // Add to waitlist
        return null
    }

    if (trip.registered.includes(userId)) {
        // Already registered
        console.log("Already registered")
        return null
    }

    // Add to registered
    await updateDoc(tripRef, {
        registered : [...trip.registered, userId]
      });
}

const cancelRegistration = async (userId, tripId) => {
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);

    const tripRef = doc(db, "trips", tripId);
    const tripSnap = await getDoc(tripRef);

    if ( !(userSnap.exists() && tripSnap.exists()) ) {
        return null
    }

    const trip = tripSnap.data()

    if (!trip.registered.includes(userId)) {
        // Not registered
        console.log("Not registered")
        return null
    }

    // Remove from registered
    await updateDoc(tripRef, {
        registered : trip.registered.filter(id => id !== userId)
        });
    console.log("Cancelled registration for user " + userId + " on trip " + tripId)

    // If waitlist is not empty, add to registered
    if (trip.waitlist.length > 0) {
        const userId = trip.waitlist.shift()
        await updateDoc(tripRef, {
            registered : [...trip.registered, userId],
            waitlist : trip.waitlist
        });
        console.log("Added user " + userId + " to registered on trip " + tripId)
    }
    return trip.Cancellation_fee

}

export {db, getTripIdMaps, getUserIdMaps, registerUserOnTrip, cancelRegistration}