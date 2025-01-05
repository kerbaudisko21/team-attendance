import React from "react";
import working from "../images/working group.png";

const Login = () => {
    return (
        <div className="flex flex-col md:flex-row h-screen bg-gray-100 overflow-hidden">
            {/* Left Section */}
            <div className="flex-1 bg-white flex flex-col justify-center items-center px-10 md:px-20">
                <h1 className="text-4xl font-bold text-pink-600">Team Attendance</h1>
                <p className="text-lg text-gray-500 mt-2">Check-in & Check-out on time</p>
                <img
                    src={working}
                    alt="Illustration"
                    className="mt-6 w-64 md:w-72 h-auto"
                />
            </div>

            {/* Right Section */}
            <div className="flex-1 bg-gray-50 flex justify-center items-center px-10 md:px-20 py-10">
                <div className="bg-white p-10 shadow-md rounded-lg w-full max-w-md">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Get Started</h2>
                    <p className="text-sm text-gray-500 mb-6">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed.
                    </p>
                    <form>
                        {/* Username Field */}
                        <div className="mb-4">
                            <label
                                htmlFor="username"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Username
                            </label>
                            <input
                                type="text"
                                id="username"
                                placeholder="Enter your username"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                            />
                            <span className="text-xs text-red-500 mt-1">
                                Please enter a valid username
                            </span>
                        </div>

                        {/* Password Field */}
                        <div className="mb-4">
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Enter your password"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                            />
                            <span className="text-xs text-red-500 mt-1">
                                Incorrect password, try again
                            </span>
                        </div>

                        {/* Remember Me & Forgot Password */}
                        <div className="flex items-center justify-between mb-6">
                            <label className="flex items-center text-sm text-gray-600">
                                <input
                                    type="checkbox"
                                    className="mr-2 rounded border-gray-300 focus:ring-pink-500"
                                />
                                Remember me
                            </label>
                            <a href="#" className="text-sm text-pink-600 hover:underline">
                                Forgot Password?
                            </a>
                        </div>

                        {/* Login Button */}
                        <button
                            type="submit"
                            className="w-full bg-pink-600 text-white py-2 px-4 rounded hover:bg-pink-700 transition"
                        >
                            Login
                        </button>
                    </form>

                    <p className="text-xs text-gray-500 text-center mt-4">
                        By clicking on the button above, you agree to our terms of use and
                        privacy policy.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
