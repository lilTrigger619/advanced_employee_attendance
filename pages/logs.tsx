import Layout from "@/components/layout";
import Card from "@/components/card";
import { useState, ReactNode } from "react";

export default function LogsPage() {
	const [logType, setLogType] = useState<string>("table");

	const onTypeClick = (type: string) => setLogType(type);

	return (
		<Layout>
			<Card>
				<div className="w-full p-6">
					<h2>
						Your <b>check-in</b> logs for the month
					</h2>
					<br />
					<br />

					<div>
						{/** log viewer selector **/}
						<div
							className=" h-fit bg-gray-900 w-56 cursor-pointer
						"
						>
							<span
								onClick={() => onTypeClick("table")}
								className={
									"inline-block text-center leading-10 w-1/2 " +
									(logType == "table" ? " bg-sky-600 " : "")
								}
							>
								Table
							</span>
							<span
								onClick={() => onTypeClick("calender")}
								className={
									"inline-block text-center leading-10 w-1/2 " +
									(logType == "calender" ? " bg-sky-600 " : "")
								}
							>
								Calender
							</span>
						</div>
					</div>

					{/** log viewer**/}
					<div>
						<br />
						{logType == "table" ? (
							<div className="max-w-md w-full overflow-x-auto">
								<table className="text-left text-sm font-light">
									<thead className="border-b font-medium dark:border-neutral-500">
										<tr>
											<th scope="col" className="px-6 py-4">
												#
											</th>
											<th scope="col" className="px-6 py-4">
												First
											</th>
											<th scope="col" className="px-6 py-4">
												Last
											</th>
											<th scope="col" className="px-6 py-4">
												Handle
											</th>
										</tr>
									</thead>
									<tbody>
										<tr className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
											<td className="whitespace-nowrap px-6 py-4 font-medium">
												1
											</td>
											<td className="whitespace-nowrap px-6 py-4">Mark</td>
											<td className="whitespace-nowrap px-6 py-4">Otto</td>
											<td className="whitespace-nowrap px-6 py-4">@mdo</td>
										</tr>
										<tr className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
											<td className="whitespace-nowrap px-6 py-4 font-medium">
												2
											</td>
											<td className="whitespace-nowrap px-6 py-4">Jacob</td>
											<td className="whitespace-nowrap px-6 py-4">Thornton</td>
											<td className="whitespace-nowrap px-6 py-4">@fat</td>
										</tr>
										<tr className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
											<td className="whitespace-nowrap px-6 py-4 font-medium">
												3
											</td>
											<td className="whitespace-nowrap px-6 py-4">Larry</td>
											<td className="whitespace-nowrap px-6 py-4">Wild</td>
											<td className="whitespace-nowrap px-6 py-4">@twitter</td>
										</tr>
									</tbody>
								</table>
							</div>
						) : (
							<>
								<br />
								<CalenderView />
							</>
						)}
					</div>

					<div></div>
				</div>
			</Card>
		</Layout>
	);
}

const CalenderView = () => {
	const currentDate = new Date();
	const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
	const today = daysOfWeek[currentDate.getDay()];
	const firstDayOfMonth = new Date(
		currentDate.getFullYear(),
		currentDate.getMonth(),
		1
	).getDay();
	const amtDayInMonth = new Date(
		currentDate.getFullYear(),
		currentDate.getMonth() + 1,
		0
	).getDate();
	const amtDayInPrevMonth = new Date(
		currentDate.getFullYear(),
		currentDate.getMonth(),
		0
	).getDate();
	const days: ReactNode[] = [];

	//const days covered.
	let daysCovered = 0;

	// prev days that ate into this month
	for (
		let i: number = (amtDayInPrevMonth - firstDayOfMonth)+1; //counting from the number of days that has eaten into the month
		i <= amtDayInPrevMonth; 
		i++
	) {
		days.push(
			<span key={i} className="inline-block w-16">
				{i}
			</span>
		);
		daysCovered++;
	}

	// days of the month
	for ( let i: number = 1; i <= amtDayInMonth; i++) {
		if (daysCovered % 7 == 0)
			days.push(<br/>)
		days.push(
			<span key={i} className="inline-block w-16">
				{i}
			</span>
		);
		daysCovered++;
	}
	console.log(days);

	return (
		<>
			{/*days of the week */}
			<div>
				{/* days */}
				{daysOfWeek.map((val, key) => (
					<span key={key} className="inline-block w-16">
						{val}
					</span>
				))}

				{/*days from prev month */}
				<div>{days}</div>
			</div>
		</>
	);
};
