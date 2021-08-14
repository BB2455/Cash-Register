function checkCashRegister(price, cash, cid) {
  let status = { status: "OPEN", change: [] };
  // Creates Deep Copy of cash in drawer (cid)
  function createDeepCopy(arr) {
    let newArr = [];
    for (let i = 0; i < arr.length; i++) {
      if (Array.isArray(arr[i])) {
        newArr.push(createDeepCopy(arr[i]));
      } else {
        newArr.push(arr[i]);
      }
    }
    return newArr;
  }
  let cidCopy = createDeepCopy(cid);
  // Currency Coversions
  let currency = {
    PENNY: 0.01,
    NICKEL: 0.05,
    DIME: 0.1,
    QUARTER: 0.25,
    ONE: 1,
    FIVE: 5,
    TEN: 10,
    TWENTY: 20,
    "ONE HUNDRED": 100,
  };
  // Checks if cash type can be taken
  function canTakeCash(type, value) {
    if (currency[type] <= value) {
      return true; // Can take from currency type
    }
    return false; // Can't take from currency type
  }
  //Return how much cash type to take
  function takeCash(type, inDrawer, value) {
    let currentCurrency = Math.round(inDrawer / currency[type]);
    let amountNeeded = Math.floor(value / currency[type]);
    let canTake = amountNeeded;
    while (canTake > 0) {
      // If not enough type to take -1 to canTake until it reaches 0 or can return amount that can be taken
      if (canTake <= currentCurrency) {
        return canTake;
      }
      canTake--;
    }
    return 0;
  }
  // Get how much is needed to be handed back
  let changeBack = cash - price;
  let change = []; // What to return
  let total = 0; // Total that in the register (will add up below)
  // Loops over all the currecy types in the cidCopy and will check if that type can be divided into changeBack and can be taken from cidCopy, will also add to total.
  for (let i = cidCopy.length - 1; i >= 0; i--) {
    let currencyType = cidCopy[i][0];
    total = cidCopy[i][1];
    if (!canTakeCash(currencyType, changeBack)) {
      continue;
    }
    let canTake = takeCash(currencyType, cidCopy[i][1], changeBack);
    let taken = currency[currencyType] * canTake;
    changeBack = changeBack - taken;
    // Checks to make sure there is no decimal errors e.g: 0.009999
    if (
      cidCopy[i][0] == "PENNY" &&
      cidCopy[i][1] > 0 &&
      changeBack > 0 &&
      changeBack < 0.01
    ) {
      taken += 0.01;
      changeBack = 0;
    }
    change.push([currencyType, taken]);
    cidCopy[i][1] = cidCopy[i][1] - taken;
    total -= taken;
  }
  // Checks the state if can be return correct change with money left in cid or if there is no money left and check if there is not sufficient funds.
  if (changeBack == 0 && total > 0) {
    status.change = change;
  } else if (changeBack == 0 && total == 0) {
    status.change = cid;
    status.status = "CLOSED";
  } else if (changeBack > 0) {
    status.status = "INSUFFICIENT_FUNDS";
  }
  return status;
}

console.log(
  checkCashRegister(19.5, 20, [
    ["PENNY", 1.01],
    ["NICKEL", 2.05],
    ["DIME", 3.1],
    ["QUARTER", 4.25],
    ["ONE", 90],
    ["FIVE", 55],
    ["TEN", 20],
    ["TWENTY", 60],
    ["ONE HUNDRED", 100],
  ])
);
console.log(
  checkCashRegister(3.26, 100, [
    ["PENNY", 1.01],
    ["NICKEL", 2.05],
    ["DIME", 3.1],
    ["QUARTER", 4.25],
    ["ONE", 90],
    ["FIVE", 55],
    ["TEN", 20],
    ["TWENTY", 60],
    ["ONE HUNDRED", 100],
  ])
);
console.log(
  checkCashRegister(19.5, 20, [
    ["PENNY", 0.01],
    ["NICKEL", 0],
    ["DIME", 0],
    ["QUARTER", 0],
    ["ONE", 0],
    ["FIVE", 0],
    ["TEN", 0],
    ["TWENTY", 0],
    ["ONE HUNDRED", 0],
  ])
);
console.log(
  checkCashRegister(19.5, 20, [
    ["PENNY", 0.5],
    ["NICKEL", 0],
    ["DIME", 0],
    ["QUARTER", 0],
    ["ONE", 0],
    ["FIVE", 0],
    ["TEN", 0],
    ["TWENTY", 0],
    ["ONE HUNDRED", 0],
  ])
);
