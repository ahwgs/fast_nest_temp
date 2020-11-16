/*
 * 获取所有环境变量路径
 * @Author: ahwgs
 * @Date: 2020-11-16 14:43:45
 * @Last Modified by: ahwgs
 * @Last Modified time: 2020-11-16 14:45:30
 */
import * as fs from 'fs';
import * as path from 'path';

// 默认存放env文件的文件夹路径
const directory = path.resolve(process.cwd(), 'config/env');

type optionsType = {
  dirPath?: string;
  prefix?: string;
};

/**
 * 返回目录下所有文件的文件名(字符串数组形式)
 * @typedef {Object} options  参数选项
 * @param {string} options.dirPath  目录路径
 * @param {string} options.prefix  给每一个匹配项增加前缀文本
 * @return {string[]} 不传参数默认返回/config/env下所有文件拼接的数组
 */
export function getDirAllFileNameArr(options?: optionsType): string[] {
  const params = { dirPath: directory, prefix: 'config/env/', ...options };
  const results = [];
  try {
    for (const dirContent of fs.readdirSync(params.dirPath)) {
      const dirContentPath = path.resolve(directory, dirContent);
      console.log(dirContentPath);
      if (fs.statSync(dirContentPath).isFile()) {
        if (dirContent.endsWith('.env')) {
          if (params.prefix) {
            results.push(`${params.prefix}${dirContent}`);
          } else {
            results.push(dirContent);
          }
        }
      }
    }
    return results;
  } catch (error) {
    return results;
  }
}
