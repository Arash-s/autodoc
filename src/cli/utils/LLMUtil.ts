import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { LLMModelDetails, LLMModels } from '../../types.js';

export const models: Record<LLMModels, LLMModelDetails> = {
  [LLMModels.GEMINI_PRO]: {
    name: LLMModels.GEMINI_PRO,
    inputCostPer1KTokens: 0.00025,
    outputCostPer1KTokens: 0.0005,
    maxLength: 8192,
    llm: new ChatGoogleGenerativeAI({
      model: LLMModels.GEMINI_PRO,
      temperature: 0.1,
      maxOutputTokens: 2048,
    }),
    inputTokens: 0,
    outputTokens: 0,
    succeeded: 0,
    failed: 0,
    total: 0,
  },
  [LLMModels.GEMINI_PRO_VISION]: {
    name: LLMModels.GEMINI_PRO_VISION,
    inputCostPer1KTokens: 0.00025,
    outputCostPer1KTokens: 0.0005,
    maxLength: 8192,
    llm: new ChatGoogleGenerativeAI({
      model: LLMModels.GEMINI_PRO_VISION,
      temperature: 0.1,
      maxOutputTokens: 2048,
    }),
    inputTokens: 0,
    outputTokens: 0,
    succeeded: 0,
    failed: 0,
    total: 0,
  },
};

export const printModelDetails = (models: LLMModelDetails[]): void => {
  const output = models.map((model) => {
    return {
      Model: model.name,
      'File Count': model.total,
      Succeeded: model.succeeded,
      Failed: model.failed,
      Tokens: model.inputTokens + model.outputTokens,
      Cost:
        (model.inputTokens / 1000) * model.inputCostPer1KTokens +
        (model.outputTokens / 1000) * model.outputCostPer1KTokens,
    };
  });

  const totals = output.reduce(
    (cur: any, next) => {
      return {
        ...cur,
        'File Count': cur['File Count'] + next['File Count'],
        Succeeded: cur.Succeeded + next.Succeeded,
        Failed: cur.Failed + next.Failed,
        Tokens: cur.Tokens + next.Tokens,
        Cost: cur.Cost + next.Cost,
      };
    },
    {
      Model: 'Total',
      'File Count': 0,
      Succeeded: 0,
      Failed: 0,
      Tokens: 0,
      Cost: 0,
    },
  );

  const all = [...output, totals];
  console.table(all);
};

export const totalIndexCostEstimate = (models: LLMModelDetails[]): number => {
  const totalCost = models.reduce((cur, model) => {
    return (
      cur +
      (model.inputTokens / 1000) * model.inputCostPer1KTokens +
      (model.outputTokens / 1000) * model.outputCostPer1KTokens
    );
  }, 0);

  return totalCost;
};
