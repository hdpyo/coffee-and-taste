export default function LogoutForm({ onClick }) {
  return (
    <div>
      <button
        type="button"
        onClick={onClick}
      >
        Logout
      </button>
    </div>
  );
}
