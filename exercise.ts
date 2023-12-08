class TimeMap {
  map: Map<string, { timestamp: number; value: string }[]>;
  constructor() {
    this.map = new Map();
  }

  set(key: string, value: string, timestamp: number): void {
    const values = this.map.get(key);
    if (!values) {
      this.map.set(key, [{ timestamp, value }]);
      return;
    }
    values.push({ timestamp, value });
  }

  get(key: string, timestamp: number): string {
    const values = this.map.get(key);
    if (!values) return '';

    function search(
      target: number,
      arr: { timestamp: number; value: string }[],
    ) {
      let left = 0;
      let right = arr.length - 1;

      while (right - left > 1) {
        const mid = Math.floor((left + right) / 2);
        if (target > arr[mid].timestamp) {
          left = mid;
        } else {
          right = mid;
        }
      }
      if (arr[left].timestamp === target) return [left, left, right];
      if (arr[right].timestamp === target) return [right, left, right];
      return [-1, left, right];
    }
    const [i, l, r] = search(timestamp, values);
    if (i === -1) {
      if (values[r].timestamp < timestamp) return values[r].value;
      if (values[l].timestamp < timestamp) return values[l].value;
      return '';
    }
    return values[i].value;
  }
}
// 10,15,25
// l=0,r=2,m=1
let obj = new TimeMap();
obj.set('love', 'high', 10);
obj.set('love', 'low', 15);
console.log(obj.get('love', 5));
obj.set('love', 'medium', 25);
console.log(obj.get('love', 14));

/**
 * Your TimeMap object will be instantiated and called as such:
 * var obj = new TimeMap()
 * obj.set(key,value,timestamp)
 * var param_2 = obj.get(key,timestamp)
 */
