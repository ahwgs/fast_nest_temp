interface IText {
  [propName: string]: string;
}

export const CommonText: IText = {
  REQUEST_ERROR: '请求失败',
  PARAMES_MUST_NUM: '需为整数，当前输入的为：',
};
