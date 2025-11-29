import StudentSubjectList from "@/components/classroom/subjects/studentSubjectList";
import ClassRoomView from "@/components/teacher/ClassRoomViewCom";

export default async function ClassRoomIdPage({
  params,
}: {
  params: Promise<{ classRoomId: string }>;
}) {
  const { classRoomId } = await params;

  // Subject List (Static for now)

  return (
    <div
      className="
        flex flex-col 
        md:flex-row           /* Desktop: row layout */
        gap-4 md:gap-6 
      "
    >
      {/* ===========================
          LEFT SIDEBAR (TOP ON MOBILE)
      ============================ */}
      <StudentSubjectList classRoomId={classRoomId} />

      {/* ===========================
          MAIN CONTENT (BOTTOM ON MOBILE)
      ============================ */}
      <div className="flex-1">
        <ClassRoomView classRoomId={classRoomId} />
      </div>
    </div>
  );
}
