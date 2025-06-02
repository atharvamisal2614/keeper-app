// import { useState } from "react"
// import Link from "next/link";
// import { useRouter } from "next/router";

// export default function Login(){
//     const router = useRouter();
//     const [formData, setFormData] =  useState({ email: '', password: '' });
//     const handleChange = (e) => {
//         e.preventDefault()
//         const {name, value} = e.target
//         setFormData({...formData, [name]: value})  
//     }
//     const handleSubmit = async(e) => {
//         e.preventDefault();
//         setFormData({
//             email:"", password:""
//         })
//         try{
//             const response = await fetch('/api/login', {
//                 method: 'POST',
//                 headers : {
//                     'Content-Type': 'application/json',
//                 },
//                 body:JSON.stringify(formData)
//             })
//             if(response.ok) {
//                 const data =  await response.json()
//                 if (data) {
//                     localStorage.setItem("token", data.token);
//                     router.push(`/keeps/${data.userId}`);
//                     console.log(data)
//                     console.log(data.token)
//                 }
//             }
//         } catch(error) {
//             console.log('error')
//         }
//       }
//     return(
//         <div className="min-h-screen flex">
//   {/* Left Section */}
//   <div className="flex-1 bg-blue-800 flex items-center justify-center">
//     <h1 className=" text-white text-4xl font-semibold italic">Your Secret Is Safe With Us!</h1>
//   </div>

//   {/* Right Section */}
//  <div className="flex-1 flex items-center justify-center bg-gray-100">
//     <form 
//       onSubmit={handleSubmit} 
//       className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
//     >
//       <label htmlFor="email" className="block  font-semibold mb-2">Email</label>
//       <input
//         type="email"
//         id="email"
//         placeholder="Your Email"
//         onChange={handleChange}
//         value={formData.email}
//         name="email"
//         required
//         className="w-full p-2 border rounded-md mb-4"
//       />

//       <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">Password</label>
//       <input
//         type="password"
//         id="password"
//         placeholder="********"
//         onChange={handleChange}
//         value={formData.password}
//         name="password"
//         required
//         className="w-full p-2 border rounded-md mb-6"
//       />

//       <button 
//         type="submit" 
//         className="w-full bg-blue-800 text-white py-2 rounded-md hover:bg-blue-600 transition"
//       >
//         Login
//       </button>

//       <p className="text-gray-500 text-center mt-4">
//         Don&apos;t have an account?{" "}
//         <Link href="/signup" className="text-blue-500 hover:underline">
//           Signup
//         </Link>
//       </p>
//     </form>
//   </div>
// </div>

        
//     )

    
// }







import { useState } from "react"
import Link from "next/link";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormData({ email: "", password: "" });

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const data = await response.json();
        if (data) {
          localStorage.setItem("token", data.token);
          router.push(`/keeps/${data.userId}`);
        }
      }
    } catch (error) {
      console.log('Login error:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Section */}
      <div className="md:flex-1 bg-blue-800 flex items-center justify-center p-6">
        <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-semibold italic text-center">
          Your Secret Is Safe With Us!
        </h1>
      </div>

      {/* Right Section */}
      <div className="md:flex-1 mt-10 md:mt-0 flex items-center justify-center bg-white p-6">
        <form 
          onSubmit={handleSubmit} 
          className="bg-white p-6 sm:p-8 rounded-lg shadow-md w-full max-w-md"
        >
          <label htmlFor="email" className="block font-semibold mb-2">
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
            className="w-full p-2 border rounded-md mb-4"
          />

          <label htmlFor="password" className="block font-semibold mb-2">
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
            className="w-full p-2 border rounded-md mb-6"
          />

          <button 
            type="submit" 
            className="w-full bg-blue-800 text-white py-2 rounded-md hover:bg-blue-600 transition"
          >
            Login
          </button>

          <p className="text-gray-500 text-center mt-4 text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-blue-500 hover:underline">
              Signup
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
