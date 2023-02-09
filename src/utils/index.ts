import { Menu } from "@/types/api";

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

export const getMenuPath = (list: Menu.MenuItem[]): string[] => {
  return list.reduce((result: string[], item: Menu.MenuItem) => {
    return result.concat(
      Array.isArray(item.children) && !item.buttons
        ? getMenuPath(item.children)
        : item.path + ""
    );
  }, []);
};

export const findBreadCrumb = (
  tree: Menu.MenuItem[],
  pathName: string,
  path: string[]
): string[] => {
  if (!tree) return [];
  for (const data of tree) {
    path.push(data.menuName);
    if (data.path === pathName) return path;
    if (data.children?.length) {
      const list = findBreadCrumb(data.children, pathName, path);
      if (list?.length) return list;
    }
    path.pop();
  }
  return [];
};
