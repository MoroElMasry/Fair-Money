class GroupHistory {
  groupHistoryArr;

  constructor(arr) {
    this.groupHistoryArr = arr;
  }

  _roundNumber(number) {
    return (Math.round(number * 4) / 4).toFixed(2);
  }

  _calculateNewEntry(entry, amount) {
    // console.log(entry.amount);
    // console.log(amount);
    let message = "";
    if (Number(entry.amount) >= Number(amount)) {
      entry.amount -= amount;
      entry.amount = this._roundNumber(entry.amount);
      if (Number(entry.amount) === 0)
        message = `${entry.inDebt} paid all the money ${entry.inDebt} owe ${entry.inDebtTo}`;
      else
        message = `${entry.inDebt} paid ${amount} from ${
          +amount + +entry.amount
        } pounds, ${entry.inDebt} still owe ${entry.inDebtTo} ${
          entry.amount
        } pounds`;
      return [entry, message];
    }
    const tempUser = entry.inDebt;
    entry.inDebt = entry.inDebtTo;
    entry.inDebtTo = tempUser;
    entry.amount = this._roundNumber(Math.abs(entry.amount - amount));
    message = `${entry.inDebt} now owe ${entry.inDebtTo} ${entry.amount} pounds`;
    return [entry, message];
  }

  payDept(inDebt, inDebtTo, amount) {
    let historyOfInDebtUser = this.groupHistoryArr.filter(
      (el) => el.inDebt === inDebt && inDebtTo.includes(el.inDebtTo)
    );
    this.groupHistoryArr = this.groupHistoryArr.filter(
      (el) => el.inDebt !== inDebt
    );
    const amountPerUser = this._roundNumber(amount / inDebtTo.length);
    inDebtTo
      .filter(
        (val) => !historyOfInDebtUser.map((el) => el.inDebtTo).includes(val)
      )
      .forEach((el) =>
        historyOfInDebtUser.push({
          inDebt: inDebt,
          inDebtTo: el,
          amount: 0,
        })
      );
    // return historyOfInDebtUser;
    historyOfInDebtUser = historyOfInDebtUser.map((el) =>
      this._calculateNewEntry(el, amountPerUser)
    );
    const records = historyOfInDebtUser.map((el) => el[1]);
    historyOfInDebtUser = historyOfInDebtUser
      .map((el) => el[0])
      .filter((el) => +el.amount !== 0);
    this.groupHistoryArr = this.groupHistoryArr.concat(historyOfInDebtUser);
    return records;
  }
}
const temp = new GroupHistory([
  { inDebt: "peter", inDebtTo: "nady", amount: "100" },
  { inDebt: "peter", inDebtTo: "kamal", amount: "30" },
  { inDebt: "peter", inDebtTo: "moro", amount: "130" },
  { inDebt: "nady", inDebtTo: "ahmed", amount: "70" },
  { inDebt: "kamal", inDebtTo: "ahmed", amount: "100" },
]);
console.log(temp.payDept("peter", ["nady", "ahemd", "kamal", "roma"], "300"));
console.log(temp.groupHistoryArr);
module.exports = GroupHistory;
