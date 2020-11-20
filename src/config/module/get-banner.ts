/*
 * 获取运行banner
 * @Author: ahwgs
 * @Date: 2020-11-20 20:05:09
 * @Last Modified by: ahwgs
 * @Last Modified time: 2020-11-20 20:05:30
 */

import * as fs from 'fs';
import * as path from 'path';
const bannerPath = path.join(process.cwd(), 'src/assets/banner.txt');

const getBanner = async () => {
  try {
    const result = await fs.readFileSync(bannerPath, 'utf-8');
    return result;
  } catch (e) {
    console.log(e);
  }
};

export const BannerLog = getBanner();
