import { ChatGoogleGenerativeAI } from '@langchain/google-genai';

export type AutodocUserConfig = {
  llms: LLMModels[];
};

export type AutodocRepoConfig = {
  name: string;
  repositoryUrl: string;
  root: string;
  output: string;
  llms: LLMModels[];
  priority: Priority;
  maxConcurrentCalls: number;
  addQuestions: boolean;
  ignore: string[];
  filePrompt: string;
  folderPrompt: string;
  chatPrompt: string;
  contentType: string;
  targetAudience: string;
  linkHosted: boolean;
};

export type FileSummary = {
  fileName: string;
  filePath: string;
  url: string;
  summary: string;
  questions?: string;
  checksum: string;
};

export type ProcessFileParams = {
  fileName: string;
  filePath: string;
  projectName: string;
  contentType: string;
  filePrompt: string;
  targetAudience: string;
  linkHosted: boolean;
};

export type ProcessFile = (params: ProcessFileParams) => Promise<void>;

export type FolderSummary = {
  folderName: string;
  folderPath: string;
  url: string;
  files: FileSummary[];
  folders: FolderSummary[];
  summary: string;
  questions: string;
  checksum: string;
};

export type ProcessFolderParams = {
  inputPath: string;
  folderName: string;
  folderPath: string;
  projectName: string;
  contentType: string;
  folderPrompt: string;
  targetAudience: string;
  linkHosted: boolean;
  shouldIgnore: (fileName: string) => boolean;
};

export type ProcessFolder = (params: ProcessFolderParams) => Promise<void>;

export type TraverseFileSystemParams = {
  inputPath: string;
  projectName: string;
  processFile?: ProcessFile;
  processFolder?: ProcessFolder;
  ignore: string[];
  filePrompt: string;
  folderPrompt: string;
  contentType: string;
  targetAudience: string;
  linkHosted: boolean;
};

export enum LLMModels {
  GEMINI_PRO = 'gemini-2.5-pro',
  GEMINI_PRO_VISION = 'gemini-2.5-pro-vision',
}

export type LLMModelDetails = {
  name: LLMModels;
  inputCostPer1KTokens: number;
  outputCostPer1KTokens: number;
  maxLength: number;
  llm: ChatGoogleGenerativeAI;
  inputTokens: number;
  outputTokens: number;
  succeeded: number;
  failed: number;
  total: number;
};

export enum Priority {
  COST = 'cost',
  PERFORMANCE = 'performance',
}
