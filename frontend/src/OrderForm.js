import React, { useState, useEffect } from 'react';
import { addOrder, getSandwiches } from './config/api'; 
import CounterInput from './components/CounterInput';



function OrderForm() {
  //Used to store the current order in JSON format
  const [sandwichOrdersJSON, setsandwichOrdersJSON] = useState([]);
  //Used to store all the sanwiches fetched from the backend
  const [sandwiches, setSandwiches] = useState([]);
  const [quantities, setQuantities] = useState({});

  
  //Fetches the sandwiches from the backend only when the page loads
  useEffect(() => {
    const fetchSandwiches = async () => {
        try {
            const fetchedSandwiches = await getSandwiches();
            setSandwiches(fetchedSandwiches);   
            // 初始化计数器
            const initialQuantities = {};
            fetchedSandwiches.forEach(sandwich => {
              initialQuantities[sandwich._id] = 0;
            });
            setQuantities(initialQuantities);
        } catch (error) {
            console.error('Error fetching sandwiches:', error);
        }
    };

    fetchSandwiches();
}, []);

  const handleIncrement = (id) => {
    setQuantities(prev => ({
      ...prev,
      [id]: prev[id] + 1
    }));
  };

  const handleDecrement = (id) => {
    setQuantities(prev => ({
      ...prev,
      [id]: prev[id] > 0 ? prev[id] - 1 : 0
    }));
  };


  //Called when the user clicks the "Place order" button
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      //TODO: Test thay the implementation works
      //Removes the name from the stored JSON order
      var updatedSandwiches = [];
      for (var i = 0; i < sandwichOrdersJSON.length; i++) {
        updatedSandwiches.push({
          quantity: sandwichOrdersJSON[i].quantity,
          id: sandwichOrdersJSON[i].id,
        });
      }

      //TODO: Test that the implementation works
      //Constructs the order object
      var orderObject = {
        sandwiches: updatedSandwiches,
        status: 'ordered',
      };
      //Send the order to the backend. orderObject = body of the request
      const result = await addOrder(orderObject);
      alert('Order placed! Order ID: ' + result._id);
    } catch (error) {
      console.error('Failed to place order:', error);
      alert('Failed to place order.');
    }
  };

  //Called when the user clicks the "Add to cart" button in the sandwich list
  const addToCart = async (id, quantity, name) => {
    //console.log('Adding to cart:', id, quantity, name);
    //TODO: Check if the sandwich is already in the cart
    //TODO: if it is, update the quantity
    //if it is not, add it to the cart with correct quantity
    
    //setsandwichOrdersJSON([...sandwichOrdersJSON, { id, quantity, name }]);
    
    // Check if there's the same sandwich in the cart
    const existingSandwichIndex = sandwichOrdersJSON.findIndex(sandwich => sandwich.id === id);

    // If the sandwich has already exists，update its number
    if (existingSandwichIndex !== -1) {
      // Create a new Order array
      const newSandwichOrdersJSON = sandwichOrdersJSON.map((sandwich, index) => {
        if (index === existingSandwichIndex) {
          // If the sandwich matches，return an updated new object
          return { ...sandwich, quantity: quantity };
        }
        return sandwich;
      });

      // Set new status
      setsandwichOrdersJSON(newSandwichOrdersJSON);
    } else {
      // If sandwich in not in the cart，add a new item
      setsandwichOrdersJSON([...sandwichOrdersJSON, { id, quantity, name }]);
    }
    //alert('Add to cart : ' + name + ' *' + quantity);
  }



  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden'  }}>
      <div style={{
        flex: 1,
        overflowY: 'auto',
        marginRight: '550px',
        padding: '20px' // 增加内边距使内容不紧贴边缘
      }}>
        {sandwiches.map((sandwich) => (
          <div
            key={sandwich._id}
            style={{
              margin: '10px',
              padding: '20px',
              backgroundColor: '#ffffff', // 背景色为纯白
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)', // 添加阴影效果增加立体感
              borderRadius: '8px', // 添加圆角
              display: 'flex',
              flexDirection: 'column', // 竖直堆叠元素
              alignItems: 'start', // 对齐到起始边
            }}
          >
            <h2 style={{ margin: '0 0 10px 0', color: '#333' }}>{sandwich.name}</h2>
            <p style={{ margin: '0 0 20px 0', fontSize: '16px', color: '#666' }}>
              Bread Type: {sandwich.breadType}
            </p>
            <CounterInput
              value={quantities[sandwich._id]}
              onIncrement={() => handleIncrement(sandwich._id)}
              onDecrement={() => handleDecrement(sandwich._id)}
            />
            <button
              type="button"
              onClick={() => {
                // 只有当数量大于0时，才执行addToCart
                if (quantities[sandwich._id] > 0) {
                  addToCart(sandwich._id, quantities[sandwich._id], sandwich.name);
                }
              }}
              style={{
                marginTop: '10px',
                backgroundColor: '#007bff', // 蓝色按钮
                color: 'white', // 文字颜色
                border: 'none',
                borderRadius: '5px',
                padding: '10px 15px',
                cursor: 'pointer',
                transition: 'background-color 0.3s', // 过渡动画
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'} // 鼠标悬浮时变深
              onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'} // 鼠标移开时恢复
            >
              Add to cart
            </button>
          </div>
        ))}
      </div>

      <div style={{
        width: '400px',
        position: 'fixed',
        right: '50px',
        top: '70px',
        height: '80vh',
        overflowY: 'auto',
        backgroundColor: '#FFB6C1',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)', // 添加阴影效果
        borderRadius: '10px', // 圆角边框
        padding: '20px' // 增加内边距
      }}>
        <form onSubmit={handleSubmit}>
          <div>
            <h2 style={{
              textAlign: 'center', // 标题居中
              marginBottom: '20px', // 增加标题下方的间距
              color: '#333', // 深色字体增强可读性
              fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' // 更改字体样式
            }}> Shopping Cart</h2>
            <div>
              {/** 动态列表项目 */}
              {sandwichOrdersJSON.map(order => (
                <div key={order.id} style={{
                  padding: '10px',
                  borderBottom: '1px solid #ccc',
                  marginBottom: '10px', // 项目间增加间距
                  borderRadius: '5px', // 轻微圆角
                  backgroundColor: 'white', // 每个项目用白色背景突出
                  boxShadow: '0 2px 4px rgba(0,0,0,0.05)' // 为每个项目添加轻微阴影
                }}>
                  <p style={{ fontWeight: 'bold', color: '#333' }}>{order.name} - Quantity: {order.quantity}</p>
                </div>
              ))}
            </div>
            <button type="submit" onClick={handleSubmit} style={{
              width: '100%', // 按钮宽度与容器一致
              padding: '10px 0', // 增加按钮的垂直内边距
              backgroundColor: '#FF69B4', // 按钮颜色
              color: 'white', // 按钮文字颜色
              border: 'none', // 移除边框
              borderRadius: '5px', // 圆角按钮
              cursor: 'pointer', // 鼠标悬停时指针变化
              fontSize: '16px', // 增大字体大小
              fontWeight: 'bold' // 字体加粗
            }}>
              Place order
            </button>
          </div>            
        </form>   
      </div>
 
    </div>
  );
}

export default OrderForm;