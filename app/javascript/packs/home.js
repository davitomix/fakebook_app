import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

const NoticeScan =  (() => {
  const noticeText = document.getElementById('notice');
  const noticeBox = document.getElementById('notice-box');
  const alertText = document.getElementById('alert-content');
  const alertBox = document.getElementById('alert-box');
  alertBox.classList.remove('alert-box');
  alertBox.classList.add('alert-home');

  const signed_in = "Signed in successfully.";
  const signed_out = "Signed out successfully.";
  const already_signed_out =  "Signed out successfully.";
  
  const showAlertBox = () => {
    alertBox.classList.remove('d-none');
  };

  const showNoticeBox = () => {
    noticeBox.classList.remove('d-none');
  };

  const scan = () => {
    if(noticeText.innerText != '') {
      switch (noticeText.innerText) {
        case signed_in:
          Swal.fire({
            icon: 'success',
            title: 'Logged in.',
            showConfirmButton: false,
            timer: 1500
          });
          break;
        case signed_out:
          Swal.fire({
            icon: 'success',
            title: 'Successfully logged out.',
            showConfirmButton: false,
            timer: 1500
          });
          break;
        case already_signed_out:
          Swal.fire({
            icon: 'success',
            title: 'Successfully logged out.',
            showConfirmButton: false,
            timer: 1500
          });
          break;
      }
      // showNoticeBox();
    } else if(alertText.innerText != '') {
      showAlertBox();
    }
  };

  return {
      scan
  };
})();

const scanner = NoticeScan;

const start = (() => {
  scanner.scan();
})();