import Link from "next/link";
import Image from "next/image";


export default function Home() {
  return (
    <>
        <div style={{["--padding"]:"100px"}}>Home for To Do List App</div>
        <div>
          <br />


          Navigate To :
          <ul>
            <Link href="/todo">To Do List</Link>
          </ul>
        </div>
    </>
  );
}
