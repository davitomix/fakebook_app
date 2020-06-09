const FormChecker = (() => {
  const email = document.getElementById('user_email');
  const password = document.getElementById('user_password');
  const alertBox = document.getElementById('alert-content');


  const scan = () => {
    if(alertBox.innerText === '') {
      email.addEventListener('keydown', (e) => {
        scanItemAfter(email, 'Email');
      });
      email.addEventListener('focus', (e) => {
        scanItemFirst(email, 'Email');
      });
    } else {
      scanItemFirst(email, 'Email');
      email.addEventListener('keydown', (e) => {
        scanItemAfter(email, 'Email');
      });
    }
  };

  const scanItemFirst = (item, itemStr) => {
    const value = item.value.trim();
    if(value === '') {
      setErrorFor(item, `${itemStr} cannot be blank`);
    }
    else if (!isEmail(value)) {
      setErrorFor(item, `Not a valid ${itemStr}`);
    } else {
      setSuccessFor(item);
    }
  };

  const scanItemAfter = (item, itemStr) => {
    const value = item.value.trim();
    if (!isEmail(value)) {
      setErrorFor(item, `Not a valid ${itemStr}`);
    } else {
      setSuccessFor(item);
    }
  };

  const checkInputs = () => {
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    
    if(emailValue === '') {
      setErrorFor(email, 'Email cannot be blank');
    } else if (!isEmail(emailValue)) {
      setErrorFor(email, 'Not a valid email');
    } else {
      setSuccessFor(email);
    }

    if(passwordValue === '') {
      setErrorFor(password, 'Password cannot be blank');
    } else {
      setSuccessFor(password);
    }
  };

  const setErrorFor = (input, message) => {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    formControl.className = 'form-control error';
    small.innerText = message;
  };
  
  const setSuccessFor = (input) => {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
  };
    
  const isEmail = (email) => {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
  };

  return {
    scan
  }
})();
export default FormChecker;