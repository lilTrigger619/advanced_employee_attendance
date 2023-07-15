import Image from 'next/image'
import Card from "@/components/card";
import Layout from "@/components/layout";

export default function Home() {
  return (
    <Layout>
			<Card>
				<div className='w-full p-6'>
					<div className='w-44 h-32 bg-sky-600 flex justify-center items-center'> 
						<h3>Sign in</h3>
					</div>
					<br/>
					<br/>
					<br/>
					<div className='text-slate-500'>
					Please make sure your location services are turned on and allowed
					for this website.
					</div>
					<br/>
					<br/>
					<div className=''>
					Location status: <span className='bg-lime-500 text-black-100 p-3 m-1'>granted</span>
<span className='bg-red-600 text-black-100 p-3 m-1'>granted</span>

					</div>
				</div>
			</Card>

			<br/>
			<br/>

			<Card>
				<div className='w-full p-6'>
					<h4> <span className="font-bold">Today's sign-in:&nbsp;&nbsp;</span> not-signed in </h4>
				</div>
			</Card>
		</Layout>
  )
}
