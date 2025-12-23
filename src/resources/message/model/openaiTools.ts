import { ChatCompletionTool } from "openai/resources";

export const MESSAGE_OPENAI_TOOLS: ChatCompletionTool[] = [
  {
    type: "function",
    function: {
      name: "get_user_facts",
      description: "Retrieve facts about the user from the database.",
      parameters: {
        type: "object",
        properties: {},
      },
    },
  },
  {
    type: "function",
    function: {
      name: "set_user_fact",
      description: "Store a fact about the user in the database.",
      parameters: {
        type: "object",
        properties: {
          content: {
            type: "string",
            description: "The fact content to store about the user.",
          },
        },
        required: ["content"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "delete_user_fact",
      description: "Delete a fact about the user from the database.",
      parameters: {
        type: "object",
        properties: {
          id: {
            type: "integer",
            description: "The ID of the fact to delete.",
          },
        },
        required: ["id"],
      },
    },
  },
];
