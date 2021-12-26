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
        let minutes = Math.round((quantity - hours) * 60);
        const isZeroMinutes = minutes === 0;
        if (hours === 0 && !isZeroMinutes) {
            return minutes + "m"
        } else {
            if (minutes < 10) {
                minutes = "0" + minutes;
            }
            return hours + "h" + minutes;
        }
    },
    giverFullname: function (transaction) {
        if (transaction.giver) {
            return transaction.giver.firstname + " " + transaction.giver.lastname;
        }
        if (transaction.giverOrg) {
            return transaction.giverOrg.name;
        }
        return "";
    },
    receiverFullname: function (transaction) {
        if (transaction.receiver) {
            return transaction.receiver.firstname +
                " " +
                transaction.receiver.lastname;
        }
        if (transaction.receiverOrg) {
            return transaction.receiverOrg.name;
        }
        return "";
    },
    minutesToDecimal: function (minutes) {
        return minutes / 60;
    },
    balance: function (transaction, entityId, isOrg) {
        const isGiver = (!isOrg && transaction.GiverId !== null && transaction.GiverId === entityId)
            || (isOrg && transaction.GiverOrgId !== null && transaction.GiverOrgId === entityId);
        return isGiver
            ? transaction.balanceGiver
            : transaction.balanceReceiver;
    }
};
export default Transaction;
