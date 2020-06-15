function newOrder(a, b, c, d, e){
  orderDetails = {                    
    orderNum: a,                     // order # from Zuora e.g. 123456
    orderDate: new Date(b),          // order date from Zuora e.g. "2020-1-1"
    effectiveDate: new Date(c),      // effective date from Zuora e.g. "2020-12-31"
    pricePaid: d,                    // price paid from Zuora e.g. $100
    discountReceived: e,             // discount received from Zuora e.g. $20
  }
};
  
function refund(type, value) {
  date = new Date(orderDetails.effectiveDate);
  let refundPercent
    if (type == "percent") {
      refundPercent = value / 100;
    } else { 
      refundPercent = value / orderDetails.pricePaid;
    };
    if (refundPercent > 1) 
      return alert("You can't refund an amount greater than the original price.")
  duration = (orderDetails.effectiveDate.getTime() - orderDetails.orderDate.getTime()) / (1000 * 3600 * 24);
  daysMinus = duration * refundPercent;
  date.setDate(date.getDate() - daysMinus);
  return orderDetailsNew = {
      cancellationEffectiveDate: date,
      newPrice: orderDetails.pricePaid * (1 - refundPercent),
      newDiscount: orderDetails.discountReceived * (1 - refundPercent),
      refundAmount: orderDetails.pricePaid * refundPercent,
  }
};

/* tests */

newOrder(123456, "2020-1-1", "2020-12-31", 100, 20);
// order # = 123456
// order date = 2020-1-1
// cancellation effective date = 2020-12-31
// price paid = 100
// discount received = 20

refund("percent", 50); 
// cancellation effective date = "2020-07-02"
// new price = $50
// new discount = $10
// refund amount = $50

refund("percent", 10); 
// cancellation effective date = "2020-11-25"
// new price = $90
// new discount = $18
// refund amount = $10

refund("dollar", 60); 
// cancellation effective date = "2020-05-26"
// new price = $40
// new discount = $8
// refund amount = $60

refund("dollar", 130); 
// alert "You can't refund an amount greater than the original order price.
// return
