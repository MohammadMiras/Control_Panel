import React, { useEffect, useState } from "react";
import style from "../style.module.css";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import axios from "axios";
import {requestRemove} from "../Services/UserServies/UserSrevies"


const Users = () => {
  const [users, setUsers] = useState([]);
  const [mainUsers, setmainUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        setUsers(res.data);
        setmainUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

 const ShowMassageDeleteItem  =()=>
 {
    return  swal({
      title: "ایا اطمینان دارید از حذف ردیف؟",
      text: " با حذف رید  مورد مورد نظر برای همیشه  خذف می شود ",
      icon: "warning",
      buttons: ["خیر", "بله"]
    })
 }
 const ShowErrorConectionWebServer = ()=>
 {
  swal("خطای غیر منتظر  پیش امده دوباره تلاش کنید", {
    icon: "error",
    button: "متوجه شدم "
  });

 }
 const showMassageSuccess = () => {
    swal("حذف با موفقیت انجام شده", { icon: "success", button: "متوجه شدم " });
 };
 const DeletItem = (itemid) => {
   ShowMassageDeleteItem()
   .then((willDelete) => {
     if (willDelete) {
       requestRemove(itemid).then((res) => {
         if (res.status === 200) {
           showMassageSuccess();
           const newUsers = users.filter((u) => u.id !== itemid);
           setUsers(newUsers);
         } else {
           ShowErrorConectionWebServer();           
         }
       });
     }
   });
 };
  const SearchItem = (e) => {
    setUsers(
      mainUsers.filter((u) =>
        u.name.toUpperCase().includes(e.target.value.toUpperCase())
      )
    );
  };

  return (
    <div className={`${style.item_content} mt-5 p-4 container-fluid`}>
      <h4 className="text-center">مدیریت کاربران</h4>
      <div className="row my-2 mb-4 justify-content-between w-100 mx-0">
        <div className="form-group col-10 col-md-6 col-lg-4">
          <input
            type="text"
            className="form-control shadow"
            placeholder="جستجو"
            onChange={SearchItem}
          />
        </div>
        <div className="col-2 text-start px-0">
          <button className="btn btn-success">
            <Link to="/User/Create">
              <i className="fas fa-plus text-light"></i>
            </Link>
          </button>
        </div>
      </div>
      {users.length ? (
        <table className="table bg-light shadow">
          <thead className="bg-dark text-light">
            <tr>
              <th>#</th>
              <th>نام</th>
              <th>نام کاربری</th>
              <th>ایمیل</th>
              <th>عملیات</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.name}</td>
                <td>{u.username}</td>
                <td>{u.email}</td>
                <td>
                  <i
                    className="fas fa-edit text-warning mx-2 pointer"
                    onClick={() => {
                      navigate(`User/Create/${u.id}`);
                    }}
                  ></i>

                  <i
                    className="fas fa-trash text-danger mx-2 pointer"
                    onClick={() => {
                      DeletItem(u.id);
                    }}
                  ></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h4>لطفا صبر کنید .....</h4>
      )}
    </div>
  );
};

export default Users;
