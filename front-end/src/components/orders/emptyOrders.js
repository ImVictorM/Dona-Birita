import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import astronaut from '../../images/astronaut.png';
import styles from './emptyOrders.module.scss';

function EmptyOrders() {
  return (
    <div className={ styles.empty }>
      <p className={ styles.empty__paragraph }>
        Parece que você ainda não fez nenhum pedido...
        <br />
        Que tal fazer um agora mesmo clicando
        <Link
          to="/customer/products"
          className={ styles.empty__paragraph__link }
        >
          aqui!

        </Link>
      </p>

      <div className={ styles.empty__wrapper }>
        <img
          src={ astronaut }
          alt="astronauta perdido no espaço"
          className={ styles.empty__wrapper__image }
        />
        <span className={ styles.empty__wrapper__span }>..Nada encontrado..</span>
      </div>
    </div>
  );
}

export default EmptyOrders;
