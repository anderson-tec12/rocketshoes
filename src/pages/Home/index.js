import React, { Component } from 'react';
import { MdAddShoppingCart } from 'react-icons/md';
import { formatPrice } from '../../util/format';
import API from '../../services/api';
import { ProductList } from './styles';

import { bindActionCreators } from 'redux';


import { connect } from 'react-redux';

import * as CardActions from '../../store/modules/cart/actions';
class Home extends Component {
  state = {
    products: [],
  };

  async componentDidMount() {
    const response = await API.get('products');

    const data = response.data.map((product) => ({
      ...product,
      priceFormatted: formatPrice(product.price),
    }));

    this.setState({ products: data });
  }

  handleAddProduct = (product) => {
    const { addToCartRequest } = this.props;
    addToCartRequest(product.id);


  };

  render() {
    const { products } = this.state;
    const { amount } = this.props;

    console.log('amount dos BTNS', amount);
    return (
      <ProductList>
        {products.map((product) => (
          <li key={product.id}>
            <img src={product.image} alt={product.title} />
            <strong>{product.title}</strong>
            <span>{product.priceFormatted}</span>

            <button
              type="button"
              onClick={() => this.handleAddProduct(product)}
            >
              <div>
                <MdAddShoppingCart size={16} color="#fff" />
                {amount[product.id] || 0}
              </div>
              <span>ADICIONAR AO CARRINHO</span>
            </button>
          </li>
        ))}
      </ProductList>
    );
  }
}

const mapStateToProps = (state) => ({
  amount: state.cart.reduce((amount, product) => {
    amount[product.id] = product.amount;
    return amount;
  }, {}),
});


const mapDispatchToProps = (dispatch) =>
  bindActionCreators(CardActions, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(Home);
