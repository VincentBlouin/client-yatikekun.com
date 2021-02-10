const Transaction = {
    timePickerToQuantity: function (timePickerQuantity) {
        const quantities = timePickerQuantity.split(":");
        const hours = parseInt(quantities[0]);
        const minutes = parseInt(quantities[1]);
        const minutesDecimal = Transaction.minutesToDecimal(minutes);
        return hours + minutesDecimal;
    },
    quantityToFormatted: function (quantity) {
        const hours = Math.floor(quantity);
        const minutes = (quantity - hours) * 60;
        return hours + "h" + minutes + "m";
    },
    minutesToDecimal: function (minutes) {
        return minutes / 60;
    }
};
export default Transaction;