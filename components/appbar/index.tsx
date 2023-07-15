import Link from "next/link"

export default function Appbar() {
	return (
		<>
			<nav className="bg-white border-gray-200 dark:bg-gray-900">
				<div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
						<Link href="/">
							<h1 className="text-md">Persool attendance</h1>
						</Link>

						<span>Person id</span>

						<button className="md:hidden">
							Ham burger
						</button>
				</div>
			</nav>
		</>
	);
}
