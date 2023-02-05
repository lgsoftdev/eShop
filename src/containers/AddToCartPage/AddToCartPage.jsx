import styles from './AddToCartPage.module.scss';
import { useParams } from 'react-router-dom';
//import { getProductById } from '../../services/data';

const AddToCartPage = () => {
  const params = useParams();
  console.log(params);

  useEffect(() => {}, []);

  return (
    <main className={styles.AddToCartPage}>The product id is {params.id}</main>
  );
};

export default AddToCartPage;
