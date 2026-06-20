export type MentorCategory = {
  label: string;
  mentors: string[];
};

export const mentorCategories: MentorCategory[] = [
  {
    label: "投资",
    mentors: ["查理·芒格", "巴菲特", "段永平", "纳瓦尔"],
  },
  {
    label: "成长",
    mentors: ["埃隆·马斯克", "李开复", "梁永安"],
  },
  {
    label: "心理",
    mentors: ["武志红", "蔡康永"],
  },
];

export const mentorOptions = mentorCategories.flatMap((category) => category.mentors);
