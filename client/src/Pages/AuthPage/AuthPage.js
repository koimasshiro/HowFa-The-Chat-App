import React, {useState} from 'react';
import './AuthPage.css'

const AuthPage = () => {
    const [isSignIn, setIsSignIn] = useState(true);

    const handleSignUpClick = () => {
      setIsSignIn(false);
    };
  
    const handleSignInClick = () => {
      setIsSignIn(true);
    };

  return (
    <div className='authContainer'><div className={`wrapper ${isSignIn ? 'animated-signin' : 'animated-signup'}`}>
    <div className="form-container sign-up">
        <form action="#">
            <h2>sign up</h2>
            <div className="form-group">
                <input type="text" required/>
                <i className="fas fa-user"></i>
                <label for="">username</label>
            </div>
            <div className="form-group">
                <input type="email" required/>
                <i className="fas fa-at"></i>
                <label for="">email</label>
            </div>
            <div className="form-group">
                <input type="password" required/>
                <i className="fas fa-lock"></i>
                <label for="">password</label>
            </div>
            <div className="form-group">
                <input type="password" required/>
                <i className="fas fa-lock"></i>
                <label for="">confirm password</label>
            </div>
            <button type="submit" className="btn">sign up</button>
            <div className="link">
                <p>You already have an account?<a className="signin-link" onClick={handleSignUpClick}> sign in</a></p>
            </div>
        </form>
    </div>
    <div className="form-container sign-in">
        <form action="#">
            <h2>login</h2>
            <div className="form-group">
                <input type="text" required/>
                <i className="fas fa-user"></i>
                <label for="">username</label>
            </div>
            <div className="form-group">
                <input type="password" required/>
                <i className="fas fa-lock"></i>
                <label for="">password</label>
            </div>
            <div className="forgot-pass">
                <a href="#">forgot password?</a>
            </div>
            <button type="submit" className="btn">login</button>
            <div className="link">
                <p>Don't have an account?<a className="signup-link" onClick={handleSignInClick}> sign up</a></p>
            </div>
        </form>
    </div>
</div>
</div>
  )
}

export default AuthPage