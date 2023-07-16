//import Layout from "@/components/layout";
import "../globals.css";
import axios from "axios";
import jsCookie from "js-cookie";
import { useState, useEffect } from "react";
import {useRouter} from "next/router";

const LoginURL = process.env.NEXT_PUBLIC_Backend + "login/";

export default function LoginPage() {
	const [errorStatus, setErrorStatus] = useState<null | string>(null);
	const nextRouter = useRouter();
	const onSubmit = async (e: SubmitEvent) => {
		e.preventDefault();
		try {
			const res = await axios.post(LoginURL, {
				username: e.target.id.value,
				password: e.target.password.value,
			});

			jsCookie.set("access", res.data.access);
			jsCookie.set("refresh", res.data.refresh);
			nextRouter.push("/");
		} catch (e) {
			if (e?.response.status == 401)
				setErrorStatus("Invalid username or password");
			else setErrorStatus("An unknown error occured.");
		}
	};
	return (
		<div className="max-w-3xl m-auto p-8">
			<h1>Employee login</h1>
			<br />
			<br />
			<form onSubmit={onSubmit}>
				<div className="mb-4">
					<label className="block text-md font-light mb-2" htmlFor="username">
						ID
					</label>
					<input
						className="w-full bg-drabya-gray border-gray-500 appearance-none border p-4 font-light leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-900"
						type="text"
						name="id"
						id=""
						placeholder="ID"
					/>
				</div>
				<div className="mb-4">
					<label className="block text-md font-light mb-2" htmlFor="password">
						Password
					</label>
					<input
						className="w-full bg-drabya-gray border-gray-500 appearance-none border p-4 font-light leading-tight focus:outline-none focus:shadow-outline  dark:bg-gray-900"
						type="password"
						name="password"
						id=""
						placeholder="Password"
					/>
				</div>
				{errorStatus && (
					<div className="text-red-500 my-8">
						<span>{errorStatus}</span>
					</div>
				)}

				<div className="flex items-center justify-between mb-5">
					<button
						className="bg-indigo-600 hover:bg-blue-700 text-white font-light py-2 px-6 rounded focus:outline-none focus:shadow-outline"
						type="submit"
					>
						LOGIN
					</button>
				</div>
				<p className="text-center text-md font-light">
					Login as admin instead?&nbsp;{" "}
					<a className="font-light text-md text-indigo-600">Login</a>
				</p>
			</form>
		</div>
	);
}
