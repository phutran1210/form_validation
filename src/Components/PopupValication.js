import React, { Component } from "react";
import "./FormValidation.css";
import { connect } from "react-redux";

class PopupValication extends Component {
  renderTable = () => {
    return this.props.mangNguoiDung.map((nguoiDung, index) => {
      console.log(this.props.mangNguoiDung);
      console.log(nguoiDung);

      return (
        <tr key={index}>
          <td>{nguoiDung.ho + " " + nguoiDung.ten}</td>
          <td>{nguoiDung.taiKhoan}</td>
          <td>{nguoiDung.email}</td>
          <td>{nguoiDung.matKhau}</td>
        </tr>
      );
    });
  };
  render() {
    return (
      <div className="container-fluid bg-light">
        {/* Modal */}
        <div
          className="modal fade"
          id="modelId"
          tabIndex={-1}
          role="dialog"
          aria-labelledby="modelTitleId"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-xl" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title text-center ">
                  Thông tin người dùng
                </h5>
                <button
                  type="reset"
                  className="close "
                  data-dismiss="modal"
                  aria-label="Close"
                  style={{ width: "max-content" }}
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Họ tên</th>
                      <th>Tài khoản</th>
                      <th>Email</th>
                      <th>Mật khẩu</th>
                    </tr>
                  </thead>
                  <tbody>{this.renderTable()}</tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  mangNguoiDung: state.QLNguoiDungReducer.mangNguoiDung,
});

export default connect(mapStateToProps)(PopupValication);
