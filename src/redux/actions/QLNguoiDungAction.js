import { them_nguoi_dung } from "../types/QLNguoiDungType";

export const themNguoiDungAction = (nguoiDung) => {
  return {
    type: them_nguoi_dung,
    nguoiDung: nguoiDung,
  };
};
