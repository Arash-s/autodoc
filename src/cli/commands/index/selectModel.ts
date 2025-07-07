import { LLMModelDetails, LLMModels, Priority } from '../../../types.js';

export const selectModel = (
  prompts: string[],
  llms: LLMModels[],
  models: Record<LLMModels, LLMModelDetails>,
  _priority: Priority,
): LLMModelDetails | null => {
  for (const llm of llms) {
    if (models[llm]) {
      return models[llm];
    }
  }
  return null;
};
