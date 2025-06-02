// import { useState } from "react"
// import Link from "next/link"
// import { useRouter } from "next/router"
// export default function SignUp(){
//     const router = useRouter()
//     const [formData, setFormData] = useState({
//         name: "",
//         email: "",
//         password: "",
//     })

//     const handleChange = (e) => {
//         e.preventDefault()
//         const {name, value} = e.target
//         setFormData({...formData, [name] : value})
//     }

//     const handleSubmit = async(e) => {
//         e.preventDefault();
//         try{
//             const response = await fetch('/api/Signup', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body:JSON.stringify(formData)
//             })
//             const data = await response.json()
//             if(response.ok) {
//                 router.push('/')
//             }
//             console.log(data)
//         } catch(error) {
//             console.log(error)
//         } 
//     }

//     return(

// <div className="min-h-screen bg-blue-800 flex">
//   {/* Form Section */}
//   <div className="flex-1 flex items-center justify-center">
//     <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
//       <label htmlFor="name" className="block text-black-700 font-semibold mb-2">
//         Name
//       </label>
//       <input
//         type="text"
//         id="name"
//         placeholder="Your Name"
//         onChange={handleChange}
//         value={formData.name}
//         name="name"
//         required
//         className="w-full p-3 border rounded-md mb-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
//       />

//       {/* Email Field */}
//       <label htmlFor="email" className="block text-black-700 font-semibold mb-2">
//         Email
//       </label>
//       <input
//         type="email"
//         id="email"
//         placeholder="Your Email"
//         onChange={handleChange}
//         value={formData.email}
//         name="email"
//         required
//         className="w-full p-3 border rounded-md mb-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
//       />

//       {/* Password Field */}
//       <label htmlFor="password" className="block text-black-700 font-semibold mb-2">
//         Password
//       </label>
//       <input
//         type="password"
//         id="password"
//         placeholder="********"
//         onChange={handleChange}
//         value={formData.password}
//         name="password"
//         required
//         className="w-full p-3 border rounded-md mb-6 focus:ring-2 focus:ring-blue-500 focus:outline-none"
//       />

//       {/* Submit Button */}
//       <button
//         type="submit"
//         className="w-full bg-blue-800 text-white py-3 rounded-md hover:bg-blue-600 transition"
//       >
//         Sign Up
//       </button>

//       {/* Login Link */}
//       <p className="text-black-500 text-center mt-4">
//         Already have an account?{" "}
//         <Link href="/" className="text-blue-500 hover:underline">
//           Login
//         </Link>
//       </p>
//     </form>
//   </div>

//   {/* Right Section */}
//   <div className="flex-1 bg-white flex items-center justify-center">
//   <div className="text-center">
//     <p className="text-blue-800 text-9xl font-bold italic">...Secret</p>
//     <p className="text-gray-900 text-7xl font-semibold italic">Keeper...</p>
// </div>



//   </div>
 
// </div>

    
//     )
// }








import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function SignUp() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/Signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        router.push("/");
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Form Section */}
      <div className="md:flex-1 flex items-center justify-center bg-blue-800 p-6">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 sm:p-8 rounded-lg shadow-md w-full max-w-md"
        >
          <label htmlFor="name" className="block font-semibold mb-2 text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            placeholder="Your Name"
            onChange={handleChange}
            value={formData.name}
            name="name"
            required
            className="w-full p-3 border rounded-md mb-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />

          <label htmlFor="email" className="block font-semibold mb-2 text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Your Email"
            onChange={handleChange}
            value={formData.email}
            name="email"
            required
            className="w-full p-3 border rounded-md mb-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />

          <label htmlFor="password" className="block font-semibold mb-2 text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="********"
            onChange={handleChange}
            value={formData.password}
            name="password"
            required
            className="w-full p-3 border rounded-md mb-6 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />

          <button
            type="submit"
            className="w-full bg-blue-800 text-white py-3 rounded-md hover:bg-blue-600 transition"
          >
            Sign Up
          </button>

          <p className="text-gray-600 text-center mt-4 text-sm">
            Already have an account?{" "}
            <Link href="/" className="text-blue-500 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>

      {/* Right Section */}
      <div className="md:flex-1 flex items-center justify-center bg-white p-6">
        <div className="text-center">
          <p className="text-blue-800 text-5xl md:text-7xl lg:text-8xl font-bold italic">
            ...Secret
          </p>
          <p className="text-gray-900 text-4xl md:text-6xl lg:text-7xl font-semibold italic">
            Keeper...
          </p>
        </div>
      </div>
    </div>
  );
}
