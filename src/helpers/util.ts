export function formatDate(dateStr: any) {
  let dateObj = typeof dateStr === "object" ? dateStr : new Date(dateStr);
  let time = dateObj.getTime();
  let now = new Date().getTime();
  let space = now - time;
  console.log(time);

  let str = "";
  switch (true) {
    case space < 1000 * 60:
      str = "刚刚";
      break;
    case space < 1000 * 3600:
      str = Math.floor(space / (1000 * 60)) + "分钟前";
      break;
    case space < 1000 * 3600 * 24:
      str = Math.floor(space / (1000 * 3600)) + "小时前";
      break;
    case space < 1000 * 3600 * 24 * 30:
      str = Math.floor(space / (1000 * 3600 * 24)) + "天前";
      break;
    case space < 1000 * 3600 * 24 * 365:
      str = Math.floor(space / (1000 * 3600 * 24 * 30)) + "月前";
      break;
    default:
      str = Math.floor(space / (1000 * 3600 * 24 * 365)) + "年前";
      break;
  }
  return str;
}
