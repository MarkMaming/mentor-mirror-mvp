import { Card } from "@/components/ui/card";

type MentorListProps = {
  mentors: string[];
};

export function MentorList({ mentors }: MentorListProps) {
  return (
    <Card>
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm text-slate-500">当前导师镜像</p>
          <h2 className="mt-1 text-xl font-semibold text-slate-950">你的 3 位导师</h2>
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        {mentors.map((mentor) => (
          <div
            key={mentor}
            className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-5 text-center text-sm font-medium text-slate-700"
          >
            {mentor}
          </div>
        ))}
      </div>
    </Card>
  );
}
