export default function Page({ params }: { params: { salleID: string } }) {
    return <div>My Post: {params.salleID}</div>
  }