import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

const flashScan =  (() => {
  const noticeText = document.getElementById('notice');
  const alertText = document.getElementById('alert-content');
  // failure
  const already_authenticated = "You are already signed in.";
  const inactive = "Your account is not activated yet.";
  const invalid = "Invalid %{authentication_keys} or Password.";
  const locked = "Your account is locked.";
  const last_attempt = "You have one more attempt before your account is locked.";
  const not_found_in_database = "Invalid %{authentication_keys} or Password.";
  const timeout = "Your session expired. Please sign in again to continue.";
  const unauthenticated = "You need to sign in or sign up before continuing.";
  const unconfirmed = "You have to confirm your email address before continuing.";
  // sessions
  const signed_in = "Signed in successfully.";
  const signed_out = "Signed out successfully.";
  const already_signed_out =  "Signed out successfully.";
  //custom
  const post_created = "Post was successfully created.";

  const triggerAlert = (show, message) => {
    Swal.fire({
      icon: show,
      title: message,
      showConfirmButton: false,
      timer: 1500
    });
  };

  const scan = () => {
    if(noticeText.innerText != '' || alertText.innerText != '') {
      switch (noticeText.innerText || alertText.innerText) {
        // Session.
        case signed_in:
          triggerAlert('success',signed_in);
          break;
        case signed_out:
          triggerAlert('success',signed_out)
          break;
        case already_signed_out:
          triggerAlert('success', already_signed_out);
          break;
        // Failure.
        case already_authenticated:
          triggerAlert('warning', already_authenticated);
          break;
        case invalid:
          triggerAlert('error', invalid);
          break;
        case not_found_in_database:
          triggerAlert('error', not_found_in_database);
          break;
        case timeout:
          triggerAlert('error', timeout)
          break;
        case unauthenticated:
          triggerAlert('warning', unauthenticated);
          break;
        // Custom.
        case post_created:
          triggerAlert('success', post_created);
          break;
      }
    }
  };

  return {
      scan
  };
})();

const scanner = flashScan;

const start = (() => {
  scanner.scan();
})();