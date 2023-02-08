import {
  collection,
  getDocs,
  doc,
  getDoc,
  query,
  where,
  orderBy,
  updateDoc,
  writeBatch,
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

//UPDATE Favourited
export const updateFavourited = async (id, favourite) => {
  //Get Document Reference
  const docRef = doc(db, 'products', id);
  await updateDoc(docRef, { favourited: favourite });
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

//Do this way for purpose of having an example with more than one where clause.
export const getInventoryByProductIdAndSize = async (productId, size) => {
  const q = query(
    collection(db, 'inventory'),
    where('productId', '==', productId),
    where('size', '==', Number(size))
  );
  const querySnapshot = await getDocs(q);
  const docs = querySnapshot.docs;
  return docs[0].data();
};

export const batchQuantityUpdate = async (cart) => {
  try {
    // Get a new write batch
    const batch = writeBatch(db);

    for (let i = 0; i < cart.length; i++) {
      const product = cart[i];
      for (let j = 0; j < product.order.length; j++) {
        const docRef = doc(db, 'inventory', product.order[j].inventoryId);
        const docSnap = await getDoc(docRef);
        const remainingQty =
          docSnap.data().quantity - product.order[j].quantity;
        if (remainingQty >= 0) {
          batch.update(docRef, 'quantity', remainingQty);
        } else {
          throw 'Unable to process order. Not enough stock on at least one of the items in the cart.';
        }
      }
    }
    // Commit the batch
    await batch.commit();
  } catch (e) {
    throw e;
  }
};
