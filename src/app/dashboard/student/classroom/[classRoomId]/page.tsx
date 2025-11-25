export default async function ClassRoomIdPage({
  params,
}: {
  params: Promise<{ classRoomId: string }>;
}) {
  const { classRoomId } = await params;

  console.log("SERVER:", classRoomId);

  return <div>Class ID: {classRoomId}</div>;
}
