const Transaction = {
    timePickerToQuantity: function (timePickerQuantity) {
        const quantities = timePickerQuantity.split(":");
        const hours = parseInt(quantities[0]);
        const minutes = parseInt(quantities[1]);
        const minutesDecimal = Transaction.minutesToDecimal(minutes);
        return parseFloat(hours + minutesDecimal);
    },
    quantityToFormatted: function (quantity) {
        const hours = Math.floor(quantity);
        let minutes = (quantity - hours) * 60;
        if (minutes === 0) {
            minutes = "00";
        }
        return hours + "h" + minutes + "m";
    },
    minutesToDecimal: function (minutes) {
        return minutes / 60;
    }
};
export default Transaction;