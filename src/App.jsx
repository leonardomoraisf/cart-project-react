/*
? DESAFIO - Shopping Cart:

Você deve desenvolver um carrinho de compras funcional.
Funcionalidades que esperamos que você desenvolva:

x - fazer um placeholder para quando não houver produtos no carrinho
x - inserção de novos produtos no carrinho
x - remoção de produtos já inseridos
x - alteração de quantidade de cada item 
todo - cálculo do preço total dos itens inseridos

todo - FUNCIONALIDADE EXTRA: aplicação de cupom de desconto
*/
import './styles.scss';

import PageHeader from './layout/PageHeader';
import PageTitle from './layout/PageTitle';
import Summary from './Summary';
import TableRow from './TableRow';
import { useEffect, useState } from 'react';

import { api } from './provider';

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function App() {
  const [cart, setCart] = useState([]);
  const [isRequesting, setIsRequesting] = useState(false);
  const [getDiscount, setGetDiscount] = useState(0);

  const obProduct = {
    name: 'product',
    category: 'category',
    price: randomNumber(90, 1200),
    qtd: 1,
  };

  const fetchData = () => {
    setIsRequesting(true);

    api.get('cart/list')
      .then((res) => {

        setIsRequesting(false);

        setCart(res.data);
      });

  }

  useEffect(() => {
    fetchData();
  }, [])

  const handleAddProduct = () => {
    setIsRequesting(true);

    // insert product
    api.post('cart/set', obProduct)
      .then((res) => {

        setIsRequesting(false);

        fetchData();
      });
  }

  const handleDeleteProduct = (item) => {
    setIsRequesting(true);

    // delete product
    api.delete('cart/' + item.id + '/delete')
      .then((res) => {

        setIsRequesting(false);

        fetchData();
      });
  }

  const handleUpdateProduct = (item, action) => {
    setIsRequesting(true);
    // change quantity product

    let newQtd = item.qtd;

    if(action === 'decrease'){
      if(newQtd === 1){
        return;
      }
      newQtd -= 1;
    }
    if(action === 'increase'){
      newQtd += 1;
    }

    const newData = {...item, qtd: newQtd};
    api.put('cart/'+item.id+'/update',newData)
    .then((res) => {
      setIsRequesting(false);
      fetchData();
    })
    
  }

  const getTotal = () => {
    let sum = 0;
    
    for (let item of cart){
      sum += item.price * item.qtd;
    }

    return sum;
  };

  let catchTotal = getTotal();

  const handleDiscount = () => {
    if(getDiscount === 1){
      return;
    }

    let discount = catchTotal * 0.15;
    let total = catchTotal;
    catchTotal = total - discount;

    console.log({discount, total, catchTotal})
    
    setGetDiscount(1);
  }

  return (
    <>
      <PageHeader />
      <main>
        <PageTitle data={'Seu carrinho'} />
        <div className='content'>
          <section>
            <button onClick={handleAddProduct} style={{ padding: '5px 10px', marginBottom: 15 }}>Add to cart</button>
            <table>
              <thead>
                <tr>
                  <th>Produto</th>
                  <th>Preço</th>
                  <th>Quantidade</th>
                  <th>Total</th>
                  <th>-</th>
                </tr>
              </thead>
              <tbody>
                {
                  isRequesting &&
                  <tr>
                    <td colSpan='5'>Carregando...</td>
                  </tr>
                }
                {cart.map((item) => {
                  return (
                    <TableRow key={item.id} data={item} handleDeleteProduct={handleDeleteProduct} handleUpdateProduct={handleUpdateProduct}/>
                  );
                })}
                {
                  cart.length === 0 &&
                  <tr>
                    <td colSpan='5'>Carrinho vazio</td>
                  </tr>
                }
              </tbody>
            </table>
          </section>
          <aside>
            <Summary total={catchTotal} discount={handleDiscount}/>
          </aside>
        </div>
      </main>
    </>
  );
}

export default App;
