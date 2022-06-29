export default function SignUpForm({ signUpFields, onChange, onSubmit }) {
  const {
    email, password, name: username, nickname, phoneNumber, birthDate,
  } = signUpFields;

  const handleChange = (event) => {
    const { name, value } = event.target;
    onChange({ name, value });
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <hr />
      <div>
        <label htmlFor="user-email">E-mail</label>
        <input
          type="email"
          id="user-email"
          name="email"
          value={email}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="user-password">비밀번호</label>
        <input
          type="password"
          id="user-password"
          name="password"
          value={password}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="user-nickname">별명</label>
        <input
          type="text"
          id="user-nickname"
          name="nickname"
          value={nickname}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="user-name">이름</label>
        <input
          type="text"
          id="user-name"
          name="name"
          value={username}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="user-phoneNumber">전화번호</label>
        <input
          type="tel"
          id="user-phoneNumber"
          name="phoneNumber"
          value={phoneNumber}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="user-birthDate">생년월일</label>
        <input
          type="date"
          id="user-birthDate"
          name="birthDate"
          value={birthDate}
          onChange={handleChange}
        />
      </div>
      <button type="button" onClick={onSubmit}>Sign up</button>
    </div>
  );
}
