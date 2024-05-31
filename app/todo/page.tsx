import Link from "next/link";

async function getToDos(){
    // return fetch("https://jsonplaceholder.typicode.com/todos").then( res => res.json() );
    return [
        {
          "userId": 1,
          "id": 1,
          "title": "To DO 1",
          "completed": false
        },
        {
          "userId": 1,
          "id": 2,
          "title": "To DO 2",
          "completed": false
        },
        {
          "userId": 1,
          "id": 3,
          "title": "To DO 3",
          "completed": false
        }];
}

export default async function ToDo() {
    const tdlist = await getToDos();
    return (
        <>
            <ul>
                {
                    tdlist.map(item => (
                        <li key={item.id}>
                            <Link href={`todos/${item.id}`}>{item.title}</Link>
                        </li>
                    ))
                }
            </ul>
        </>
    );
}
