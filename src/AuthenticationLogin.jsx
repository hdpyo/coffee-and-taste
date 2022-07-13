import { useSelector } from 'react-redux';

import { Navigate } from 'react-router-dom';

export default function AuthenticationLogin({ children }) {
  const accessToken = useSelector((state) => state.accessToken);

  if (!accessToken) {
    alert('로그인이 필요한 서비스입니다.');
    return (
      <Navigate to="/login" />
    );
  }

  return children;
}
