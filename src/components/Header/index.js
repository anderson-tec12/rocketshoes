import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Cart } from './styles';
import { MdShoppingBasket } from 'react-icons/md';


import { connect } from 'react-redux';

import Logo from '../../assets/images/logo.svg';

function components({ cart, cartSize }) {

  return (
    <Container>
      <Link to="/">
        <img src={Logo} alt="Rocketshoes" />
      </Link>

      <Cart to="/cart">
        <div>
          <strong>Meu Carrinho</strong>
          <span>{cartSize} Itens</span>
        </div>
        <MdShoppingBasket size={36} color="#fff" />
      </Cart>
    </Container>
  );
}


export default connect((state) => ({
  cart: state.cart,
  cartSize: state.cart.length,
}))(components);
