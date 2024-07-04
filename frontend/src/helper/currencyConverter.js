const formatPrice = (price) => {
    if (price == null) {
        return "N/A";
    }
    return price.toLocaleString('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    });
};


export default formatPrice;