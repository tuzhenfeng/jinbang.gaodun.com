
export interface College {
  id: string;
  name: string;
  province: string;
  tier: string;
  scoreLine: number[];
  tags: string[];
  enroll: number;
}
export const colleges: College[] = [
  { id: 'c1', name: '青春大学', province: '北京', tier: '一本', scoreLine: [620,615,610], tags: ['综合','理工'], enroll: 1200 },
  { id: 'c2', name: '希望理工学院', province: '江苏', tier: '一本', scoreLine: [590,585,580], tags: ['理工'], enroll: 800 },
  { id: 'c3', name: '东方学院', province: '浙江', tier: '二本', scoreLine: [540,535,530], tags: ['商科'], enroll: 1000 }
]
