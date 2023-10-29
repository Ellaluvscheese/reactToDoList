import React, { useEffect, useState } from 'react';
import {getDocs, collection, where, query, doc, updateDoc, arrayRemove, arrayUnion} from 'firebase/firestore';
import { database, auth } from '../Config/firebase';


function TypedUserItem(){
  const currentUser = auth.currentUser;
  const [listData, setListData] = useState([]);

  const fetchListData = async (usersEmail) => {
    const collectionRef = collection(database, 'users');
    const found = query(collectionRef, where('email', '==', usersEmail));
    
    try {
      const foundDoc = await getDocs(found);

      if (!foundDoc.empty) {
        const items = foundDoc.docs[0].data().to_do;
        setListData(items);
      } else {
        console.log('No matching documents found. ');
      }
    }catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (currentUser) {
      fetchListData(currentUser.email);
    }
  }, [currentUser]);

  // const addToDone = async (item, currentUser) => {
  //   console.log({item})
  //   const collectionRef = collection(database, 'users');

  //   const found = await getDocs(query(collectionRef, where('email', '==', currentUser.email)));
 
  //   if (!found.empty) {
  //     const userDoc = found.docs[0];

  //     const docRef = doc(collectionRef, userDoc.id);

  //     // await updateDoc(docRef, {
  //     //   to_do: arrayUnion(item)
  //     // });

  //     await updateDoc(docRef, {
  //       'done': arrayUnion(item)
  //     });
  //   }else {
  //     console.log('No matching documents found');
  //   }
  // }

  // const handleDone = (item) => {
  //   // const updatedListData = [...listData];
  //   // updatedListData.splice(i, 1);

  //   addToDone(item, currentUser);

  //   // setListData(updatedListData);
  // }
   
    return(
     <div>
      <div className='card' >
        <h3>Your List: </h3>
        <ul>
          {listData.map((item, i) => { 
            if (i === 0 ) {
              return null
            }else {
              // <button onClick={handleDone(item)} className='buttonBoi' >done</button>
            return <li key={i}>{item} </li>
            }
})} 
        </ul>
      </div>
      {/* <div>
        <h3>Finished Task Counter: </h3>
        <h3 id='count'>0 Done</h3> 
      </div> */}
     </div>
    );
}

export default TypedUserItem;