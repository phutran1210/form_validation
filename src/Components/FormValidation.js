import React, { Component } from "react";
import "./FormValidation.css";
import { connect } from "react-redux";
import { themNguoiDungAction } from "../redux/actions/QLNguoiDungAction";

class FormValidation extends Component {
  state = {
    values: {
      ho: "",
      ten: "",
      taiKhoan: "",
      email: "",
      matKhau: "",
      xacNhan: "",
    },
    errors: {
      ho: "",
      ten: "",
      taiKhoan: "",
      email: "",
      matKhau: "",
      xacNhan: "",
    },
  };
  handleChange = (event) => {
    let { name, value, type } = event.target;

    let newValues = { ...this.state.values, [name]: value };
    let newErrors = { ...this.state.errors };

    // kiểm tra rỗng
    if (value.trim() === "") {
      newErrors[name] = name + " không được bỏ trống!";
    } else newErrors[name] = "";

    //kiểm tra ID
    if (name === "taiKhoan") {
      let regexId = /^[a-zA-Z0-9 ]*$/;
      if (!regexId.test(value)) {
        newErrors[name] = name + " chỉ bao gồm các kí tự [a-z][A-Z][0-9]";
      }
      //kiểm tra trùng
      this.props.mangNguoiDung.map((nguoiDung) => {
        if (newValues.taiKhoan === nguoiDung.taiKhoan) {
          return (newErrors[name] = name + " bị trùng");
        }
      });
    }

    // kiểm tra email
    if (type === "email") {
      let regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!regexEmail.test(value)) {
        newErrors[name] = name + " không hợp lệ!";
      }
      //kiểm tra trùng
      this.props.mangNguoiDung.map((nguoiDung) => {
        if (newValues.email === nguoiDung.email) {
          return (newErrors[name] = name + " bị trùng");
        }
      });
    }

    // kiểm tra mật khẩu
    if (name === "matKhau") {
      let regexPwd = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;
      if (!regexPwd.test(value)) {
        newErrors[name] =
          name +
          " phải bao gồm các kí tự hoa, thường, số và có độ dài lớn hơn hoặc bằng 6!";
      }
    }

    // kiểm tra xác nhận mật khẩu
    if (newValues.matKhau !== "" && newValues.matKhau !== newValues.xacNhan) {
      newErrors.xacNhan = "Xác nhận không đúng!";
      // newErrors.matKhau = "";
    } else newErrors[name] = "";

    this.setState({ values: newValues, errors: newErrors });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.dispatch(themNguoiDungAction(this.state.values));
    this.saveDataToLocal();
  };

  renderBtnSubmit = () => {
    let valid = true;

    for (let key in this.state.values) {
      if (this.state.values[key] === "") {
        valid = false;
      }
    }

    for (let key in this.state.errors) {
      if (this.state.errors[key] !== "") {
        valid = false;
      }
    }

    if (valid) {
      return (
        <button
          type="submit"
          className="btn btn-dark btn-lg "
          data-toggle="modal"
          data-target="#modelId"
        >
          Xác nhận
        </button>
      );
    }

    return (
      <button
        type="submit"
        className="btn btn-dark btn-lg "
        data-toggle="modal"
        data-target="#modelId"
        disabled
      >
        Xác nhận
      </button>
    );
  };
  render() {
    return (
      <div className="container-fluid bg-light">
        <div className="row py-5">
          <div className="col-xl-4 col-md-3"></div>
          <div className="col-12 col-md-6 col-xl-4 bg-white p-5">
            <h2>
              <small>THÔNG TIN NGƯỜI DÙNG</small>
            </h2>

            <form className="form-group" onSubmit={this.handleSubmit}>
              <div className="row">
                <div className="col-6 px-1 group">
                  {/* <label htmlFor>Họ</label> */}
                  <input
                    className="bar"
                    type="text"
                    name="ho"
                    value={this.state.values.ho}
                    id="ho"
                    placeholder="Họ"
                    aria-describedby="helpId"
                    onChange={this.handleChange}
                  />
                  <p className="text-danger">{this.state.errors.ho}</p>
                </div>

                <div className="col-6 px-1 group">
                  {/* <label htmlFor>Tên</label> */}
                  <input
                    type="text"
                    name="ten"
                    value={this.state.values.ten}
                    id="ten"
                    placeholder="Tên"
                    aria-describedby="helpId"
                    onChange={this.handleChange}
                  />
                  <p className="text-danger">{this.state.errors.ten}</p>
                </div>

                <div className="col-12 px-1 group">
                  {/* <label htmlFor>Tài khoản</label> */}
                  <input
                    type="text"
                    name="taiKhoan"
                    value={this.state.values.taiKhoan}
                    id="taiKhoan"
                    placeholder="Tài khoản"
                    aria-describedby="helpId"
                    onChange={this.handleChange}
                  />
                  <p className="text-danger">{this.state.errors.taiKhoan}</p>
                </div>

                <div className="col-12 px-1 group">
                  {/* <label htmlFor>Email</label> */}
                  <input
                    type="email"
                    name="email"
                    value={this.state.values.email}
                    id="email"
                    placeholder="Email"
                    aria-describedby="helpId"
                    onChange={this.handleChange}
                  />
                  <p className="text-danger">{this.state.errors.email}</p>
                </div>

                <div className="col-6 px-1 group">
                  {/* <label htmlFor>Mât khẩu</label> */}
                  <input
                    type="password"
                    name="matKhau"
                    value={this.state.values.matKhau}
                    id="matKhau"
                    placeholder="Mật khẩu"
                    aria-describedby="helpId"
                    onChange={this.handleChange}
                  />
                  <p className="text-danger">{this.state.errors.matKhau}</p>
                </div>

                <div className="col-6 px-1 group">
                  {/* <label htmlFor>Xác nhận</label> */}
                  <input
                    type="password"
                    name="xacNhan"
                    value={this.state.values.xacNhan}
                    id="xacNhan"
                    placeholder="Xác nhận"
                    aria-describedby="helpId"
                    onChange={this.handleChange}
                  />
                  <p className="text-danger">{this.state.errors.xacNhan}</p>
                </div>
              </div>
              {this.renderBtnSubmit()}
              {/* Button trigger modal */}
            </form>
          </div>
          <div className="col-xl-4 col-md-3"></div>
        </div>

        <div></div>
      </div>
    );
  }
}
const mapStateTpProps = (state) => ({
  mangNguoiDung: state.QLNguoiDungReducer.mangNguoiDung,
});

export default connect(mapStateTpProps)(FormValidation);
