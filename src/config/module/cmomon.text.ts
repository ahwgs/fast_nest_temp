/*
 * 公共文案
 * @Author: ahwgs
 * @Date: 2020-11-20 20:04:50
 * @Last Modified by: ahwgs
 * @Last Modified time: 2020-11-26 19:00:56
 */

interface IText {
  [propName: string]: string;
}

export const CommonText: IText = {
  REQUEST_ERROR: '请求失败',
  PARAMES_MUST_NUM: '需为整数，当前输入的为：',
  FRONT_DATE: '开始时间',
  END_DATE: '结束时间',
};
