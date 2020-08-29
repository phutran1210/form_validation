import { them_nguoi_dung } from "../types/QLNguoiDungType";

const stateDefault = {
  mangNguoiDung: [
    {
      ho: "Nguyễn",
      ten: "Tèo",
      taiKhoan: "teoNguyen",
      email: "teoNuyen@gmail.com",
      matKhau: 123456,
    },
  ],
};

const QLNguoiDungReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case them_nguoi_dung: {
      let mangNguoiDUngUpdate = [...state.mangNguoiDung, action.nguoiDung];
      state.mangNguoiDung = mangNguoiDUngUpdate;

      return { ...state };
    }
    default:
      return { ...state };
  }
};
export default QLNguoiDungReducer;
