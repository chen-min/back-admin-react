export const formatMoney = (num?: number | string) => {
  if (!num) return "0.00";
  const a = parseFloat(num.toString());
  return a.toLocaleString("en-US", { style: "currency", currency: "USD" });
};

export const formatDate = (date?: Date, rule?: string) => {
  let curDate = new Date();
  if (date) curDate = date;
  if (rule === "yyyy-MM-dd")
    return curDate.toLocaleDateString().replaceAll("/", "-");
  if (rule === "HH:mm:ss")
    return curDate.toLocaleTimeString().replaceAll("/", "-");
  return curDate.toLocaleString().replaceAll("/", "-");
};
