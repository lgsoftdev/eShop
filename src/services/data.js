//import { async } from '@firebase/util';
import { collection, getDocs } from 'firebase/firestore';
//import { isInputElement } from 'react-router-dom/dist/dom';
import db from '../../config/firebase';

//GET all products
export const getAllProducts = async () => {
  //Get collection reference
  const collectionRef = collection(db, 'products');
  const querySnapshot = await getDocs(collectionRef);
  const docs = querySnapshot.docs;
  const data = docs.map((item) => {
    const object = { ...item.data() };
    object.id = item.id;
    return object;
  });
  return data;
};
