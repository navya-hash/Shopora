import { serve } from "inngest/next";
import { inngest } from "@/inngest/client";
import { syncUserCreation, syncUserDeletion, syncUserUpdation } from "@/app/api/inngest/functions";

// Create an API that serves zero functions
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    syncUserCreation,
    syncUserUpdation,
    syncUserDeletion
  ],
});


