import swal from "sweetalert";

export const showMassageSuccess = async () => {
  await swal("عملیات با موفقیت انجام شده", {
    icon: "success",
    button: "متوجه شدم "
  });
};
