# Cash Register

Cash Register algorithm for the freeCodeCamp JavaScript Algorithms and Data Structures.

## What Is The Problem?

> Design a cash register drawer function `checkCashRegister()` that accepts purchase price as the first argument (`price`), payment as the second argument (`cash`), and cash-in-drawer (`cid`) as the third argument.
>
> `cid` is a 2D array listing available currency.
>
> The `checkCashRegister()` function should always return an object with a `status` key and a `change` key.
>
> Return `{status: "INSUFFICIENT_FUNDS", change: []}` if cash-in-drawer is less than the change due, or if you cannot return the exact change.
>
> Return `{status: "CLOSED", change: [...]}` with cash-in-drawer as the value for the key `change` if it is equal to the change due.
>
> Otherwise, return `{status: "OPEN", change: [...]}`, with the change due in coins and bills, sorted in highest to lowest order, as the value of the `change` key.
>
> |    Currency Unit    |       Amount       |
> | :-----------------: | :----------------: |
> |        Penny        |   $0.01 (PENNY)    |
> |       Nickel        |   $0.05 (NICKEL)   |
> |        Dime         |    $0.1 (DIME)     |
> |       Quarter       |  $0.25 (QUARTER)   |
> |       Dollar        |      $1 (ONE)      |
> |    Five Dollars     |     $5 (FIVE)      |
> |     Ten Dollars     |     $10 (TEN)      |
> |   Twenty Dollars    |    $20 (TWENTY)    |
> | One-hundred Dollars | $100 (ONE HUNDRED) |
>
> See below for an example of a cash-in-drawer array:

```
[
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100]
]
```

## How It Works

- The function takes three arguments, the price of the item, the cash payed, and the current amount of cash in drawer.
- The first step is creating a copy of the `cid` (Cash-in-drawer) so it doesn't change the current `cid` to the change.
- The second step is to setup some variables to keep track of how much change needs to be returned `changeBack` and what is returned `change`, and finally how much cash is in the drawer `total`.
- The third step is to loop through all the `cid` from highest to lowest ($100 -> $0.01) and add to the `total` then check if it can take cash from `cid`. If there is enough it will take as much as it can and subtract from `changeback` and add to `change`, then update the `cid` copy by removing what has been taken.
- After the loop it will check if the `changeBack` is equal to 0 and the total in the `cid` is greater than 0 and will return with the status of "OPEN" and `change`. Else if the `changeBack` and `total` are both 0 it will return the `cid` and status of "CLOSED". Else if the `changeBack` is greater than 0 then it will return with a status of "INSUFFICIENT_FUNDS" and an empty array for the change.
