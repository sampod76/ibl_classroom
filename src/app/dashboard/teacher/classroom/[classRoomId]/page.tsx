import ClassRoomView from "@/components/teacher/ClassRoomViewCom";

export default async function ClassRoomIdPage({
  params,
}: {
  params: Promise<{ classRoomId: string }>;
}) {
  const { classRoomId } = await params;

  return (
    <div>
      {/* Class ID: {classRoomId} */}
      <ClassRoomView classRoomId={classRoomId} />
    </div>
  );
}
