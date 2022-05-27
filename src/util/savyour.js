
export const savyourOrderPlace = (order, cart) => {
  if (window.savyour) {
    window.savyour('orderPlace', {
      order_id: order.OrderNumber,
      cart_total: order.totalpayableamount,
      cart_items: getFormatedCart(cart)
    })
  }
};


function getFormatedCart(cart) {
  let arr = []
  for (let pr of cart) {
    arr.push({
      "category_name": pr.categoryName,
      "product_amount": pr.price,
      "product_quantity": pr.qty,
      "product_id": pr.id,
      "product_name": pr.productName
    })
  }
  return arr
}