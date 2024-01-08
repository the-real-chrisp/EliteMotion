const signupFormHandler = async (event) => {
    //submit, click
    event.preventDefault();
    // console.log('test')
    // return
  
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    const password2 = document.querySelector('#password-signup-2').value.trim();

    if (
        (email && password) &&
        (password === password2)
        ) {
      //making a request to backend, from line 13, using following methods
      const response = await fetch('/api/user/signup', {
        method: 'POST',
        body: JSON.stringify({ email, password, password2 }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        const err = await response.json()
        console.log(err)
        alert('Failed to sign up');
      }
    }
  };
  
  document
    .querySelector('.signup-form')
    .addEventListener('submit', signupFormHandler);
  