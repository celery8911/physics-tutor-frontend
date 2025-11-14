import { mastraClient } from "./mastraClient";

export interface PhysicsQueryRequest {
  problemText?: string;
  imageBase64?: string;
}

export interface PhysicsQueryResponse {
  text: string;
}

export const physicsTutorAPI = {
  async askQuestion(request: PhysicsQueryRequest): Promise<PhysicsQueryResponse> {
    const { problemText, imageBase64 } = request;

    // 获取 physics tutor agent
    const agent = mastraClient.getAgent('physicsTutorAgent');

    // 构建消息内容
    let content: any;

    if (imageBase64 && problemText) {
      // 同时有文本和图片
      content = [
        {
          type: 'text',
          text: problemText,
        },
        {
          type: 'image',
          image: imageBase64,
          mimeType: 'image/jpeg',
        },
      ];
    } else if (imageBase64) {
      // 只有图片
      content = [
        {
          type: 'text',
          text: '请解答这道物理题',
        },
        {
          type: 'image',
          image: imageBase64,
          mimeType: 'image/jpeg',
        },
      ];
    } else if (problemText) {
      // 只有文本
      content = problemText;
    } else {
      throw new Error('Please provide either problemText or imageBase64');
    }

    // 调用 agent 的 generate 方法
    const response = await agent.generate({
      messages: [
        {
          role: 'user',
          content,
        },
      ],
    });

    return {
      text: response.text,
    };
  },
};
