import { redirect } from 'next/navigation';
import styles from './page.module.scss';

export default function Page() {
  redirect('/home');
}

<img
  src="/path/to/image.jpg"
  alt="Descrição da imagem"
  className={styles.homeImage}
/>
