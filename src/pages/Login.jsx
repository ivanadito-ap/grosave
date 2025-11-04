import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("✅ User logged in:", result.user);
      navigate("/");
    } catch (error) {
      console.error("❌ Login error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-primary/10 via-base-200 to-secondary/10">
      <div className="card w-full max-w-md bg-base-100 shadow-2xl p-8">
        {/* Logo */}
        <div className="flex flex-col items-center mb-6">
          <img
            src="/vite.svg"
            alt="GroSave logo"
            className="w-16 h-16 mb-3"
          />
          <h1 className="text-3xl font-bold text-primary">Welcome to GroSave</h1>
          <p className="text-sm text-base-content/70 mt-2 text-center">
            Manage your group savings efficiently and securely.
          </p>
        </div>

        {/* Login Button */}
        <div className="form-control mt-8">
          <button
            onClick={handleGoogleLogin}
            className="btn btn-outline btn-primary flex items-center justify-center gap-2"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google logo"
              className="w-5 h-5"
            />
            Continue with Google
          </button>
        </div>

        {/* Divider */}
        <div className="divider mt-8 mb-4">or</div>

        {/* Guest Access (optional) */}
        <button
          className="btn btn-ghost w-full"
          onClick={() => navigate("/")}
        >
          Continue as Guest
        </button>

        {/* Footer text */}
        <p className="text-xs text-center mt-6 text-base-content/60">
          By continuing, you agree to GroSave’s <a href="#" className="link">Terms</a> & <a href="#" className="link">Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
}
