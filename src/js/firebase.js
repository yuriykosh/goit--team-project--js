import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';

import { AuthErrorCodes } from 'firebase/auth';
import { Notify } from 'notiflix';

//refs
// openModalBtn: document.querySelector('[data-modal-products1-open]'),
const closeModalBtn = document.querySelector('[data-auth-modal-close]');
const modalEl = document.querySelector('[data-auth-modal]');
const formEl = document.querySelector('.auth-form');
const btnSign = document.querySelector('#signup-btn');
const btnLogin = document.querySelector('#login-btn');
const emailEl = document.querySelector('#email');
const passwordEl = document.querySelector('#password');

//options
const firebaseApp = initializeApp({
  apiKey: 'AIzaSyB6-fYDISnqh-ScGsgFwJJynAD_h-V_Izk',
  authDomain: 'filmoteka-3f258.firebaseapp.com',
  databaseURL: 'https://filmoteka-3f258-default-rtdb.firebaseio.com',
  projectId: 'filmoteka-3f258',
  storageBucket: 'filmoteka-3f258.appspot.com',
  messagingSenderId: '864575243852',
  appId: '1:864575243852:web:7f3070c34fb9ee1f3756e9',
});

// Initialize Firebase
const auth = getAuth(firebaseApp);

//login
const onBtnLoginClick = async () => {
  const loginEmail = emailEl.value;
  const loginPassword = passwordEl.value;

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      loginEmail,
      loginPassword
    );
    Notify.success(`You are logged in`);
    toggleModal();
    formEl.reset();
    console.log(userCredential.user);
  } catch (err) {
    if (err.code == AuthErrorCodes.INVALID_PASSWORD) {
      Notify.failure('Wrong password. Please try again.');
      formEl.reset();
    } else {
      Notify.failure(`Error: ${err.message}`);
    }
    console.log(err);
  }
};

btnLogin.addEventListener('click', onBtnLoginClick);

//Sign up
const onBtnSignClick = async () => {
  const loginEmail = emailEl.value;
  const loginPassword = passwordEl.value;

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      loginEmail,
      loginPassword
    );

    toggleModal();
    Notify.success(`You are successfully signed in`);
    formEl.reset();
    console.log(userCredential.user);
  } catch (err) {
    if (err.code == AuthErrorCodes.INVALID_PASSWORD) {
      Notify.failure('Wrong password. Please try again.');
    } else {
      Notify.failure(`Error: ${err.message}`);
    }
    console.log(err);
  }
};

btnSign.addEventListener('click', onBtnSignClick);

//   openModalBtn.addEventListener('click', toggleModal);

function toggleModal() {
  modalEl.classList.toggle('is-hidden');
}

closeModalBtn.addEventListener('click', toggleModal);
