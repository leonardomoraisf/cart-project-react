import React from 'react';

const TableRow = ({data, handleDeleteProduct, handleUpdateProduct}) => {
  return (
    <tr>
      <td>
        <div className='product'>
          <img src='https://picsum.photos/100/120' alt='' />
          <div className='info'>
            <div className='name'>{data.name}</div>
            <div className='category'>{data.category}</div>
          </div>
        </div>
      </td>
      <td>R$ {data.price}</td>
      <td>
        <div className='qty'>
          <button>
            <i className='bx bx-minus' onClick={() => {handleUpdateProduct(data, 'decrease')}}></i>
          </button>
          <span>{data.qtd}</span>
          <button>
            <i className='bx bx-plus' onClick={() => {handleUpdateProduct(data, 'increase')}}></i>
          </button>
        </div>
      </td>
      <td>R$ {data.price * data.qtd}</td>
      <td>
        <button className='remove' onClick={() => {handleDeleteProduct(data);}}>
          <i className='bx bx-x'></i>
        </button>
      </td>
    </tr>
  );
};

export default TableRow;
