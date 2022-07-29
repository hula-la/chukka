import SignupForm from '../../components/accounts/SignupForm';
import SignupTemplate from '../../components/accounts/SignupTemplate';
import SignupContainer from '../../containers/accounts/SignupContainer';

const SignUpPage = () => {
  return (
    <SignupTemplate>
      <h1>Signup</h1>
      <SignupForm />
    </SignupTemplate>
  );
};

export default SignUpPage;
