//import { async } from '@firebase/util';
import {
  collection,
  getDocs,
  doc,
  getDoc,
  query,
  where,
  orderBy,
} from 'firebase/firestore';
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

export const getProductById = async (id) => {
  //Get Document Reference
  const docRef = doc(db, 'products', id);
  const docSnap = await getDoc(docRef);
  return docSnap.data();
};

export const getInventoryByProductId = async (productId) => {
  const q = query(
    collection(db, 'inventory'),
    where('productId', '==', productId),
    orderBy('size', 'asc')
  );
  const querySnapshot = await getDocs(q);
  const docs = querySnapshot.docs;
  const data = docs.map((item) => {
    const object = { ...item.data() };
    object.id = item.id;
    return object;
  });
  return data;
};
