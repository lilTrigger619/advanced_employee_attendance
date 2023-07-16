import { NextResponse, NextRequest } from "next/server";

export const config = {
	matcher: ["/", "/logs/:path*", "/admin/:path*"],
};

const { Backend } = process.env;
export const middleware = async (req: NextRequest) => {
	const cookie = req.headers.get("cookie"); //type map
	console.log({cookie});
	const { pathname } = req.nextUrl;
	const { url } = req;
	const LoginPage = new URL("/login", url);
	const AdminLogin = new URL("/admin/login", url);

	if (!cookie && pathname.includes("/admin"))
		return NextResponse.redirect(AdminLogin);
	if (!cookie) return NextResponse.redirect(AdminLogin);

	const HttpCookieHandler = require("cookie");
	const { access, refresh } = HttpCookieHandler.parse(cookie);
	console.log({access});
	try {
		const vResponse = await verifyToken(access);
		if (vResponse == 200) return NextResponse.next();
		else if (vResponse != 200 && pathname.includes("/admin"))
			return NextResponse.redirect(AdminLogin);
		else return NextResponse.redirect(LoginPage);
	} catch (e) {
		console.log("verify error", e);
		if (pathname.includes("/admin")) return NextResponse.redirect(AdminLogin);
		else return NextResponse.redirect(LoginPage);
	}
}; //end of middleware function.

const verifyToken = (token: string) => {
	return new Promise((Resolve, Reject) => {
		fetch(Backend + "verify/", {
			headers: {
				"content-type": "application/json",
				accept: "application/json",
			},
			method: "POST",
			body: JSON.stringify({ token }),
		})
			.then((res) => {
				if (res.status == 200) return Resolve(200);
				else return Reject(res.status);
			})
			.catch((e) => {
				console.log("fetch error", e);
				return Reject(500);
			});
	});
};
