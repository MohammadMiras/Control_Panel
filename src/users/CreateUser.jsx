import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import style from "../style.module.css";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import axios from "axios";
import { AddUser } from "../Services/UserServies/UserSrevies";
import { showMassageSuccess } from "../Common/Tools";
const CreateUser = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [user, setuser] = useState({
    name: "",
    username: "",
    email: "",
    address: {
      street: "",
      surte: "",
      city: "",
      zipcode: ""
    }
  });

  useEffect(() => {
    if (userId) {
      axios
        .get(`https://jsonplaceholder.typicode.com/users/${userId}`)
        .then((res) =>
          setuser({
            name: res.data.name,
            username: res.data.username,
            email: res.data.email,
            address: {
              street: res.data.address.street,
              surte: res.data.address.suite,
              city: res.data.address.city,
              zipcode: res.data.address.zipcode
            }
          })
        );
    }
  }, []);

  // const showMassageSuccess = async () => {
  //   await swal("عملیات با موفقیت انجام شده", {
  //     icon: "success",
  //     button: "متوجه شدم "
  //   });
  // };
  const requestAddUser = (e) => {
    console.log(userId);
    e.preventDefault();

    AddUser(user)
      .then((res) => {
        showMassageSuccess();
        navigate("/");
      })
      .catch((r) => console.log(r));

    // axios
    //   .post("https://jsonplaceholder.typicode.com/users", user)
    //   .then((res) => {
    //     showMassageSuccess();
    //     navigate("/");
    //   })
    //   .catch((r) => console.log(r));
  };

  const requestEditUser = (e) => {
    e.preventDefault();
    axios
      .put(`https://jsonplaceholder.typicode.com/users/${userId}`, user)
      .then((res) => {
        showMassageSuccess();
        navigate("/");
      })
      .catch((r) => console.log(r));
  };

  return (
    <div
      className={`${style.item_content} mt-5 p-4 container-fluid container bg-black`}
    >
      <h4 className="text-center text-primary text_shdow">
        {userId ? "ویرایش  کاربر  " : "افزودن  کاربر  "}
      </h4>
      <div className="row justify-content-center mt-5  ">
        <form
          onSubmit={userId ? requestEditUser : requestAddUser}
          className="col-12 col-md-6 bg-light  rounded  shadow-lg p-4 box_form "
        >
          <div className="mb-3">
            <label className="form-label lable_form">نام</label>
            <input
              type-="text"
              className="form-control"
              value={user.name}
              onChange={(e) => setuser({ ...user, name: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label>نام خانوادگی</label>
            <input
              type-="text"
              className="form-control"
              value={user.username}
              onChange={(e) => setuser({ ...user, username: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label className="form-label lable_form">ایمیل</label>
            <input
              id="Email"
              type-="text"
              className="form-control"
              value={user.email}
              onChange={(e) => setuser({ ...user, email: e.target.value })}
            />
          </div>
          <hr />
          <div className="mb-3 row ">
            <h5 className="mb-4"> آدرس</h5>
            <div className="col-6 my-1">
              <input
                type-="text"
                className="form-control"
                placeholder="شهر"
                value={user.address.city}
                onChange={(e) =>
                  setuser({
                    ...user,
                    address: { ...user.address, city: e.target.value }
                  })
                }
              />
            </div>
            <div className="col-6 my-1">
              <input
                type-="text"
                className="form-control"
                placeholder="خیابان"
                value={user.address.street}
                onChange={(e) =>
                  setuser({
                    ...user,
                    address: { ...user.address, street: e.target.value }
                  })
                }
              />
            </div>
            <div className="col-6 my-1">
              <input
                type-="text"
                className="form-control"
                placeholder="ادامه ادرس"
                value={user.address.surte}
                onChange={(e) =>
                  setuser({
                    ...user,
                    address: { ...user.address, surte: e.target.value }
                  })
                }
              />
            </div>
            <div className="col-6 my-1">
              <input
                type-="text"
                className="form-control"
                placeholder="کد پستی"
                value={user.address.zipcode}
                onChange={(e) =>
                  setuser({
                    ...user,
                    address: { ...user.address, zipcode: e.target.value }
                  })
                }
              />
            </div>
            <div className="col-12 text-start mt-3">
              <Link to="/">
                <button
                  className="btn  btn-danger ms-2"
                  onClick={() => navigate(-1)}
                >
                  {" "}
                  بازگشت
                </button>
              </Link>
              <button type="submit" className="btn  btn-success ">
                ثبت
              </button>
            </div>
          </div>
          {/* <div className="box_spinners">
            <div class="spinner-border text-primary" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div> */}
        </form>
      </div>
    </div>
  );
};

export default CreateUser;
