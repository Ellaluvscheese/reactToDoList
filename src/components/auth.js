import { createUserWithEmailAndPassword, signInWithPopup, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth, googleProvider, database } from "../Config/firebase";
import {useState} from 'react';
import Header from './header';
import { serverTimestamp, collection, addDoc } from 'firebase/firestore';
import Nav from './navigationTime';
import { Link } from 'react-router-dom';

export const Auth = () => {
    const currentUser = auth.currentUser;
    const currentDate = serverTimestamp();
    // const timeStamp = timeStamp.fromDate(currentDate);

    const collectionRef = collection(database, 'users');

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [signUpBool, setSignUpBool] = useState(false);

    const signUpButton = () =>{
       setSignUpBool(true);
    }
    
    // sign up function
    const signUp = async () => {
        try {
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);

          const user = userCredential.user
          const userEmail = user.email
          const data = {
            email: userEmail, 
            joined: currentDate,
            to_do: [''],
            done: ['']
          };
          
            await addDoc(collectionRef, data);
        return (userEmail)
        } catch (error) {
          console.error(error);
        }
      };

    const signIn = async () => {
        try{
            signInWithEmailAndPassword(auth, email, password);   
        } catch (err) {
            console.error(err)
        }

        setSignUpBool(false);
    };

    const signUpWithGoogle = async () => {
        try{
            const slay = await signInWithPopup(auth, googleProvider);
            const user = slay.user
            const userEmail = user.email

            const data = {
                email: userEmail, 
                joined: currentDate,
                to_do: [''],
                done: ['']
              };
              
              await addDoc(collectionRef, data);
        }catch (err){
            console.error(err)
        }

        setSignUpBool(false);
    }

    const signInWithGoogle = async () => {
        try{
             await signInWithPopup(auth, googleProvider);
  
        } catch(err) {
            console.error(err)
        }

        setSignUpBool(false);
    };

    const logOut = async () => {
        try{
            await signOut(auth);
        }catch(err) {
            console.error(err);
        }

    }
    return(
        <div>
            <Header/>
            <Nav/>
            {currentUser ? ( <div>
                <p>Hello {currentUser.email} </p>
                <p>You can go to the <Link to="/home" >Home page</Link> and add items to your To-Do List!</p>
                <button onClick={logOut}>Log Out</button>
                </div> ) :  signUpBool ? (
                <div>
                    <input placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
                    <input placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                    <button onClick={signUp} >Sign Up</button>
                </div>) :  
             <div>
                 <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} ></input>
                 <input placeholder="Password" onChange={(e) => setPassword(e.target.value)}></input>
                 <button onClick={signIn} >Sign In</button>
                 <button onClick={signInWithGoogle} >Sign in with Google</button>
                 <p>OR</p>
                 <button onClick={signUpButton} >Sign Up</button>
                 <button onClick={signUpWithGoogle}>Sign Up with Google</button>
             </div>  
        }
        </div>
    );
};