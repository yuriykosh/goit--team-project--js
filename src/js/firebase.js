import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

import { AuthErrorCodes } from 'firebase/auth';
import { Notify } from 'notiflix';

//refs
const openModalBtn = document.querySelector('[data-modal-auth-open]');
const closeModalBtn = document.querySelector('[data-auth-modal-close]');
const modalEl = document.querySelector('[data-auth-modal]');
const formEl = document.querySelector('.auth-form');
const btnSign = document.querySelector('#signup-btn');
const btnLogin = document.querySelector('#login-btn');
const emailEl = document.querySelector('#email');
const passwordEl = document.querySelector('#password');
const libraryEl = document.querySelector('#library');
const loginEl = document.querySelector('#login');
const logoutEl = document.querySelector('#logout');

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
const STORAGE_KEY = 'login-sign up';

let callCount = JSON.parse(localStorage.getItem(STORAGE_KEY)) || 0;
showLibraryBtn();

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

    openModal();

    Notify.success(`You are logged in`);
    callCount += 1;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(callCount));

    closeModal();
    formEl.reset();
    location.reload();

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

    openModal();
    callCount += 1;

    localStorage.setItem(STORAGE_KEY, JSON.stringify(callCount));

    console.log(callCount);
    Notify.success(`You are successfully signed in`);
    formEl.reset();
    location.reload();

    closeModal();

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

//Log out
const logOut = async () => {
  await signOut(auth);

  localStorage.removeItem(STORAGE_KEY);

  showLibraryBtn();
  location.reload();
};

function openModal() {
  modalEl.classList.remove('is-hidden');
  document.addEventListener('keydown', onEscapeKeyDown);
}

function closeModal() {
  modalEl.classList.add('is-hidden');
  document.removeEventListener('keydown', onEscapeKeyDown);
}

btnLogin.addEventListener('click', onBtnLoginClick);
btnSign.addEventListener('click', onBtnSignClick);
openModalBtn.addEventListener('click', openModal);
closeModalBtn.addEventListener('click', closeModal);
logoutEl.addEventListener('click', logOut);

function onEscapeKeyDown(e) {
  if (e.code === 'Escape') {
    closeModal();
  }
}

function showLibraryBtn() {
  if (callCount) {
    libraryEl.classList.remove('visually-hidden');
    loginEl.classList.add('visually-hidden');
    logoutEl.classList.remove('visually-hidden');
  }
}
