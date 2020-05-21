function newOrder(a, b, c, d){
  orderDetails = {
    orderDate: new Date(a), // from Zuora e.g. "2020-1-1"
    effectiveDate: new Date(b), // from Zuora e.g. "2020-12-31"
    orderPrice: c, // from Zuora e.g. $100
    orderDiscount: d, // from Zuora e.g. $20
  }
};
  
function refund(type, value) {
  date = orderDetails.effectiveDate;
  let refundPercent
    if (type == "percent") {
      refundPercent = value / 100;
    } else { 
      refundPercent = value / (orderDetails.orderPrice + orderDetails.orderDiscount);
    };
    if (refundPercent > 1) 
      return alert("You can't refund an amount greater than the original order price.")
  duration = (orderDetails.effectiveDate.getTime() - orderDetails.orderDate.getTime()) / (1000 * 3600 * 24);
  daysMinus = duration * refundPercent;
  date.setDate(date.getDate() - daysMinus);
  return newOrderDetails = {
      effectiveDate: date,
      effectivePrice: orderDetails.orderPrice * (1 - refundPercent),
      effectiveDiscount: orderDetails.orderDiscount * (1 - refundPercent),
  }
};

/* tests */

newOrder("2020-1-1", "2020-12-31", 100, 20);
refund("percent", 50); 
// effectiveDate = "2020-07-02"
// effectivePrice = $50
// effectiveDiscount = $10

newOrder("2020-1-1", "2020-12-31", 100, 20);
refund("percent", 10); 
// effectiveDate = "2020-11-25"
// effectivePrice = $90
// effectiveDiscount = $18

newOrder("2020-1-1", "2020-12-31", 100, 20);
refund("dollar", 60); 
// effectiveDate = "2020-07-02"
// effectivePrice = $50
// effectiveDiscount = $10

newOrder("2020-1-1", "2020-12-31", 100, 20);
refund("dollar", 130); 
// alert "You can't refund an amount greater than the original order price.
// return
