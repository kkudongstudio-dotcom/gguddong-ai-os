import { AI_SECRETARY_API_URL } from "../config/aiOsApi";

/**
 * ==========================================
 * GGUDDONG AI OS
 *
 * AI SECRETARY SERVICE
 *
 * ERP → AI SECRETARY API
 * ==========================================
 */

export async function sendCommandToSecretary(taskText) {
  try {
    const response = await fetch(AI_SECRETARY_API_URL, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        requestedBy: "CEO",
        taskText,
      }),
    });

    const result = await response.json();

    console.log("AI SECRETARY RESPONSE");

    console.log(result);

    return result;

  } catch (error) {

    console.error(error);

    return {

      success: false,

      status: "ERROR",

      message: error.message,

    };

  }
}