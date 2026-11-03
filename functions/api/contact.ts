import { handleContactRequest, type ContactEnv } from "../../cloudflare/contact-handler";

type FunctionContext = {
  request: Request;
  env: ContactEnv;
};

export function onRequest(context: FunctionContext): Promise<Response> {
  return handleContactRequest(context.request, context.env);
}
