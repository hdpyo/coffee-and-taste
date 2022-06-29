import { useDispatch, useSelector } from 'react-redux';

import { requestSignUp, updateSignupFields } from './store';

import SignUpForm from './SignUpForm';

export default function SignUpContainer() {
  const dispatch = useDispatch();

  const signUpFields = useSelector((state) => state.signUpFields);

  const handleChangeSignupFields = ({ name, value }) => {
    dispatch(updateSignupFields({ name, value }));
  };

  const handleSubmitSignup = () => {
    dispatch(requestSignUp());
  };

  return (
    <SignUpForm
      signUpFields={signUpFields}
      onChange={handleChangeSignupFields}
      onSubmit={handleSubmitSignup}
    />
  );
}
