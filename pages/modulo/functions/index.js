export function handleCurrency (money) {
    let curr = new Intl.NumberFormat('es-ar', 
    { 
      style: 'currency', 
      currency: 'ARS', 
      minimumFractionDigits: 0
    }).format(money);
    return curr;
}