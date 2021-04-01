// 给定起止日期，返回中间的所有月份
// 输入两个字符串 2018-08  2018-12
// 输出他们中间的月份 [2018-10, 2018-11]
// ! 时间处理问题一定要考虑到使用 Date 的 api

function formatDate(date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, 0)}`;
}

function getRangeMonth(startDateStr, endDateStr) {
  let startTime = new Date(startDateStr).getTime();
  let endTime = new Date(endDateStr).getTime();

  let res = [];
  // 日期大小比较问题转化成时间戳比较
  while (startTime < endTime) {
    let curTime = new Date(startTime);
    res.push(formatDate(curTime));
    // ! setMonth 会自动处理大于 11 的情况
    startTime = curTime.setMonth(curTime.getMonth() + 1);
  }
  return res.slice(1);
}

let res = getRangeMonth("2018-09", "2020-02");
console.info("🎈 %c[flag]\n", "color: #1890ff;", res);
