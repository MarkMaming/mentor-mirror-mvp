export type MentorSelection = {
  id: string;
  mentorNames: string[];
  userId: string;
};

export type MentorProfile = {
  id: string;
  userId: string;
  mentorName: string;
  distilledSummary: string;
  perspectivePrompt: string;
  communicationStyle: string;
  focusAreas: string[];
  signatureQuestions: string[];
  cautionNote: string;
  status: string;
  distilledAt: string;
};

export type MentorReply = {
  id: string;
  mentorName: string;
  content: string;
  styleNote: string | null;
  createdAt: string;
  reflectionId: string;
  followups: MentorFollowup[];
};

export type MentorFollowup = {
  id: string;
  mentorName: string;
  question: string;
  answer: string;
  createdAt: string;
  mentorReplyId: string;
  reflectionId: string;
};

export type ReflectionRecord = {
  id: string;
  content: string;
  summary: string | null;
  sourceType: string | null;
  createdAt: string;
  replies: MentorReply[];
};

export type ReflectionSummary = {
  totalCount: number;
  latestReflectionAt: string | null;
  streakDays: number;
};
