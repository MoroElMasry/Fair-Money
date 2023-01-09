const mongoose = require("mongoose");

class HistroyEntry extends mongoose.SchemaType {
  inDebt;

  inDebtTo;

  amount;

  constructor(key, options) {
    super(key, options, "HistroyEntry");
  }

  cast(val) {
    const arr = ["inDebt", "inDebtTo", "amount"];
    if (
      Object.keys(val).length === arr.length &&
      arr.every((el) => Object.prototype.hasOwnProperty.call(val, el))
    ) {
      if (
        !mongoose.Types.ObjectId.isValid(val.inDebt) ||
        !mongoose.Types.ObjectId.isValid(val.inDebtTo) ||
        typeof val.amount === "number"
      ) {
        throw new Error(
          `HistroyEntry: ${val} one of properties have wrong data type`
        );
      } else {
        this.inDebt = val.inDebt;
        this.inDebtTo = val.inDebtTo;
        this.amount = val.amount;
      }
    } else {
      throw new Error(
        `HistroyEntry: ${val} lake some properties or some properties have wrong key name`
      );
    }
    return val;
  }
}

module.exports = HistroyEntry;
