export const formatPrice = (number) => {
    // return new Intl.NumberFormat('ru-RU', {
    //     style: 'currency',
    //     currency: 'RUB',
    // }).format(number);
    return `${number} ₽`
};
