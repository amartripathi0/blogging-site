import { motion } from "framer-motion";
import Quote from "./quote";
import { useNavigate } from "react-router-dom";

interface AuthPageProps {
  formHeading: "Sign Up" | "Sign In";
  pageQuote: string;
  children: React.ReactNode;
}
export default function AuthPage({
  formHeading,
  children,
  pageQuote,
}: AuthPageProps) {
  const navigate = useNavigate();
  function handleNavigate() {
    if (formHeading === "Sign Up") navigate("/signin");
    else navigate("/signup");
  }
  return (
    <div className="flex items-center justify-center min-h-[82vh] rounded m-16 bg-gradient-to-br from-purple-100 to-indigo-200 p-4">
      <motion.div
        className="w-full max-w-4xl bg-white rounded-xl shadow-2xl overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col md:flex-row">
          {/* Form Section */}
          <motion.div
            className="w-full md:w-1/2 p-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-2 text-gray-800">
              {formHeading}
            </h2>
            {formHeading === "Sign Up" ? (
              <p className="text-sm text-opacity-85  mb-6">
                {" "}
                Already have an account?{" "}
                <span
                  onClick={handleNavigate}
                  className="underline text-blue-600 cursor-pointer font-medium"
                >
                  Sign In
                </span>
              </p>
            ) : (
              <p className="text-sm text-opacity-85  mb-6">
                {" "}
                Don't have an account?{" "}
                <span
                  onClick={() => {
                    navigate("/signup");
                  }}
                  className="underline text-blue-600 cursor-pointer font-medium"
                >
                  Sign Up
                </span>
              </p>
            )}
            {children}
          </motion.div>

          {/* Quote Section */}
          <Quote quote={pageQuote} />
        </div>
      </motion.div>
    </div>
  );
}