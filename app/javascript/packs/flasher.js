import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

const flashScan =  (() => {
  const noticeText = document.getElementById('notice');
  const alertText = document.getElementById('alert-content');
  const errorText = document.getElementById('error-h2')
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
  const invalid_email_or_pswd = "Invalid Email or Password.";
  const post_liked = "Post liked.";
  const post_unliked = "Post disliked.";
  const post_created = "Post was successfully created.";
  const post_updated = "Post was successfully updated.";
  const post_deleted = "Post was successfully destroyed.";

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
        case invalid_email_or_pswd:
          triggerAlert('error', invalid_email_or_pswd);
          break;
        case post_liked:
          triggerAlert('success', post_liked);
          break;
        case post_unliked:
          triggerAlert('success', post_unliked);
          break;
        case post_created:
          triggerAlert('success', post_created);
          break;
        case post_updated:
          triggerAlert('success', post_updated);
          break;
        case post_deleted:
          triggerAlert('success', post_deleted);
          break;
      }
    }
    if(errorText != null) {
      if(errorText.innerText) {
        triggerAlert('error', 'Error.');
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