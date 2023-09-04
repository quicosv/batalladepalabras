import { SignInForm } from './SignInForm';
import { SignUpForm } from './SignUpForm';

export const LoginPage = () => {
  return (
    <>
      <h1>Chat</h1>
      <hr />
      <div className="row">
        <div className="col">
          <SignInForm />
        </div>
        <div className="col">
          <SignUpForm />
        </div>
      </div>
    </>
  );
};
