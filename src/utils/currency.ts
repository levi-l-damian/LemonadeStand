export const formatCents=(c:number,currency='USD')=>new Intl.NumberFormat(undefined,{style:'currency',currency}).format(c/100);
