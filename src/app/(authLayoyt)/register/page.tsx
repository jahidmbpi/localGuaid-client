import Link from "next/link";

export default function Page() {
  return (
    <div className=" max-w-4xl mx-auto  items-center justify-center md:h-screen h-full flex ">
      <section className="w-full">
        <div className="bg-white shadow-sm rounded-lg overflow-hidden w-full">
          {/* Right Side - Form */}
          <div className="md:w-full p-6 md:p-10">
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-1">Registration</h2>
              <h3 className="text-sm text-gray-500">
                Enter your details to register
              </h3>
            </div>

            <form action="#!">
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    placeholder="First Name"
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md p-1.5 md:p-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    placeholder="Last Name"
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md p-1.5 md:p-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="name@example.com"
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md p-1.5 md:p-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md p-1.5 md:p-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div className="flex items-start">
                  <input
                    id="iAgree"
                    name="iAgree"
                    type="checkbox"
                    required
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label
                    htmlFor="iAgree"
                    className="ml-2 text-sm text-gray-500"
                  >
                    I agree to the{" "}
                    <a href="#!" className="text-blue-600 underline">
                      terms and conditions
                    </a>
                  </label>
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white md:p-3 p-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    Sign up
                  </button>
                </div>
              </div>
            </form>

            {/* Already have account */}
            <div className="mt-6 text-center">
              <hr className="border-gray-300 mb-4" />
              <p className="text-gray-500 text-sm">
                Already have an account?{" "}
                <Link href="/login" className="text-blue-600 underline text-sm">
                  Sign in
                </Link>
              </p>
            </div>

            {/* Social login */}
            <div className="mt-6 text-center">
              <p className="mb-4">Or sign in with</p>
              <div className="flex flex-col xl:flex-row gap-3 justify-center">
                <button className="flex items-center justify-center gap-2 border border-blue-600 text-blue-600 p-2 md:p-3 rounded-lg hover:bg-blue-50 transition">
                  {/* Google SVG */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-google"
                    viewBox="0 0 16 16"
                  >
                    <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
                  </svg>
                  Google
                </button>

                <button className="flex items-center justify-center gap-2 border border-blue-600 text-blue-600 p-2 md:p-3 rounded-lg hover:bg-blue-50 transition">
                  {/* Facebook SVG */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-facebook"
                    viewBox="0 0 16 16"
                  >
                    <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                  </svg>
                  Facebook
                </button>

                <button className="flex items-center justify-center gap-2 border border-blue-600 text-blue-600 p-2 md:p-3 rounded-lg hover:bg-blue-50 transition">
                  {/* Twitter SVG */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-twitter"
                    viewBox="0 0 16 16"
                  >
                    <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
                  </svg>
                  Twitter
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
